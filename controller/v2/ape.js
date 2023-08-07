
const moment = require('moment');
const { Account, Account_Transaction, Apes, Tier, Crowned_Apes, Currency, Character_Transaction, Default_Item_Equip, Maps, Missions, Mission_Histories, Inventory, Item_Equipped, Items, Resource_Inventory, Resource,sequelize } = require('../../models/index');
const { Op } = require("sequelize");
const getMissionPreviewFromMissionHistory = require('../../utils/mission/get-mission-preview-from-mission-history');
const Redis = require("ioredis");
const getApesInfoByAddresses = require('../../utils/apes/get-apes-info-by-addresses');
const prepareApesInfo = require('../../utils/apes/prepare-apes-info');
const checkIfApeIsInWallet = require('../../utils/nft/check-if-ape-is-in-wallet');
const levelUpApe = require('../../utils/apes/level-up-apes');
const checkLevelUp = require('../../utils/apes/check-level-up');
const checkEvolution = require('../../utils/apes/check-evolution');
const evoluteApe = require('../../utils/apes/evolute-apes');
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed');
const getLevel = require('../../utils/levels/get-level');
const { TRANSACTION_USE_EXPERIENCE_ITEM, TRANSACTION_REFRESH_PER_DAY, TRANSACTION_USE_EXPERIENCE_ITEM_OVERFLOW } = require('../../static/transaction-types');
const getCurrenciesByAccounts = require('../../utils/currencies/get-currencies-by-accounts');
const XP_ITEM_PRICES = require('../../static/experience-item-price');
const adjustLevelsForApesByExperiences = require('../../utils/levels/adjust-levels-for-apes-by-experiences');
const getCurrenciesByCharacters = require('../../utils/currencies/get-currencies-by-characters');
const getNextLevel = require('../../utils/levels/get-next-level');
const fetchPowers = require('../../utils/info/fetch-powers');
const getRarityData = require('../../utils/services/howrare-api');

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
});

module.exports = {  
  async bulkStore(req, res) {
    try {
      let resFromDB;
      await sequelize.transaction(async trx => {
        let wallet_apes = req.body.map(ape => ({...ape,level:1}));

        console.log(wallet_apes);

        if (wallet_apes.length === 0) {
          throw new Error("There is no ape in this wallet")
        }

        let wallet_owner = wallet_apes[0].owner;  //probably should lift this to a higher level
        const account = await getOrCreateAccountIfNeeded({
          address: wallet_owner,
          transaction: trx,
        })

        let addresses  = wallet_apes.map(ape => ape.address);

        let existing_apes  = await Apes.findAll({
          where: {
            address: {
              [Op.in]: addresses
            }
          },
          transaction: trx
        });

        let new_apes = wallet_apes.filter(a => !existing_apes.find(ea => ea.address === a.address));

        const updatingApes = existing_apes.filter(
          ape => {
            const info = wallet_apes.find(wallet_ape => wallet_ape.address === ape.address)

            return ape.image !== info?.image || ape.name !== info?.name || ape.owner !== info?.owner || ape.symbol !== info?.symbol || ape.power !== info?.power
          }
        )

        if (updatingApes.length > 0) {
          const updatedApes = await Apes.bulkCreate(updatingApes.map(
            ape => ({
              id: ape.id,
              ...(wallet_apes.find(wallet_ape => wallet_ape.address === ape.address) || {}),
              level: ape.level
            })
          ), {
            updateOnDuplicate: ['image', 'name', 'owner', 'symbol', 'power'],
            transaction: trx
          })
        }

        if(new_apes.length>0) {
          const createdApes = await Apes.bulkCreate(new_apes, {
            transaction: trx
          })
        }

        console.log(`Bulk Store done`)

        const apes = await getApesInfoByAddresses({
          addresses,
          transaction: trx,
        })

        resFromDB = await prepareApesInfo({
          apes: apes,
          redis,
          transaction: trx,
        })

        let rarity_collection = await getRarityData();

        if (rarity_collection && rarity_collection.length > 0) {
          let apeRank;

          resFromDB.map((minted_ape, index) => {
            apeRank = rarity_collection.find(ape => ape.mint === minted_ape.address)
            resFromDB[index].rank = apeRank?.rank || 0
          })
        }


      })
      return res.json(resFromDB)
    } catch(err){
      console.log(`Failed to save some or all of the apes - ${err}`)
      return res.status(400).json({
        msg: "Failed to save some or all of the apes"
      })
    }
  },

  async getInfos(req, res) {
    const { addresses } = req.body;

    if (!addresses) {
      return res.json({
        msg: "No Address"
      })
    }

    let addressesNotInCache = [], apesFromCache = [], apesFromDB = []

    try {
      console.log(`Getting apes from redis - ${addresses.join(', ')}`)
      apesFromCache = (await redis.mget(addresses.map(address => (`Ape_${address}`))))
                      .filter(ape => !!ape)
                      .map(ape => JSON.parse(ape))

      addressesNotInCache = addresses.filter(address => !(apesFromCache.find(ape => ape.address === address)))
    } catch (err) {
      console.log(`Failed to get apes from redis ${err}`)

      addressesNotInCache = addresses
    }

    try {

      await sequelize.transaction(async transaction => {
        apesFromDB = await getApesInfoByAddresses({
          addresses: addressesNotInCache,
          transaction,
        })

        const resFromDB = await prepareApesInfo({
          apes: apesFromDB,
          redis,
          transaction,
        })

        return res.json([
          ...apesFromCache,
          ...resFromDB,
        ])
      })
    } catch(err){
      console.log(`Rolling back and Failed to get apes info from DB for ${addresses} error is ${err}`)
      return res.status(400).json({
        msg: `Failed to Get Apes Info ${addresses}`
      })
    }
  },
  
  async favorite(req, res) {
    const { 
      address,
      wallet
    } = req.body

    if (!address || !wallet) {
      return res.status(400).json({
        msg: 'Ape address and wallet address is required'
      })
    }

    let searchTerm = `Ape_${address}`

    console.log('Clearing ape from cache')
    redis.del(searchTerm)

    try {
        console.log('Getting ape from DB')
        let ape;
        await sequelize.transaction(async transaction => {
          ape = await Apes.findOne({
            where: {
              owner: wallet,
              address,
            }
          }, { transaction })
  
          if (!ape) {
            throw new Error(`Failed to get ape from DB (address: ${address}, owner: ${wallet})`)
          }
  
          console.log(`Got ape from DB - ${ape}`)
          ape.set({
            is_favorited: true,
          })
          console.log(`Saving favorited ape to DB - ${ape}`)
          await ape.save({ transaction })
  

        })
      return res.json(ape)
    } catch (err) {
        console.log(`Failed to get ape ${err}`)
        
        return res.status(500).json({
            msg: "Something went wrong."
        })
    }
  },
  
  async unfavorite(req, res) {
    const { 
      address,
      wallet
    } = req.body

    if (!address || !wallet) {
      return res.status(400).json({
        msg: 'Ape address and wallet address is required'
      })
    }

    let searchTerm = `Ape_${address}`

    console.log('Clearing ape from cache')
    redis.del(searchTerm)

    try {
        console.log('Getting ape from DB')
        let ape;
        await sequelize.transaction(async transaction => {
           ape = await Apes.findOne({
            where: {
              owner: wallet,
              address,
            }
          }, { transaction:transaction })
  
          if (!ape) {
            throw new Error(`Failed to get ape from DB (address: ${address}, owner: ${wallet})`)
          }
  
          console.log(`Got ape from DB - ${ape}`)
          ape.set({
            is_favorited: false,
          })
          console.log(`Saving unfavorited ape to DB - ${ape}`)
          await ape.save({ transaction:transaction })
  

        });
      return res.json(ape)
    } catch (err) {
        console.log(`Failed to get ape ${err}`)
        
        return res.status(500).json({
            msg: "Something went wrong."
        })
    }
  },

  async levelUp(req, res) {
    const {
      address,
      wallet,
    } = req.body;

    if (!address || !wallet) {
      return res.status(400).json({
        msg: "No Ape or No Wallet"
      })
    }
    if (!await checkIfApeIsInWallet({
      wallet,
      address,
    })) {
      return res.status(404).json({
        msg: "This ape can not be detected in this wallet"
      })
    }

    console.log(`Clearing ape from cache - ${address}`)
    let searchTerm = `Ape_${address}`;
    await redis.del(searchTerm)

    try {
      let upgradedApe;
      await sequelize.transaction(async (transaction) => {
        console.log(`Getting ape from DB - ${address}`)
        var ape = await Apes.findOne({
          where: {
            address
          }
        }, { transaction })
        console.log(`got ape from DB - ${ape}`)

        if (!ape) {
          throw new Error("No Ape found with this address")
        }

        //check level up for ape
        const canEvolution = await checkLevelUp({ ape, transaction })
        if (!canEvolution) {
          throw new Error("This Ape is not able to level up")
        }

        //level up for ape
        upgradedApe = await levelUpApe({ ape, transaction })

      })
      return res.json({
        ape: upgradedApe
      })
    } catch(err) {
      console.log(`Failed to level up ape ${address}`)
      console.log(err)
      return res.status(500).json({
        msg: err.message
      })
    }
  },

  async levelUpByExperienceItems(req, res) {
    const {
      address,
      wallet,
      counts,
    } = req.body;

    if (!address || !wallet) {
      return res.status(400).json({
        msg: "No Ape or No Wallet"
      })
    }
    // if (!await checkIfApeIsInWallet({
    //   wallet,
    //   address,
    // })) {
    //   return res.status(404).json({
    //     msg: "This ape can not be detected in this wallet"
    //   })
    // }

    console.log(`Clearing ape and account from cache - ${address}`)
    await redis.del(`Ape_${address}`)
    await redis.del(`Account_${wallet}`)

    try {
      await sequelize.transaction(async (transaction) => {
        console.log(`Getting ape from DB - ${address}`)
        var ape = await Apes.findOne({
          where: {
            address
          },
          include: [{
            model: Tier,
          }]
        }, { transaction })
        console.log(`got ape from DB - ${ape}`)

        if (!ape) {
          return res.status(404).json({
            msg: "No Ape found with this address"
          })
        }

        const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction, withApes: true })
        const accountCurrencies = await getCurrenciesByAccounts({ accounts: [ account ], transaction })
        const apeCurrencies = await getCurrenciesByCharacters({ apes: [ ape ], transaction })
        const resources = await Resource.findAll({
          where: {
            type: 'Resource: Level-Up Material',
            is_active: true,
          }
        }, { transaction })
        console.log('Got experience resources from DB', resources)

        const currencies = await Currency.findAll({ transaction })
        console.log('Got currencies from DB', currencies)

        const goldCurrency = (accountCurrencies || []).find(currency => currency.Currency?.name === 'Gold')
        const totalCount = (counts[1] || 0) + (counts[2] || 0) + (counts[3] || 0) + (counts[4] || 0) + (counts[5] || 0) + (counts[6] || 0)
        const goldNeeded = (XP_ITEM_PRICES[ape.tier || 0] || 0) * totalCount
        const resourceInventories = (account.Apes || []).map(accountApe => accountApe.Resource_Inventories || []).flat()

        console.log(`Gold required to level up by ${totalCount} xp items - ${goldNeeded}`)
        console.log(`Gold existing for this ape(${address}) - ${goldCurrency?.amount || 0}`)

        //check if gold is enough
        if (goldNeeded > (goldCurrency?.amount || 0)) {
          console.log(`Failed to level up by experience items for ape ${address}`)
          return res.status(500).json({
            msg: 'Not enough gold to level up by these experience items'
          })
        }

        //check if experience items are enough
        const xpResources = resources.map(
          resource => {
            const invs = resourceInventories.filter(rinv => rinv.resource_id === resource.id)
            const availableQuantity = invs.map(rinv => rinv.resource_quantity).reduce((a,b) => a+b, 0)
            const invCount = counts[resource.star] || 0

            if ((availableQuantity || 0) < invCount) {
              return 'not enough'
            }
            return invs
          }
        )
        if (!!xpResources.find(xpResource => xpResource === 'not enough')) {
          console.log(`Failed to level up by experience items for ape ${address}`)
          return res.status(500).json({
            msg: 'Not enough experience items to level up by these experience items'
          })
        }

        //create minus gold transaction
        const now = new Date()
        if (goldNeeded > 0) {
          console.log('Creating gold transaction to use the experience items')
          const goldTransaction = await Account_Transaction.create(
            {
              account_id: account.id,
              currency_id: goldCurrency.Currency.id,
              amount: -goldNeeded,
              transaction_date: now,
              source_of_transaction: {
                type: TRANSACTION_USE_EXPERIENCE_ITEM,
                total_count: totalCount,
                character_id: ape.id,
                account_id: account.id,
              },
              audit_fields: {
                transaction_date: now,
                currency_name: goldCurrency.Currency.name,
                amount: -goldNeeded,
                total_count: totalCount,
                tier: ape.tier,
                gold_by_item: XP_ITEM_PRICES[ape.tier]
              },
              is_settlement: false,
            },
            { transaction:transaction }
          )
          console.log('Created gold transaction to use the experience items', goldTransaction)
        }

        //update ape experience && reduce experience resources counts
        const updatingValues = resources.map(
          resource => {
            const invs = resourceInventories.filter(rinv => rinv.resource_id === resource.id)
            const invCount = counts[resource.star] || 0
            const exp = (typeof resource.effect === 'object' ? resource.effect : JSON.parse(resource.effect || '{}'))?.experience || 0

            if (invCount <= 0) return false

            let remaingInvCount = invCount
            let index = 0
            const updatingInvs = []
            while (index < invs.length && remaingInvCount > 0) {
              const inv = invs[index]
              updatingInvs.push({
                id: inv.id,
                resource_quantity: remaingInvCount > inv.resource_quantity ? 0 : inv.resource_quantity - remaingInvCount
              })
              remaingInvCount -= inv.resource_quantity
              index ++
            }
            
            return {
              inventories: updatingInvs,
              exp_amount: exp * invCount
            }
          }
        ).filter(val => !!val)

        const expAmount = ape.experience
        const creatingExpAmount = (updatingValues || []).map(trx => trx.exp_amount).reduce((a, b) => a + b, 0)
        const tierMaxLevelNumber = ape.Tier.max_level
        const tierMaxLevel = await getLevel(tierMaxLevelNumber)
        const maxExp = tierMaxLevel.experience
        const expOverflow = expAmount + creatingExpAmount - maxExp
        const updatingExperience = expOverflow > 0 ? maxExp : (expAmount + creatingExpAmount)
        
        const updatedInventories = await Resource_Inventory.bulkCreate(updatingValues.map(val => val.inventories).flat(), { transaction:transaction, updateOnDuplicate: ['resource_quantity'] })
        console.log('Experience Inventories are bulk-updated', updatedInventories)

        await ape.update({ experience: updatingExperience })
        ape.save({ transaction })
        console.log(`Update Character Experience: ${expAmount} -> ${updatingExperience}`)
        
        const updatedApes = await adjustLevelsForApesByExperiences({
          apes: [ape],
          redis,
          transaction,
        })
        
        return res.json({
          ape: updatedApes[0]
        })
      })
    } catch(err) {
      console.log(`Failed to level up ape ${address}`)
      console.log(err)
      return res.status(500).json({
        msg: 'Something went wrong'
      })
    }
  },

  async evolute(req, res) {
    const {
      address,
      wallet,
    } = req.body;

    if (!address || !wallet) {
      return res.status(400).json({
        msg: "No Ape or No Wallet"
      })
    }
    if (!await checkIfApeIsInWallet({
      wallet,
      address,
    })) {
      return res.status(404).json({
        msg: "This ape can not be detected in this wallet"
      })
    }

    try {
      let upgradedApe;
      await sequelize.transaction(async (transaction) => {
        const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction, withApes: true })

        console.log(`Getting ape from DB - ${address}`)
        var ape = await Apes.findOne({
          where: {
            address
          },
          include: [
            {
              model: Tier,
            }
          ]
        }, { transaction })
        console.log(`got ape from DB - ${ape}`)

        if (!ape) {
          throw new Error("No Ape found with this address")
        }
        
        const resources = await Resource.findAll({
          where: {
            type: 'Resource: Ascension Material',
            is_active: true,
          }
        }, { transaction })

        //check evolution for ape
        const canEvolution = await checkEvolution({ ape, account, resources, transaction })
        if (canEvolution !== true) {
          throw new Error(canEvolution || "This Ape is not able to ascend")
        }

        console.log(`Clearing ape from cache - ${address}`)
        await redis.del(`Ape_${address}`)

        console.log(`Clearing account from cache - ${wallet}`)
        await redis.del(`Account_${wallet}`)

        //evolution for ape
        upgradedApe = await evoluteApe({ ape, account, resources, transaction, redis })

      })
      return res.json({
        ape: upgradedApe
      })
    } catch(err) {
      console.log(`Failed to ascend ape ${address}`)
      console.log(err)
      return res.status(500).json({
        msg: err.message
      })
    }
  },

  async getCrowned(req, res) {
    const {
      wallet,
    } = req.body;
    if (!wallet) {
      return res.status(400).json({
        msg: "No Wallet"
      })
    }
    try {
      let crownedApe;
      await sequelize.transaction(async transaction => {
        const ape = await Crowned_Apes.findOne({
          where: {
            owner: wallet,
          }
        }, { transaction:transaction })

        if (!ape) {
          return;
        }

        crownedApe = await Apes.findOne({
          where: {
            id: ape.ape_id,
          }
        },{transaction:transaction})
      })
      if(!!crownedApe){
      return res.status(200).json({
        crownedApe
      })}
      else{
        return res.status(200).json({
          msg: 'No Ape Crowned'
        })
      }
    } catch (error) {
      console.log(`Failed to get crowned ape ${wallet}`)
      console.log(error)
      return res.status(500).json({
        msg: 'Something went wrong'
      })
    }
  },

  async setCrown(req, res) {
    const {
      wallet,
      apeId,
    } = req.body;
    if (!wallet || !apeId) {
      return res.status(400).json({
        msg: "No Wallet or no ape"
      })
    }
    try {
      let crownedApe;
      await sequelize.transaction(async transaction => {
        const ape = await Crowned_Apes.findOne({
          where: {
            owner: wallet,
          }
        }, { transaction })

        if (!ape) {
          await Crowned_Apes.create(
            {
              owner: wallet,
              ape_id: apeId,
            },{transaction:transaction}
          )
        } else {
          await Crowned_Apes.update(
            {
              owner: wallet,
              ape_id: apeId,
            },
            {
              where :{
                owner: wallet,
              },
              transaction:transaction
            }
          )
        }

        crownedApe = await Apes.findOne({
          where: {
            id: apeId,
          }
        })


      })
      return res.status(200).json({
        crownedApe
      })
    } catch (error) {
      console.log(`Failed to set crowned ape ${wallet}`)
      console.log(error)
      return res.status(500).json({
        msg: 'Something went wrong'
      })
    }
  },

  async removeCrown(req, res) {
    const {
      wallet,
      apeId,
    } = req.body;
    if (!wallet || !apeId) {
      return res.status(400).json({
        msg: "No Wallet or no ape"
      })
    }
    try {
      await sequelize.transaction(async transaction => {
        const ape = await Crowned_Apes.findOne({
          where: {
            owner: wallet,
          }
        }, { transaction })

        if (ape) {
          await Crowned_Apes.destroy(
            {
              where :{
                owner: wallet,
              },
              transaction:transaction
            }
          )
        }
      })
      return res.status(200).json({
        msg: 'Success'
      })
    } catch (error) {
      console.log(`Failed to set crowned ape ${wallet}`)
      console.log(error)
      return res.status(500).json({
        msg: 'Something went wrong'
      })
    }
  },

  async refreshStamina(req, res) {
    console.log('Starting to refresh stamina for all apes')
    
    try {
      sequelize.transaction(async transaction => {
        console.log('Getting all apes from DB')

        const apes = await Apes.findAll({
          transaction
        })

        const updatingApes = await Promise.all(apes.map(async ape => ({
          id: ape.id,
          stamina: (await getLevel(ape))?.stamina || 0
        })))

        await Apes.bulkCreate(updatingApes, {
          updateOnDuplicate: ["stamina"]
        })
      })
      return res.status(200).json({
        msg: 'Refreshed stamina for all accounts'
      })
    } catch (err) {
      console.log('Unable to refresh stamina for all accounts', err)
      return res.status(500).json({
        msg: 'Something went wrong',
        err,
      })
    }
  },

  async powers(req, res) {
    const powers = await fetchPowers({ redis })

    return res.json(powers)
},
}
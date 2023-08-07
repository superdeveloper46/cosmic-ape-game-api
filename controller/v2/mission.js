
var moment = require('moment');
const { 
    Apes, 
    Account_Transaction, 
    Character_Transaction, 
    Currency, 
    Inventory, 
    Item_Equipped, 
    Maps, 
    Missions, 
    Mission_Currencies, 
    Mission_Histories, 
    Mission_Item_Reward, 
    Mission_Resource_Reward,
    Resource,
    Utility,
    Utility_Inventory,
    Resource_Inventory,
    Items, 
    Tier,
    Effect,
    sequelize 
} = require('../../models/index');

const { Op } = require("sequelize");

const Redis = require("ioredis");
const getApesNotInWallet = require('../../utils/nft/get-apes-not-in-wallet');
const checkMultipleApesEquipable = require('../../utils/equips/check-multiple-apes-equipable');
const createMissionHistoriesForApes = require('../../utils/mission/create-mission-histories-for-apes');
const getMissionPreviewFromMissionHistory = require('../../utils/mission/get-mission-preview-from-mission-history');
const getRewards = require('../../utils/apes/get-rewards');
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed');
const getValueBetweenLowestAndHighest = require('../../utils/statics/get-value-between-lowest-and-highest');
const { TRANSACTION_PLAY_MISSION } = require('../../static/transaction-types');
const adjustLevelsForApesByExperiences = require('../../utils/levels/adjust-levels-for-apes-by-experiences');
const adjustLevelsForAccountByExperiences = require('../../utils/levels/adjust-levels-for-Account-by-experiences');
const fetchMissionSuccesses = require('../../utils/info/fetch-mission-successes');
const getRandomItemFromArray = require('../../utils/statics/get-random-item-from-array');
const { MISSION_TIER_ALL } = require('../../static/mission-tiers');
const { ITEM_CATEGORY_ALL } = require('../../static/item-categories');
const { ITEM_TYPE_ALL, ITEM_TYPE_LEGENDARY_EQUIPMENT, ITEM_TYPE_EQUIPMENT } = require('../../static/item-types');
const { EFFECT_CATEGORY_ALL } = require('../../static/effect-categories');
const { EFFECT_TYPE_NORMAL, EFFECT_TYPE_LEGENDARY } = require('../../static/effect-types');
const fetchItemImages = require('../../utils/info/fetch-item-images');
const { ITEM_STAR_ALL } = require('../../static/item-stars');
const { INVENTORY_SLOTS } = require('../../utils/consts');

const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host

});


module.exports = {
    async missions(req, res) {
        let searchTerm =  "missions"
        let missions

        try {
            missions = await redis.get(searchTerm)

            if (!!missions) {

                return res.json(JSON.parse(missions));
            }
        } catch (err) {
            console.log(`Failed to get missions from cache - ${err}`)
        }

        try {
            console.log('Getting missions from DB')

            missions = await Missions.findAll({
                where: {
                    is_active: true
                },
                include: [
                    {
                        model: Maps,
                        required: true,
                    }, {
                        model: Mission_Item_Reward,
                        required: false,
                    }, {
                        model: Mission_Currencies,
                        include: Currency
                    }, {
                        model: Mission_Resource_Reward,
                        include: [
                            {
                                model: Resource
                            }, {
                                model: Utility
                            }
                        ],
                        required: false,
                    }
                ]
            });

            console.log(`Got missions from DB && set to Cache`)
            redis.set(searchTerm, JSON.stringify(missions));

            return res.json(missions)
        } catch (err) {
            console.log(`Failed to get missions ${err}`)
            
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }
    },

    async missionsByRewardItem(req, res) {
        const {
            id,
        } = req.query

        if (!id) {
            return res.status(400).json({
                msg: 'You should provide item id to fetch missions rewarding the item'
            })
        }

        let searchTerm =  `missions_item_${id}`
        let missions

        try {
            console.log(`Getting missions for item(${id}) from cache`)
            missions = await redis.get(searchTerm)

            if (!!missions) {
                console.log(`Missions rewarding item(${id}) retrieved from cache - ${missions}`);
                return res.json(JSON.parse(missions))
            }
        } catch (err) {
            console.log(`Failed to get missions for item(${id}) from cache ${err}`)
        }

        try {
            console.log(`Getting missions for item(${id}) from DB`)

            missions = (
                await Mission_Item_Reward.findAll({
                    where: {
                        item_id: id,
                    },
                    include: [{
                        model: Missions,
                        where: {
                            is_active: true,
                        },
                        include: Maps,
                    }]
                })
            ).map(missionReward => missionReward.Mission);

            console.log(`Got missions for resource(${id}) from DB && set to Cache - ${missions}`)
            redis.set(searchTerm, JSON.stringify(missions), "EX", 600);
            
            return res.json(missions)
        } catch (err) {
            console.log(`Failed to get missions for item(${id}) from DB ${err}`)
        
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }
    },

    async missionsByRewardResource(req, res) {
        const {
            id,
        } = req.query

        if (!id) {
            return res.status(400).json({
                msg: 'You should provide resource name to fetch missions rewarding the resource'
            })
        }

        let searchTerm =  `missions_resource_${id}`
        let missions

        try {
            console.log(`Getting missions for ${id} from cache`)
            missions = await redis.get(searchTerm);

            if(!!missions) {
                console.log(`Missions rewarding resource(${id}) retrieved from cache`)
                return res.json(JSON.parse(missions))
            }
        } catch (err) {
            console.log(`Failed to get missions for ${id} from cache ${err}`)
        }
        
        try {
            console.log(`Getting missions for ${id} from DB`)
            missions = await Missions.findAll({
                where: {
                    icons: {
                        [Op.substring]: id
                    },
                    is_active: true,
                },
                include: [{
                    model: Mission_Currencies,
                    include: Currency
                }, {
                    model: Maps
                }]
            });

            console.log(`Got missions for resource(${id}) from DB && set to Cache - ${missions}`)
            redis.set(searchTerm, JSON.stringify(missions), "EX", 600);

            return res.json(missions)
        } catch (err) {
            console.log(`Failed to get missions for ${id} from DB ${err}`)
        
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }
    },

    async goMissionSelected(req, res) {
        var {
            missionId,
            apes: apesInfo,
            wallet,
        } = req.body

        if (!missionId || !apesInfo || !wallet) {
            return res.status(404).json({
                msg: "Can't Send apes to the mission"
            })
        }

        const apesNotInWallet = await getApesNotInWallet({
            addresses: (apesInfo || []).map(apeInfo => apeInfo.address),
            wallet,
        })
        if (!apesNotInWallet || apesNotInWallet.length > 0) {
            console.log(`MISSION_START - Some apes can not be detected in this wallet - ${apesNotInWallet.join(', ')}`);
            if (apesInfo.length > 1) {
                return res.status(200).json({
                    msg: 'Some apes can not be detected in this wallet'
                })
            } else {
                return res.status(200).json({
                    msg: 'This ape can not be detected in this wallet'
                })
            }
        }

        try {
            const apeAddresses = (apesInfo || []).map(ape => ape.address)
            
            console.log(`Multi Mission - Mission Start for these apes - (${apeAddresses.join(', ')})`);

            //clear redis cache for the apes
            redis.del(`Account_${wallet}`);
            apeAddresses.forEach(address => {
                redis.del(`Ape_${address}`);
                redis.del(`Mission_${missionId}_${address}`);
            });

            await sequelize.transaction(async (t) => {
                console.log(`Multi Mission - Getting Mission - Mission ID = ${missionId}`)
                const mission = await Missions.findOne({
                    where: {
                        id: missionId
                    },
                    include: [{
                        model: Mission_Currencies,
                        where: {
                            type: 'cost'
                        },
                        include: Currency,
                        required: false,
                    }, {
                        model: Mission_Resource_Reward,
                        where: {
                            reward_type: 'cost'
                        },
                        include: Resource,
                        required: false,
                    }],
                    transaction:t
                })

                if (!mission) {  
                    console.log(`Multi Mission - No mission - Mission ID = ${missionId}`)
                    return res.status(400).json({
                        msg: "Invalid Mission"
                    })
                }

                console.log(`Multi Mission - Getting Apes - Apes = ${apeAddresses.join(', ')}`)
                const apes = await Apes.findAll({
                    where: {
                        address: {
                            [Op.in]: apeAddresses
                        },
                    },
                    include: [{
                        model: Mission_Histories,
                        as: 'active_mission',
                        where: {
                            ended_at: null,
                        },
                        required: false,
                    }, {
                        model: Inventory,
                        where: {
                            item_durability: {
                                [Op.gt]: 0
                            },
                            effect_id: {
                                [Op.not]: null
                            },
                        },
                        required:false,
                        include: [{
                            model: Items,
                        }, {
                            model: Effect,
                        }]
                    }, {
                        model: Utility_Inventory,
                        where: {
                            utility_durability: {
                                [Op.gt]: 0
                            }
                        },
                        required:false,
                        include: Utility,
                    }, {
                        model: Resource_Inventory,
                        where: {
                            resource_quantity: {
                                [Op.gt]: 0
                            }
                        },
                        required: false,
                    }],
                    transaction:t
                })
                
                if (apes.filter(ape => !!ape.active_mission).length > 0) {
                    console.log(`Multi Mission - Some apes are already sent to missions = ${apes.filter(ape => !!ape.active_mission).map(ape => ape.address).join(', ')}`)
                    return res.status(400).json({
                        msg: "Some apes are already sent to missions"
                    })
                }
                
                console.log(`Multi Mission - Checking equipability for the apes - Apes = ${apeAddresses.join(', ')}`)
                const equipable = await checkMultipleApesEquipable({ apes, apesInfo, mission })
                if (!equipable.result) {
                    console.log(`Multi Mission - Equip Check is failed`, equipable)
                    return res.status(400).json({
                        msgs: equipable.info.map(info => info.msg)
                    }) 
                }

                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction: t, withApes: true })

                console.log(`Multi Mission - Creating mission histories - Mission ID = ${missionId} && Apes = ${apeAddresses.join(', ')}`)
                const missionHistories = await createMissionHistoriesForApes({ account, apes, mission, apesInfo, transaction: t, redis })
                if (!missionHistories) {
                    throw new Error(`Multi Mission - Cannot create mission histories && rolling back - Apes = ${apeAddresses.join(', ')}`)
                }

                //checking if all apes are being sent to the mission
                if (missionHistories.length === apes.length) {
                    return res.json({
                        missionHistories,
                        allSent: true,
                    })
                } else {
                    return res.json({
                        missionHistories,
                        allSent: false,
                    })
                }
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({
                msg: `Failed to start missions - ${err.message}`
            })
        }
      
    },

    async claimAllRewards(req, res) {
        var {
            addresses,
            wallet,
        } = req.body

        if (!wallet) {
            console.log(`REWARD_ALL - No Wallet Address`);
            return res.status(200).json({
                msg: 'Connect your wallet to claim rewards'
            })
        }

        if (!addresses || addresses === []) {
            console.log(`REWARD_ALL - No address`);
            return res.status(200).json([])
        }

        const apesNotInWallet = await getApesNotInWallet({
            addresses,
            wallet,
        })
        const addressesInMyWallet = addresses.filter(address => !(apesNotInWallet || []).includes(address))

        if (!apesNotInWallet || addressesInMyWallet.length === 0) {
            console.log(`REWARD_ALL - All apes can not be detected in this wallet - ${apesNotInWallet.join(', ')}`);
            if (addresses.length > 1) {
                return res.status(200).json({
                    msg: 'All apes can not be detected in this wallet'
                })
            } else {
                return res.status(200).json({
                    msg: 'This ape can not be detected in this wallet'
                })
            }
        }
        
        console.log(`Claiming All Rewards - started for this apes (${addressesInMyWallet.join(', ')})`);
        
        try {
            
            addressesInMyWallet.forEach(address => {
                let apeSearchTerm = `Ape_${address}`;
                redis.del(apeSearchTerm);
            });
            redis.del(`Account_${wallet}`)
            
            await sequelize.transaction(async (t) => {
                const account = await getOrCreateAccountIfNeeded({ address: wallet, transaction: t })
                const now = new Date()

                var apes = await Apes.findAll({
                    where: {
                        address: {
                            [Op.in]: addressesInMyWallet
                        },
                    },

                    include: [{
                        model: Mission_Histories,
                        as: 'active_mission',
                        where: {
                        ended_at: null,
                        expected_end_time: {
                            [Op.or]: [{
                                [Op.lte]: now,
                            }, {
                                [Op.eq]: null
                            }]
                        }
                        },
                        required: false,
                        include: [{
                            model: Item_Equipped,
                            as: 'equippedItems',
                            include: [
                                {
                                    model: Items
                                },
                                {
                                    model: Inventory,
                                    include:[ Effect],
                                }
                            ],
                        }, {
                            model: Missions,
                            include: [{
                                model: Mission_Item_Reward
                            }, {
                                model: Mission_Currencies,
                                include: Currency,
                            }, {
                                model: Maps,
                            }, {
                                model: Mission_Resource_Reward,
                                where: {
                                    reward_type: 'reward'
                                },
                                include: Resource
                            }]
                        }]
                    }, {
                        model: Tier,
                    }, {
                        model: Inventory,
                        where: {
                            item_durability: {
                                [Op.gt]: 0
                            },
                            effect_id: {
                                [Op.not]: null
                            },
                            name: {
                                [Op.not]: null
                            },
                            icon: {
                                [Op.not]: null
                            }
                        },
                        required:false
                    }],
                    transaction:t
                }, )
                apes = apes.filter(ape => !!ape.active_mission)

                const items = await Items.findAll({
                    where: {
                        is_active: true
                    },
                    transaction:t
                })

                const effects = await Effect.findAll({
                    where: {
                        is_active: true
                    },
                    transaction: t
                })

                const itemImages = await fetchItemImages({
                    redis
                })
                
                console.log(`Claiming All Rewards - only these apes are able to claim rewards (${apes.map(ape => ape.address).join(', ')})`);

                const rewards = await Promise.all(
                    apes.map(async ape => {
                        const missionEffect = await getMissionPreviewFromMissionHistory({ missionHistory: ape.active_mission, ape, transaction: t, redis })
                        let isFinished = !!ape.active_mission.expected_end_time || moment(ape.active_mission.started_at).add(missionEffect.time, 'hours').isBefore(moment())
                        
                        if (!isFinished) return undefined
                        
                        const missionSuccesses = await fetchMissionSuccesses({ redis })
                        const missionSuccess = missionSuccesses.find(row => row.mission_tier === ape.active_mission.Mission.tier) || {}
                        const luck = missionSuccess[`tier${ape.tier}`] || 100
                        const randNumber = Math.random() * 100

                        console.log(`Mission Success Luck for ${ape.name}`, luck)
                        console.log(`Mission Success Random Number for ${ape.name}`, randNumber)
                        const isSuccess = (randNumber <= luck)
                        console.log(`Mission Success for ${ape.name}`, isSuccess)

                        // finish the active mission
                        try {
                            console.log(`REWARD_APE_ID=${ape.id} - Saving Mission history ${JSON.stringify(ape.active_mission)}`);
                            ape.active_mission.set({
                                ended_at: Date.now(),
                                is_success: isSuccess
                            })
                            await ape.active_mission.save({ transaction: t })
                        } catch (err) {
                            console.log(err)
                            throw new Error(`Failed to claim reward for ${ape.id} all addresses  rolling back  ${addressesInMyWallet.join(', ')} - ${err}`)
                        }

                        if (isSuccess) {
                            
                            // getting chance
                            const rewardChance = (missionEffect?.Mission_Item_Rewards || []).map(
                                missionItemReward => (missionItemReward.luck || 0) * (100.0 + missionEffect.luck_bonus) / 100
                            )
                            const beRewarded = rewardChance.map(luck => Math.random() * 1000000 <= luck * 10000)
                            let itemRewards = beRewarded.map((rewarded, idx) => !!rewarded ? missionEffect.Mission_Item_Rewards[idx] : undefined)
                            //filtering undefined items
                            const remaingInventorySlots = (INVENTORY_SLOTS > ape.Inventories.length) ? (INVENTORY_SLOTS - ape.Inventories.length) : 0
                            itemRewards = itemRewards.filter(item => !!item).slice(0, remaingInventorySlots)

                            let rewardedItems = []
                            //create an inventory rewarded
                            try {
                                if (!!itemRewards) {
                                    console.log(`REWARD_APE_ID=${ape.id} - Saving rewarded items - ${JSON.stringify(itemRewards)} for this mission(${ape.active_mission})`);
                                    rewardedItems = await Promise.all(
                                        itemRewards.map(
                                            async itemReward => {
                                                //getting random item
                                                let { tier, category, star } = itemReward
                                                tier = !!tier ? tier : getRandomItemFromArray(MISSION_TIER_ALL)
                                                category = !!category ? category : getRandomItemFromArray(ITEM_CATEGORY_ALL)
                                                star = !!star ? star : getRandomItemFromArray(ITEM_STAR_ALL)

                                                const item = items.find(item => item.tier === tier && item.category === category && item.star === star)
                                                if (!item) {
                                                    console.log(`No item is available to be rewarded from mission - category(${category}), star(${star}), tier(${tier})`)
                                                    return false
                                                }

                                                //getting random effect
                                                const effectCategory = getRandomItemFromArray(EFFECT_CATEGORY_ALL)

                                                const effect = effects.find(effect => effect.type === effectCategory && effect.star === star && effect.tier === tier)
                                                if (!effect) {
                                                    console.log(`No item effect is available to be rewarded from mission - star(${star}), type(${effectCategory}), tier(${tier})`)
                                                    return false
                                                }

                                                //getting random image
                                                const itemCategoryImages = itemImages.filter(itemImage => itemImage.category.toLowerCase() === category.toLowerCase() && itemImage.star === star)
                                                
                                                const itemImage = getRandomItemFromArray(itemCategoryImages)
                                                if (!itemImage) {
                                                    console.log(`No item image is available to be rewarded from mission - category(${category}), star(${star})`)
                                                    return false
                                                }

                                                const createdInventory = await Inventory.create({
                                                    ape_id: ape.id,
                                                    item_id: item.id,
                                                    item_durability: item.durability,
                                                    experience: 0,
                                                    efficiency: item.efficiency,
                                                    effect_id: effect.id,
                                                    item_detail_id: itemImage.id,
                                                }, { transaction: t })


                                                return {
                                                    inventory: {...createdInventory.dataValues, Item:item,Effect:effect,Item_Detail:itemImage},
                                                    item,
                                                    itemImage,
                                                    effect
                                                }
                                            }
                                        )
                                    )
                                }
                            } catch (err) {
                                console.log(err);
                                throw new Error(`Failed to create Inventory for address  ape ${ape.id} - ${err}`)
                            }

                            //getting rewards
                            let resourceRewards;
                            try {
                                 resourceRewards = await getRewards({
                                    ape,
                                    missionEffect,
                                    transaction: t,
                                })
                            } catch (err){
                                console.log('Failed to get resource  rewards')
                                throw new Error(`Failed to create Resource inventory for address  ape ${ape.id} - ${err}`)
                            }

                            //getting currencies
                            console.log('Creating currency transactions since the apes are sent to the mission', missionEffect.Mission_Currencies)
                            const accountTransactions = await Account_Transaction.bulkCreate(
                            missionEffect.Mission_Currencies
                                .filter(missionCurrency => missionCurrency.Currency.belongs_to === 'Account' && !!missionCurrency.Currency.is_active)
                                .filter(missionCurrency => missionCurrency.type === 'reward')
                                .map(missionCurrency => ({
                                    account_id: account.id,
                                    currency_id: missionCurrency.currency_id,
                                    amount: (getValueBetweenLowestAndHighest(missionCurrency.lowest_amount, missionCurrency.highest_amount) * (missionCurrency.Currency.name === 'Gold' ? (100.0 + missionEffect.gold_bonus) / 100 : 1)).toFixed(1),
                                    transaction_date: now,
                                    source_of_transaction: {
                                        type: TRANSACTION_PLAY_MISSION,
                                        mission_id: missionCurrency.mission_id,
                                        character_id: ape.id,
                                        account_id: account.id,
                                    },
                                    audit_fields: {
                                        transaction_date: now,
                                        lowest_amount: missionCurrency.lowest_amount,
                                        highest_amount: missionCurrency.highest_amount,
                                        luck: missionCurrency.Currency.name === 'Gold' ? missionEffect.gold_bonus : 0,
                                    },
                                    is_settlement: false,
                                })),
                                {
                                    transaction: t
                                }
                            )
                            console.log('Account Transactions are bulk-created to play missions', accountTransactions)

                            const characterTransactions = await Character_Transaction.bulkCreate(
                            missionEffect.Mission_Currencies
                                .filter(missionCurrency => missionCurrency.Currency.belongs_to === 'Character' && !!missionCurrency.Currency.is_active)
                                .map(missionCurrency => ({
                                    character_id: ape.id,
                                    currency_id: missionCurrency.currency_id,
                                    amount: (getValueBetweenLowestAndHighest(missionCurrency.lowest_amount, missionCurrency.highest_amount) * (missionCurrency.Currency.name === 'Experience' ? (100.0 + missionEffect.exp_bonus) / 100 : 1)).toFixed(1),
                                    transaction_date: now,
                                    source_of_transaction: {
                                        type: TRANSACTION_PLAY_MISSION,
                                        mission_id: missionCurrency.mission_id,
                                        character_id: ape.id,
                                        account_id: account.id,
                                    },
                                    audit_fields: {
                                        transaction_date: now,
                                        lowest_amount: missionCurrency.lowest_amount,
                                        highest_amount: missionCurrency.highest_amount,
                                        luck: missionCurrency.Currency.name === 'Experience' ? missionEffect.exp_bonus : 0,
                                    },
                                    is_settlement: false,
                                })),
                                {
                                    transaction: t
                                }
                            )
                            console.log('Character Transactions are bulk-created to play missions', characterTransactions)

                            let experience = 0
                            //rewardig experience
                            try {
                                
                                
                                let stamina = missionEffect.Mission_Currencies
                                    .filter(missionCurrency => missionCurrency.Currency.belongs_to === 'Account')
                                    .filter(missionCurrency => missionCurrency.Currency.name === 'Stamina')
                                    .map(mc => getValueBetweenLowestAndHighest(mc.lowest_amount, mc.highest_amount))
                                    .reduce((a, c) => a + c, 0);

                                experience = missionEffect.Mission_Currencies
                                    .filter(missionCurrency => missionCurrency.Currency.belongs_to === 'Character')
                                    .filter(missionCurrency => missionCurrency.Currency.name === 'Experience')
                                    .map(mc => getValueBetweenLowestAndHighest(mc.lowest_amount, mc.highest_amount))
                                    .reduce((a, c) => a + c, 0);

                                account.set({
                                    experience:(account.experience || 0) + stamina
                                })

                                ape.set({
                                    experience:(ape.experience || 0) + experience * (100.0 + missionEffect.exp_bonus) / 100
                                })
                                await ape.save({ transaction: t })


                            }catch(err){
                                console.log(err)
                            }

                            return {
                                itemRewards: rewardedItems,
                                ape,
                                resourceRewards,
                                accountTransactions,
                                characterTransactions,
                                isSuccess,
                                experience,
                            }
                        } else {
                            return {
                                itemRewards: [],
                                ape,
                                resourceRewards: [],
                                accountTransactions: [],
                                characterTransactions: [],
                                isSuccess,
                                experience: 0,
                            }
                        }
                    })
                )
                await adjustLevelsForApesByExperiences({ apes, transaction: t, redis })
                await adjustLevelsForAccountByExperiences({ account, transaction: t, redis })

                console.log(`Claim All Rewards Done - Ape Addresses: ${addressesInMyWallet.join(', ')}`)
                return res.status(200).json(rewards.filter(reward => !!reward))
            })
        } catch (err) {
            console.log(err)
            console.log(`Unable to claim all rewards - Ape Addresses: ${addressesInMyWallet.join(', ')}`)
            res.status(400).json({
                msg: `Failed to claim rewards - ${err.message}`
            })
        }
    }
}
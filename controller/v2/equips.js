const { Apes, Default_Item_Equip, Items, Utility, Inventory,Item_Equipped,Mission_Histories } = require('../../models/index');

const Redis = require("ioredis");
const checkIfApeIsInWallet = require('../../utils/nft/check-if-ape-is-in-wallet');
const getLevel = require('../../utils/levels/get-level');
const {
  ITEM_CATEGORY_ALL
} = require('../../static/item-categories');
const { Op, where} = require('sequelize');
const {sequelize} = require("../../models");

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host

});

module.exports = {
  async defaultEquip(req, res) {
    const {
      address,
      wallet,
      inventory_id
    } = req.body

    let searchTerm = `Ape_${address}`;
    redis.del(searchTerm);

    if(!address || !inventory_id || !wallet) {
      return res.status(200).json({
        msg: "Invalid Parameters"
      })
    }

    if (!await checkIfApeIsInWallet({
      address,
      wallet,
    })) {
      console.log(`Default Equip - This ape can not be detected in this wallet`);
      return res.status(200).json({
        msg: "This ape can not be detected in this wallet"
      })
    }
    let defaultItemEquip;
    try {
      await sequelize.transaction(async (t) => {


        const inventory = await Inventory.findOne({
          where: {
            id: inventory_id
          },
          include:[{
            model: Items
          },{
            model:Apes
          }
          ]
        }, {transaction: t})

        let inventory_ape = inventory.Ape;
        let inventory_ape_address = inventory_ape.address
        redis.del(`Ape_${inventory_ape_address}`);
        const itemType = inventory?.Item?.category

        if (!itemType || !ITEM_CATEGORY_ALL.includes(itemType)) {
          return res.status(200).json({
            msg: "Invalid inventory"
          })
        }

        const ape = await Apes.findOne({
          where: {
            address
          }
        }, {transaction: t})


        if (!inventory || !ape) {
          throw new Error("Invalid Ape or Inventory")
        }
        let items_on_missions = await Item_Equipped.findAll({
          where: {
            inventory_id: inventory.id
          }
        }, {transaction: t})

        if (items_on_missions.length >0) {
          let mission_history_ids = items_on_missions.map(i => i.mission_history_id)
          let missionHistories = await Mission_Histories.findAll({
            where: {
              id: {
                [Op.in]:mission_history_ids
              },
              ended_at :{
                [Op.eq]: null
              }
            }
          }, {transaction: t});
          if(missionHistories.length > 0) {
            throw new Error("Item is being used on a mission and cannot be unequipped or swapped")
          }
        }

        if (inventory.ape_id !== ape.id) {
          inventory.set({
            ape_id: ape.id
          }, {transaction: t})
        }

        await  inventory.save({transaction:t})

        const inventoryEquips = await Default_Item_Equip.findAll({
          where: {
            inventory_id: inventory.id
          }
        }, {transaction: t})

        if(inventoryEquips.length > 0 ){
          //delete the inventory if it belongs to another character
          if(inventoryEquips[0].ape_id !== ape.id){
            await Default_Item_Equip.destroy({
              where: {
                inventory_id: {
                  [Op.eq]: inventory.id
                }
              },transaction:t
            })
          }
        }

        const defaultItemEquips = await Default_Item_Equip.findAll({
          where: {
            ape_id: ape.id,
            inventory_id: {
              [Op.not]: null
            }
          },
          include: [{
            model: Inventory,
            include: Items
          }]
        }, {transaction: t})


        const updatingDefaultItemEquip = defaultItemEquips.filter(
            dItem => dItem.Inventory.Item?.category === itemType
        )


        try {
          if (updatingDefaultItemEquip.length > 0) {
            for (const de of updatingDefaultItemEquip) {
              const oldInventoryId = de.inventory_id
              const ongoingMissions = await sequelize.query(`
                SELECT *
                FROM Mission_Histories AS mh
                LEFT JOIN Item_Equippeds AS ie ON mh.id = ie.mission_history_id
                WHERE mh.ended_at IS NULL
                AND ie.inventory_id = :inventory
              `, { replacements: {inventory: oldInventoryId}, type: sequelize.QueryTypes.SELECT })

              if (ongoingMissions.length > 0) {
                throw new Error('Swapping inventory is being used on a mission')
              }

              const removedDefaultItems = await de.set({
                ape_id:ape.id,
                inventory_id:inventory.id,
                item_id:inventory.item_id
              })
              await de.save({transaction: t})
            }

          } else{
            defaultItemEquip = await Default_Item_Equip.create({
              ape_id: ape.id,
              inventory_id: inventory.id,
              item_id: inventory.item_id,
            }, {transaction: t})
          }


        } catch (err) {
          console.log('Remove && Create failed for Equipping items', err)

          throw new Error(err.message || "Something went wrong failed to equip item")
        }
      });
    }catch(err ){
      console.log(err)
      return res.status(200).json({
        msg: err.message
      })

    }
    return res.json({
      item_equip: defaultItemEquip
    })
  },

  async defaultUnequip(req, res) {
    const {
      address,
      wallet,
      inventory_id
    } = req.body

    let searchTerm = `Ape_${address}`;
    redis.del(searchTerm);

    if(!address || !inventory_id || !wallet) {
      return res.status(200).json({
        msg: "Invalid Parameters"
      })
    }

    if (!await checkIfApeIsInWallet({
      address,
      wallet,
    })) {
      console.log(`Default Unequip - This ape can not be detected in this wallet`);
      return res.status(200).json({
        msg: "This ape can not be detected in this wallet"
      })
    }

    const inventory = await Inventory.findOne({
      where: {
        id: inventory_id
      }
    })

    const ape = await Apes.findOne({
      where: {
        address
      }
    })

    if (!inventory || !ape) {
      return res.status(200).json({
        msg: "No Ape or No Inventory"
      })
    }

    //checking if the inventory is being used on a mission
    const ongoingMissions = await sequelize.query(`
      SELECT *
      FROM Mission_Histories AS mh
      LEFT JOIN Item_Equippeds AS ie ON mh.id = ie.mission_history_id
      WHERE mh.ended_at IS NULL
      AND ie.inventory_id = :inventory
    `, { replacements: {inventory: inventory.id}, type: sequelize.QueryTypes.SELECT })

    console.log(ongoingMissions)
    if (ongoingMissions.length > 0) {
      return res.json({
        msg: 'This inventory is being used on a mission'
      })
    }

    const defaultItemEquip = await Default_Item_Equip.findOne({
      where: {
        ape_id: ape.id,
        inventory_id: inventory.id,
      }
    })

    if (!defaultItemEquip) {
      return res.status(200).json({
        msg: "This inventory is not equipped yet"
      })
    }
    const destroyResult = await Default_Item_Equip.destroy({
      where: {
        ape_id: ape.id,
        inventory_id: inventory.id,
      }
    })

    return res.json({
      item_unequip: destroyResult
    })
  },
}
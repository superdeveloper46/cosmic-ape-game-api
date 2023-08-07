const { Op } = require('sequelize');
const { 
  Apes,
  Inventory,
  Items,
  Resource,
  Resource_Inventory,
  Utility,
  Utility_Inventory,
  Mission_Histories,
  Mission_Item_Reward,
  Missions,
  Maps,
  Item_Equipped,
  Default_Item_Equip,
  Tier,
  Effect,
  Item_Detail
} = require('../../models/index');
const getCurrenciesByCharacters = require('../currencies/get-currencies-by-characters');

const getApesInfoByAddresses = async ({
  addresses,
  transaction
}) => {


  let existing_apes  = await Apes.findAll({
    where: {
      address: {
        [Op.in]: addresses
      }
    },
    order: [
      ['name', 'ASC']
    ],
    attributes:['id'],
    transaction
  });

  let existing_ape_ids = existing_apes.map(a => a.id)

  let resource_inventories = await Resource_Inventory.findAll({
    where:{
      ape_id:{
        [Op.in]: existing_ape_ids
      },
      resource_quantity: {
        [Op.gt]: 0
      }
    },

    include: {
      model: Resource,
    },
    transaction
  })

  let inventories = await Inventory.findAll({
    where:{
      ape_id:{
        [Op.in]: existing_ape_ids
      },
      item_durability: {
        [Op.gt]: 0
      },
      effect_id: {
        [Op.not]: null
      }
    },
    include: [{
      model: Items,
      include: {
        model: Mission_Item_Reward,
        include: [{
          model: Missions,
          include: Maps,
        }],
      },
    },{
      model:Effect
    },{
      model:Item_Detail
    }
    ],
    required: false,
    transaction
  })

  let utility_inventory = await Utility_Inventory.findAll({
    where: {
      ape_id:{
        [Op.in]: existing_ape_ids
      },
      utility_quantity: {
        [Op.gt]: 0
      }

    },
    include: {
      model: Utility,
    },
    transaction
  })


  let apes = await Apes.findAll({
    where: {
      address: {
        [Op.in]: addresses
      }
    },

    include: [
      {
        model: Mission_Histories,
        as: 'active_mission',
        where: {
          ended_at: null
        },
        include: [
          {
            model: Missions,
            required: false,
            include: [{
              model: Maps,
              required: true,
            }],
          },
          {
            model: Item_Equipped,
            as: 'equippedItems',
            required: false,
            include: [
              {
                model: Items
              },
              {
                model: Inventory,
                include: Effect,
                include: Item_Detail
              }
            ],
          }
        ],
        required: false
      },

      {
        model: Default_Item_Equip,
        where: {
          inventory_id: {
            [Op.not]: null
          }
        },
        include: [{
          model: Inventory,
          include: [{
            model:Items
          },{
            model:Effect
          },
            {
              model:Item_Detail
            }]
        }],
        as: 'default_items',
        required: false,
      },

      {
        model: Tier,
        required: true
      },
    ],
    transaction
  })

   apes = apes.map(a => {
    let inv = inventories.filter(i => i.ape_id=== a.id);
    let resInv = resource_inventories.filter(i => i.ape_id=== a.id);
    let util_inv = utility_inventory.filter(i => i.ape_id=== a.id)

    return {...(a.dataValues),Inventories:inv||[],Resource_Inventories:resInv||[],Utility_Inventories:util_inv}
  })
  console.log(`Got apes from DB `)
  const currencies = await getCurrenciesByCharacters({
    apes,
    transaction,
  })

  return (apes || []).map(ape => ({
    ...(ape.dataValues || ape || {}),
    currencies: currencies.filter(currency => currency.character_id === ape.id)
  }))
}

module.exports = getApesInfoByAddresses;
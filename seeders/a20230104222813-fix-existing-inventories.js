'use strict';

const {
  Inventory,Item_Detail,Items
} = require("../models/index");
const getRandomItemFromArray = require('../utils/statics/get-random-item-from-array');
const {Op} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    let invs = await Inventory.findAll({
      include: [{
        model:Items,
        required:true,
        where : {
          category: {
            [Op.ne]: null
          },
          star: {
            [Op.ne]: null
          },
          is_active:true
        }
      }]
    });

    try {
      let it_details = await Item_Detail.findAll();




      await  Inventory.bulkCreate(invs.map(inv => ({
        ...inv.dataValues,
        id: inv.id,
        item_detail_id: module.exports.random_item_id(inv.Item, it_details)
      })),{
        updateOnDuplicate: ['item_detail_id']
      })
    }catch(err){
      throw err
    }



  },

  random_item_id(item,it_details ){

    let categoryFiltered = it_details.filter(itd => itd.category.toLowerCase()===item.category.toLowerCase() && itd.star===item.star)


    if(categoryFiltered){
      let item_detail = getRandomItemFromArray(categoryFiltered);

      return item_detail.id;
    } else {
      return null;
    }



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

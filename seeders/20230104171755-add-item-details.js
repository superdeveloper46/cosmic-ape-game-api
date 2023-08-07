'use strict';
const { ItemDetails } = require('../models/index');
const {Op} = require("sequelize");
const item_details_csv = require('../assets/info/item_details.csv')
const csvtojson = require("csvtojson");
const itemImagesFile = require("../assets/info/item-images.csv");

module.exports = {
  async up (queryInterface, Sequelize) {
    const item_details_json = await csvtojson().fromString(item_details_csv)
    const now = new Date()
    const item_details = item_details_json.map(row => ({
      category: row['Equipment Type'],
      star: Number(row['Star']),
      rarity: row['Rarity'],
      manufacturer:row['Manufacturer'],
      image:row['Image'],
      name:row['Equipment Name'],
      description:row['Equipment Description'],
      createdAt: now,
      updatedAt: now
    }))
    return queryInterface.bulkInsert('Item_Detail',item_details);



  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Item_Detail', null, {});
  }
};

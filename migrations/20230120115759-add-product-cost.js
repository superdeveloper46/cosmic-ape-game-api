'use strict';

const csvtojson = require("csvtojson");
const products_csv = require("./helpers/products.csv");
const {Resource, Currency} = require("../models");
const {Op} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {

    const products_json = await csvtojson().fromString(products_csv);

    let productNames = products_json.map(p => p.Product_Name)
    let resources = await Resource.findAll({
      where:{
        name: {
          [Op.in]: productNames
        },
        is_active:true
      }
    });

    let currencies = await  Currency.findAll({
    })
    let shop_products =  products_json.map( p  => {
      let product_ref;
      if(p.Type==="Resource") {
        product_ref = resources.find(r => r.name === p.Product_Name)
      } else if(p.Type==="Currency"){
        product_ref = currencies.find(c => c.name === p.Product_Name)
      }
      let purchase_currency = currencies.find(c => c.name===p.Currency);
      let now = new Date()
      return {
        product_type:p.Type,
        product_id:product_ref.id,
        limit_type:p.Limit_Type,
        limit:p.Limit,
        quantity:p.Quantity,
        cost:p.Cost,
        currency_id:purchase_currency.id,
        is_active:true,
        createdAt:now,
        updatedAt:now
      }
    });

    await queryInterface.bulkDelete('Products', null, {});

    await  queryInterface.bulkInsert("Products", shop_products)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

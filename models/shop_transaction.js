'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop_Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop_Transaction.init({
    product_id: DataTypes.INTEGER,
    ape_id:DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date_purchased: DataTypes.DATE,
    total: DataTypes.INTEGER,
    purchase_currency: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shop_Transaction',
  });
  return Shop_Transaction;
};
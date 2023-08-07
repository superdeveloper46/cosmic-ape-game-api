'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

      this.belongsTo(models.Currency, { foreignKey: 'product_id', constraints: false });
      this.belongsTo(models.Resource, { foreignKey: 'product_id', constraints: false });

      this.hasOne(models.Currency,{
        sourceKey:'currency_id',
        foreignKey:'id',
        as:"purchase_currency"
      })
    }
  }
  Product.init({
    product_type: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    limit_type: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    cost:DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER,
    is_active:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });


  Product.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if(instance == null){
        continue
      }
      if (instance.product_type === "Resource" && instance.Resource !== undefined) {
        instance.product_details = instance.Resource;
        instance.dataValues.product_details = instance.Resource
      } else if (instance.product_type === "Currency" && instance.Currency !== undefined) {
        instance.product_details = instance.Currency;
        instance.dataValues.product_details = instance.Currency
      }
      // delete to prevent duplicates
      delete instance.Resource;
      delete instance.dataValues.Resource;
      delete instance.Currency;
      delete instance.dataValues.Currency;

    }
  });
  return Product;
};
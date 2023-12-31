'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: 'product_id',
        constraints: false,
        scope: {
          product_type: 'Currency'
        }
      });
    }
  }
  Currency.init({
    name: DataTypes.STRING,
    belongs_to: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    category: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};
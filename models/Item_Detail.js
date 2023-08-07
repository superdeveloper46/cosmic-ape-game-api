'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item_Detail.init({
    category: DataTypes.STRING,
    star: DataTypes.INTEGER,
    rarity: DataTypes.STRING,
    manufacturer:DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item_Detail',
    tableName: 'Item_Detail'
  });
  return Item_Detail;
};
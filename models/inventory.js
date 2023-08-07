'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Apes, {
        sourceKey: 'ape_id',
        foreignKey: 'id'
      });

      this.hasOne(models.Items, {
        sourceKey: 'item_id',
        foreignKey: 'id'
      });

      this.hasOne(models.Effect, {
        sourceKey: 'effect_id',
        foreignKey: 'id'
      });

      this.hasOne(models.Item_Detail, {
        sourceKey: 'item_detail_id',
        foreignKey: 'id'
      });
    }
  }
  Inventory.init({
    ape_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    item_durability: DataTypes.INTEGER,
    efficiency: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    effect_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    item_detail_id:DataTypes.INTEGER,
    slots:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};
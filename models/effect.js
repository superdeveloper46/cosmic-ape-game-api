'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class effect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  effect.init({
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    tier: DataTypes.INTEGER,
    effect: DataTypes.STRING,
    bonus: DataTypes.DOUBLE,
    max_bonus: DataTypes.DOUBLE,
    star: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    minimum_efficiency:DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Effect',
  });
  return effect;
};
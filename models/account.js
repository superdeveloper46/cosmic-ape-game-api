'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Apes, {
        sourceKey: 'address',
        foreignKey: 'owner',
      })
    }
  }
  Account.init({
    address: DataTypes.STRING,
    mfa: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    username: DataTypes.STRING,
    twitter: DataTypes.STRING,
    discord: DataTypes.STRING,
    facebook: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    website: DataTypes.INTEGER,
    frame_type: DataTypes.INTEGER,
    level:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
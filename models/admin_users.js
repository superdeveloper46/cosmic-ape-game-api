'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin_users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    verified: DataTypes.INTEGER,
    verificationCode: DataTypes.STRING,
    sentCodeTime: DataTypes.DATE,
    validCount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Admin_users',
  });
  return Admin_users;
};
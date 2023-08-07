'use strict';
const { Craft_Recipe } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    await Craft_Recipe.update(
      {
        is_active: false,
      },
      {
        where: {
          is_active: true
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {

  }
};

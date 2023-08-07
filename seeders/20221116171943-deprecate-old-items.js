'use strict';
const { Items } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const deprecatedItems = await Items.update(
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
    await Items.update(
      {
        is_active: true,
      },
      {
        where: {
          is_active: false
        }
      }
    )
  }
};

'use strict';
const { Effect } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    await Effect.update(
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
    await Effect.update(
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

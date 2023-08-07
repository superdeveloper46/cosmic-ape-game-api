'use strict';
const { Missions } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const deprecatedMissions = await Missions.update(
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
    await Missions.update(
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

'use strict';
const { Op } = require('sequelize');
const { Missions } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const deprecatedMissions = await Missions.update(
      {
        is_active: false,
      },
      {
        where: {
          tier: {
            [Op.in]: [5, 6]
          }
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

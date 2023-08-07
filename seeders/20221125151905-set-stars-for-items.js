'use strict';
const { Items } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const commonItems = await Items.update(
      {
        star: 1,
      },
      {
        where: {
          type: 'Equipment',
          is_active: true,
        }
      }
    )

    const legendaryItems = await Items.update(
      {
        star: 3,
      },
      {
        where: {
          type: 'Legendary Equipment',
          is_active: true,
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

'use strict';

const {
  Resource,
} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    const repairHammers = await Resource.findAll({
      where: {
        type: 'Resource: Repair Item'
      }
    })

    await Promise.all(
      repairHammers.map(resource => resource.update({
        effect: {
          efficiency: resource.name === 'Legendary Hammer'
                    ? 100
                    : resource.name === 'Uncommon Hammer'
                    ? 10
                    : resource.name === 'Rare Hammer'
                    ? 20
                    : resource.name === 'Epic Hammer'
                    ? 50
                    : 0
        }
      }))
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

'use strict';

const {
  Resource,
} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    const resources = await Resource.findAll({
      where: {
        type: 'Resource: Level-Up Material'
      }
    })
    const exps = [
      {
        star: 1,
        experience: 250
      }, {
        star: 2,
        experience: 625
      }, {
        star: 3,
        experience: 1563
      }, {
        star: 4,
        experience: 3906
      }, {
        star: 5,
        experience: 9766
      }, {
        star: 6,
        experience: 24414
      }, 
    ]
    await Resource.bulkCreate(resources.map(resource => ({
      id: resource.id,
      effect: {
        experience: exps.find(exp => exp.star === resource.star)?.experience || 0
      }
    })), {
      updateOnDuplicate: ['effect'],
    })
    
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

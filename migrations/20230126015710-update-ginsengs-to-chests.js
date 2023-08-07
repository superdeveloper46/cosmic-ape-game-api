'use strict';
const { Op } = require("sequelize");
const { Resource } = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    const ginsengs = await Resource.findAll({
      where: {
        name: {
          [Op.in]: ['100 Year Old Ginseng', '1000 Year Old Ginseng', '10000 Year Old Ginseng']
        }
      }
    })

    const ginseng100 = ginsengs.find(g => g.name === '100 Year Old Ginseng')
    const ginseng1000 = ginsengs.find(g => g.name === '1000 Year Old Ginseng')
    const ginseng10000 = ginsengs.find(g => g.name === '10000 Year Old Ginseng')

    Resource.bulkCreate([
      {
        id: ginseng100.id,
        name: 'Uncommon Mysterious Chest',
        star: 2,
        rarity: 'Uncommon',
        stack: 99,
        gold: 1,
        salvage: 1,
      },
      {
        id: ginseng1000.id,
        name: 'Rare Mysterious Chest',
        star: 3,
        rarity: 'Rare',
        stack: 99,
        gold: 10,
        salvage: 2,
      },
      {
        id: ginseng10000.id,
        name: 'Epic Mysterious Chest',
        star: 4,
        rarity: 'Epic',
        stack: 99,
        gold: 100,
        salvage: 3,
      },
    ], {
      updateOnDuplicate: ['name', 'star', 'rarity', 'stack', 'gold', 'salvage'],
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

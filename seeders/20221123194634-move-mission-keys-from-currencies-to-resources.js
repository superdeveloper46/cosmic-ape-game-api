'use strict';
const { Op } = require('sequelize');
const { Mission_Currencies, Currency, Resource } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const keys = await Currency.findAll({
      where: {
        category: 'key',
      }
    })

    await Mission_Currencies.destroy({
      where: {
        type: 'cost',
        currency_id: {
          [Op.in]: keys.map(key => key.id)
        }
      }
    })

    await Currency.destroy({
      where: {
        category: 'key'
      }
    })

    const createdResources = await Resource.bulkCreate([
      {
        name: 'Common Key',
        type: 'Utility Item',
        star: 1,
        rarity: 'Common',
        description: 'Legendary Mission Access',
        icon: 'Key1.png',
        stack: 99,
        gold: 50,
        salvage: 1,
        tier: 1,
        is_active: true,
      },
      {
        name: 'Uncommon Key',
        type: 'Utility Item',
        star: 2,
        rarity: 'Uncommon',
        description: 'Legendary Mission Access',
        icon: 'Key2.png',
        stack: 99,
        gold: 100,
        salvage: 2,
        tier: 2,
        is_active: true,
      },
      {
        name: 'Rare Key',
        type: 'Utility Item',
        star: 3,
        rarity: 'Rare',
        description: 'Legendary Mission Access',
        icon: 'Key3.png',
        stack: 99,
        gold: 200,
        salvage: 3,
        tier: 3,
        is_active: true,
      },
      {
        name: 'Epic Key',
        type: 'Utility Item',
        star: 4,
        rarity: 'Epic',
        description: 'Legendary Mission Access',
        icon: 'Key4.png',
        stack: 99,
        gold: 400,
        salvage: 4,
        tier: 4,
        is_active: true,
      },
      {
        name: 'Legendary Key',
        type: 'Utility Item',
        star: 5,
        rarity: 'Legendary',
        description: 'Legendary Mission Access',
        icon: 'Key5.png',
        stack: 99,
        gold: 800,
        salvage: 5,
        tier: 5,
        is_active: true,
      },
      {
        name: 'Mythic Key',
        type: 'Utility Item',
        star: 6,
        rarity: 'Mythic',
        description: 'Legendary Mission Access',
        icon: 'Key6.png',
        stack: 99,
        gold: 1600,
        salvage: 6,
        tier: 6,
        is_active: true,
      },
    ])

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

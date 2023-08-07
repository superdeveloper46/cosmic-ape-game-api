'use strict';
const { Items } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const items = await Items.findAll({
      where: {
        is_active: true
      }
    })

    const efficiencies = [
      [200, 400, 600, 800, 1000, 1200, 1400, 1600],
      [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
      [300, 600, 900, 1200, 1500, 1800, 2100, 2400]
    ]

    const salvages = [
      [10, 15, 25, 40, 60, 85, 115, 150],
      [20, 30, 50, 80, 120, 170, 230, 300],
      [40, 60, 100, 160, 240, 340, 460, 600]
    ]

    const golds = [
      [10, 20, 40, 80, 160, 320, 640, 1280],
      [25, 50, 100, 200, 400, 800, 1600, 3200],
      [50, 100, 200, 400, 800, 1600, 3200, 6400],
    ]
    const categories = ['trinket', 'jewelry', 'footwear']
    const tiers = [1, 2, 3, 4, 5, 6, 7, 8]

    const now = new Date()

    const star2Items = categories.map(
      category => tiers.map(
        tier => ({
          tier,
          category,
          star: 2,
          name: `2 Star ${category[0].toUpperCase() + category.slice(1)} Tier ${tier}`,
          efficiency: efficiencies[1][tier - 1],
          salvage: salvages[1][tier - 1],
          gold: golds[1][tier - 1],
          experience: 0,
          gxp: 0,
          durability: 1,
          type: 'Equipment',
          rarity: 'Uncommon',
          is_active: true,
          createdAt: now,
          updatedAt: now,
        })
      )
    ).flat()

    const updatedItems = await Items.bulkCreate(
      items.map(item => ({
        ...item.dataValues,
        name: `${item.star} Star ${item.category[0].toUpperCase() + item.category.slice(1)} Tier ${item.tier}`,
        efficiency: efficiencies[item.star - 1][item.tier - 1],
        salvage: salvages[item.star - 1][item.tier - 1],
        gold: golds[item.star - 1][item.tier - 1],
        experience: 0,
        gxp: 0,
        durability: 1,
        type: 'Equipment',
        updatedAt: now,
      }))
      .concat(star2Items),

      {
        updateOnDuplicate: ['tier', 'category', 'star', 'name', 'efficiency', 'salvage', 'gold', 'experience', 'gxp', 'durability', 'type', 'rarity', 'is_active', 'createdAt', 'updatedAt'],
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

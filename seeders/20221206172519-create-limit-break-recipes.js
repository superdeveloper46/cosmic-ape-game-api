'use strict';
const { 
  Craft_Recipe,
  Items,
  Currency,
  Resource,
} = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const currencies = await Currency.findAll()
    const items = await Items.findAll({
      where: {
        is_active: true
      }
    })
    const resources = await Resource.findAll({
      where: {
        is_active: true
      }
    })

    const now = new Date()

    const gold = currencies.find(currency => currency.name === 'Gold')
    const cosmic = currencies.find(currency => currency.name === 'Cosmic')
    const purpleQuartz = resources.find(resource => resource.name === 'Purple Quartz')
    const lotusFlower = resources.find(resource => resource.name === 'Lotus Flower')
    const ironwood = resources.find(resource => resource.name === 'Ironwood')
    const prismaOre = resources.find(resource => resource.name === 'Prisma Ore')
    const leather = resources.find(resource => resource.name === 'Iridian Scale Leather')
    const silverWool = resources.find(resource => resource.name === 'Silver Wool')

    const goldCosts = [
      [],
      [0, 0, 10000, 20000, 40000, 80000, 160000, 320000, 640000],
      [0, 0, 15000, 30000, 60000, 120000, 240000, 480000, 960000],
      [0, 0, 20000, 40000, 80000, 160000, 320000, 640000, 1280000]
    ]
    const cosmicCosts = [
      [], 
      [0, 0, 50, 100, 150, 200, 250, 300, 350],
      [0, 0, 75, 150, 225, 300, 375, 450, 525],
      [0, 0, 100, 200, 300, 400, 500, 600, 700]
    ]
    const materialCosts = [
      [],
      [0, 0, 15, 25, 35, 50, 75, 110, 150],
      [0, 0, 25, 40, 55, 75, 110, 165, 225],
      [0, 0, 30, 50, 70, 100, 150, 220, 300]
    ]
    const tiers = [2, 3, 4, 5, 6, 7, 8]
    const categories = ['trinket', 'jewelry', 'footwear']
    const stars = [1, 2, 3]

    const creatingRecipes = categories.map(
      category => tiers.map(
        tier => stars.map(
          star => {
            const ingredientMaterials = category === 'trinket'
                              ? [purpleQuartz, lotusFlower, ironwood]
                              : category === 'jewelry'
                              ? [prismaOre, purpleQuartz, ironwood]
                              : [leather, silverWool, prismaOre]

            const craftableItem = items.find(item => item.category === category && item.tier === tier && item.star === star)
            const ingredientItem = items.find(item => item.category === category && item.tier === (tier - 1) && item.star === star)

            return [ {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: ingredientItem.id,
              ingredient_type: 'item',
              ingredient_quantity: 1,
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }, {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: gold.id,
              ingredient_type: 'currency',
              ingredient_quantity: goldCosts[star][tier],
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }, {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: cosmic.id,
              ingredient_type: 'currency',
              ingredient_quantity: cosmicCosts[star][tier],
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }, {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: ingredientMaterials[0].id,
              ingredient_type: 'resource',
              ingredient_quantity: materialCosts[star][tier],
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }, {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: ingredientMaterials[1].id,
              ingredient_type: 'resource',
              ingredient_quantity: materialCosts[star][tier],
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }, {
              craftable_id: craftableItem.id,
              craftable_tier: tier,
              ingredient_id: ingredientMaterials[2].id,
              ingredient_type: 'resource',
              ingredient_quantity: materialCosts[star][tier],
              is_active: true,
              createdAt: now,
              updatedAt: now,
            }]
          }
        )
      )
    ).flat(3)

    const createdRecipes = await Craft_Recipe.bulkCreate(creatingRecipes)
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

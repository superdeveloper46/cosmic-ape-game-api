'use strict';

const { Op } = require("sequelize");
const {
  Resource,
} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    const resourceMaterials = [
      'Ironwood', 'Prisma Ore', 'Purple Quartz', 'Lotus Flower', 'Iridian Scale Leather', 'Silver Wool',
      '100 Year Old Ginseng', '1000 Year Old Ginseng', '10000 Year Old Ginseng'
    ]
    const enhancementMaterials = [
      'Common Experience Relic', 'Uncommon Experience Relic', 'Rare Experience Relic', 'Epic Experience Relic', 'Legendary Experience Relic', 'Mythic Experience Relic',
      'Uncommon Hammer', 'Rare Hammer', 'Epic Hammer', 'Legendary Hammer',
      'Cosmic Stone', 'Cosmic Shard', 'Cosmic Ore', 'Cosmic Gem', 'Cosmic Artifact'
    ]
    const currencies = [
      'Common Treasure Chest', 'Uncommon Treasure Chest', 'Rare Treasure Chest', 'Epic Treasure Chest', 'Legendary Treasure Chest', 'Mythic Treasure Chest',
      'Common Key', 'Uncommon Key', 'Rare Key', 'Epic Key', 'Legendary Key', 'Mythic Key',
      'Broken Resin', 'Resin', 'Gold Resin', 'Rainbow Resin'
    ]

    await Resource.update(
      {
        subcategory: 'Resource Material'
      }, 
      {
        where: {
          name: {
            [Op.in]: resourceMaterials
          }
        }
      }
    )

    await Resource.update(
      {
        subcategory: 'Enhancement Material'
      }, 
      {
        where: {
          name: {
            [Op.in]: enhancementMaterials
          }
        }
      }
    )

    await Resource.update(
      {
        subcategory: 'Currency'
      }, 
      {
        where: {
          name: {
            [Op.in]: currencies
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

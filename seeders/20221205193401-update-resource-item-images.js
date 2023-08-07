'use strict';
const { Resource } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    const resources = await Resource.findAll({
      where: {
        is_active: true
      }
    })

    const updatedResources = await Resource.bulkCreate([
        {
          id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
          icon: '100_Year_Old_Ginseng.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
          icon: '1000_Year_Old_Ginseng.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
          icon: '10000_Year_Old_Ginseng.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
          icon: 'Iridian_Scale_Leather.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Ironwood').id,
          icon: 'Ironwood.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Lotus Flower').id,
          icon: 'Lotus_Flower.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Prisma Ore').id,
          icon: 'Prisma_Ore.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Purple Quartz').id,
          icon: 'Purple_Quartz.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Silver Wool').id,
          icon: 'Silver_Wool.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Common Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Uncommon Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Rare Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Epic Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Legendary Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
        {
          id: resources.find(resource => resource.name === 'Mythic Key').id,
          icon: 'Key.png',
          updatedAt: now,
        },
      ],
      {
        updateOnDuplicate: ['icon', 'updatedAt'],
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

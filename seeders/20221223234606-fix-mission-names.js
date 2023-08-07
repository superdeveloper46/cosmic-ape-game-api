'use strict';


/** @type {import('sequelize-cli').Migration} */
const { Missions,Maps } = require('../models/index');
const {Op} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    let missions = await Missions.findAll({
      where: {
        is_active: true,
        secondary_branch: {
          [Op.eq]: 'Legendary'
        }
      },
      include: [
        {
          model: Maps,
          where: {
            name : {
              [Op.in]: ['Evergreen Village','Waterfall Village','Iridian Village']
            }
          },
          required: true,
        }
      ]
    });

    let evergreen_ids =   missions
        .filter(m => m.Map.name === 'Evergreen Village').map(m => m.id);
    let waterfallids =   missions
        .filter(m => m.Map.name === 'Waterfall Village').map(m => m.id);
    let iridian_ids =   missions
        .filter(m => m.Map.name === 'Iridian Village').map(m => m.id);


    await Missions.update(
        {
          secondary_branch: 'Footwear'
        },
        {
          where: {
            id : {
              [Op.in]: evergreen_ids
            }
          }
        }
    );
    await Missions.update(
        {
          secondary_branch: 'Trinket'
        },
        {
          where: {
            id : {
              [Op.in]: waterfallids
            }
          }
        }
    )
    await Missions.update(
        {
          secondary_branch: 'Jewelry'
        },
        {
          where: {
            id : {
              [Op.in]: iridian_ids
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

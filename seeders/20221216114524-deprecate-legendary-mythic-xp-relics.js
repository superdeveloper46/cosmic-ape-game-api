'use strict';

const { Op } = require("sequelize");
const {
  Resource,
} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    await Resource.update({
      is_active: false
    }, {
      where: {
        name: {
          [Op.in]: ['Legendary Experience Relic', 'Mythic Experience Relic']
        }
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await Resource.update({
      is_active: true
    }, {
      where: {
        name: {
          [Op.in]: ['Legendary Experience Relic', 'Mythic Experience Relic']
        }
      }
    })
  }
};

'use strict';

const { Op } = require("sequelize");
const {
  Tier,
} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    await Tier.destroy({
      where: {
        tier: {
          [Op.gt]: 4
        }
      }
    });
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

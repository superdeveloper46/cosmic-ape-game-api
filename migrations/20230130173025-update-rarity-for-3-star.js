"use strict";
const { Items } = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await Items.update(
      {
        rarity: 'Rare'
      },
      {
        where: {
          star: 3
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
  },
};

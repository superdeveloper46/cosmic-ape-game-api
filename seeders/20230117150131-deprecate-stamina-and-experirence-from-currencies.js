"use strict";
const { Op } = require("sequelize");
const { Currency } = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await Currency.update(
      {
        is_active: false,
      },
      {
        where: {
          name: {
            [Op.in]: ['Experience', 'Stamina'],
          }
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await Currency.update(
      {
        is_active: true,
      },
      {
        where: {
          name: {
            [Op.in]: ['Experience', 'Stamina'],
          }
        },
      }
    );
  },
};

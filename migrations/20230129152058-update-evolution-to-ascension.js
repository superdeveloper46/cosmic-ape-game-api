"use strict";
const { Resource } = require("../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await Resource.update(
      {
        type: 'Resource: Ascension Material'
      },
      {
        where: {
          type: 'Resource: Evolution Material'
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await Resource.update(
      {
        type: 'Resource: Evolution Material'
      },
      {
        where: {
          type: 'Resource: Ascension Material'
        },
      }
    );
  },
};

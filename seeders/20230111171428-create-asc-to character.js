'use strict';

const {Currency} = require("../models");
module.exports = {
  async up (queryInterface, Sequelize) {

    await Currency.destroy({
      where: {name:'Ascension'}
    })
    await queryInterface.bulkInsert('Currencies', [
      {
        name: 'Ascension',
        belongs_to: 'Character',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]
    );
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

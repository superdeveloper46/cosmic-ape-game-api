'use strict';
const {
  Currency,
  Apes
} = require("../models");
const getCurrenciesByCharacters = require("../utils/currencies/get-currencies-by-characters");

module.exports = {
  async up (queryInterface, Sequelize) {
    const apes = await Apes.findAll()
    const currencies = await Currency.findAll()

    const apeCurrencies = await getCurrenciesByCharacters({ apes })
    const experience = currencies.find(currency => currency.name === 'Experience')

    await Apes.bulkCreate(apes.map(ape => ({
      id: ape.id,
      experience: apeCurrencies.find(currency => currency.character_id === ape.id && currency.currency_id === experience.id)?.amount || 0,
    })), {
      updateOnDuplicate: ["experience"]
    })
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

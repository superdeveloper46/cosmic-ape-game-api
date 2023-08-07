'use strict';
const {
  Currency,
  Apes,
  Account
} = require("../models");
const getCurrenciesByAccounts = require("../utils/currencies/get-currencies-by-accounts");
const getLevel = require("../utils/levels/get-level");

module.exports = {
  async up (queryInterface, Sequelize) {
    const accounts = await Account.findAll({ include: Apes })
    const accountCurrencies = await getCurrenciesByAccounts({ accounts })
    const staminas = accountCurrencies.filter(currency => currency.Currency.name === 'Stamina')
    const updatingApes = []

    await Promise.all(
      accounts.map(async account => {
        const apes = account.Apes

        if (!apes || apes.length === 0) return false

        const stamina = staminas.find(st => st.account_id === account.id)
        if (!stamina || !stamina.amount) return false

        let index = 0
        let remainingStamina = stamina.amount

        while (remainingStamina > 0 && index < apes.length) {
          const ape = apes[index]
          const level = await getLevel(ape)
          const maxStamina = level?.stamina || 0

          updatingApes.push({
            id: ape.id,
            stamina: maxStamina > remainingStamina ? remainingStamina : maxStamina
          })

          remainingStamina -= maxStamina
          index ++
        }
      })
    )

    await Apes.bulkCreate(updatingApes, {
      updateOnDuplicate: ["stamina"]
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

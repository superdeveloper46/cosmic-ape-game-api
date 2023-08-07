'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currencies', [
      {
        name: 'Ascension',
        belongs_to: 'Account',
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

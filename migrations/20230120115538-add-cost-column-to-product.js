'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [ await queryInterface.addColumn(
        'Products',
        'cost',
        {
          type: Sequelize.INTEGER,
        },
    )]



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

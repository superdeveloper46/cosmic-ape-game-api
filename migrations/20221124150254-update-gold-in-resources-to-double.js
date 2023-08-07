'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Resources',
      'gold',
      {
        type: Sequelize.DOUBLE
      },
    )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Resources',
      'gold',
      {
        type: Sequelize.INTEGER
      },
    )
  }
};

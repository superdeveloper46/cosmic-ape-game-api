'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return [ queryInterface.addColumn(
        'Accounts',
        'level',
        {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
    )];
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Accounts',
        'level'
    );
  }
};

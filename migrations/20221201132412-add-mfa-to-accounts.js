'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Accounts',
        'mfa',
        {
          type: Sequelize.STRING,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Accounts', 'mfa'),
    ]);
  }
};

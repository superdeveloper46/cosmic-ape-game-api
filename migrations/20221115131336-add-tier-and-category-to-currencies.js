'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Currencies',
        'tier',
        {
          type: Sequelize.INTEGER,
        },
      ),

      queryInterface.addColumn(
        'Currencies',
        'category',
        {
          type: Sequelize.STRING,
          defaultValue: 'basic',
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Currencies', 'tier'),
      queryInterface.removeColumn('Currencies', 'category'),
    ]);
  }
};

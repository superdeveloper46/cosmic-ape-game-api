'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Effects',
        'star',
        {
          type: Sequelize.INTEGER,
          defaultValue: true,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Effects', 'star'),
    ]);
  }
};

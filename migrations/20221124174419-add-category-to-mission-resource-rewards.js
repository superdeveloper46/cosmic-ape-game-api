'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Mission_Resource_Rewards',
        'category',
        {
          type: Sequelize.STRING,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Mission_Resource_Rewards', 'category'),
    ]);
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Mission_Item_Rewards',
        'star',
        {
          type: Sequelize.INTEGER,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Mission_Item_Rewards', 'star'),
    ]);
  }
};

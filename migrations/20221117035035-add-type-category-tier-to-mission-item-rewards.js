'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Mission_Item_Rewards',
        'category',
        {
          type: Sequelize.STRING,
        },
      ),

      queryInterface.addColumn(
        'Mission_Item_Rewards',
        'tier',
        {
          type: Sequelize.INTEGER,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Mission_Item_Rewards', 'category'),
      queryInterface.removeColumn('Mission_Item_Rewards', 'tier'),
    ]);
  }
};

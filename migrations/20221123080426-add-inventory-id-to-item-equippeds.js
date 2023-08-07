'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Item_Equippeds',
        'inventory_id',
        {
          type: Sequelize.INTEGER,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Item_Equippeds', 'inventory_id'),
    ]);
  }
};

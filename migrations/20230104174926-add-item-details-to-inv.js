'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
          'Inventories',
          'item_detail_id',
          {
            type: Sequelize.INTEGER,
          },
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Inventories', 'item_detail_id'),
    ]);
  }
};

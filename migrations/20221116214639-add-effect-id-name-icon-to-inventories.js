'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Inventories',
        'effect_id',
        {
          type: Sequelize.INTEGER,
        },
      ),

      queryInterface.addColumn(
        'Inventories',
        'name',
        {
          type: Sequelize.STRING,
        },
      ),

      queryInterface.addColumn(
        'Inventories',
        'icon',
        {
          type: Sequelize.STRING,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Inventories', 'effect_id'),
      queryInterface.removeColumn('Inventories', 'name'),
      queryInterface.removeColumn('Inventories', 'icon'),
    ]);
  }
};

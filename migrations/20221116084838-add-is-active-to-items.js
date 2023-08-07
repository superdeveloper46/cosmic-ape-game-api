'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Items',
        'is_active',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Items', 'is_active'),
    ]);
  }
};

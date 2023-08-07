'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [ await queryInterface.addColumn(
        'Inventories',
        'slots',
        {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    ),
        await queryInterface.addColumn(
            'Resource_Inventories',
            'slots',
            {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
        )];
  },

  async down (queryInterface, Sequelize) {

      return [
          await queryInterface.removeColumn(
          'Inventories',
          'slots'
            ),
          await queryInterface.addColumn(
              'Resource_Inventories',
              'slots'
          )
      ];
  }
};

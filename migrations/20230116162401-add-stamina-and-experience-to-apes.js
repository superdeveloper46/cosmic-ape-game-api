'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Apes',
        'stamina',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      ),

      queryInterface.addColumn(
        'Apes',
        'experience',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Apes', 'stamina'),
      queryInterface.removeColumn('Apes', 'experience'),
    ]);
  }
};

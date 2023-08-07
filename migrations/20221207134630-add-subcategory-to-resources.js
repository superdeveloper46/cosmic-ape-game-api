'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Resources',
        'subcategory',
        {
          type: Sequelize.STRING,
        },
      ),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Resources', 'subcategory'),
    ]);
  }
};

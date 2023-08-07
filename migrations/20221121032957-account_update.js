'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Accounts', 'username', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'twitter', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'discord', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'facebook', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'linkedin', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'website', {
        type: Sequelize.STRING,
      }),

      queryInterface.addColumn('Accounts', 'frame_type', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Accounts', 'username'),
      queryInterface.removeColumn('Accounts', 'twitter'),
      queryInterface.removeColumn('Accounts', 'discord'),
      queryInterface.removeColumn('Accounts', 'facebook'),
      queryInterface.removeColumn('Accounts', 'linkedin'),
      queryInterface.removeColumn('Accounts', 'website'),
      queryInterface.removeColumn('Accounts', 'frame_type'),
    ])
  },
}

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()

    return queryInterface.bulkInsert('Currencies', [
      {
        name: 'Tier 1 Key',
        tier: 1,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }, {
        name: 'Tier 2 Key',
        tier: 2,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }, {
        name: 'Tier 3 Key',
        tier: 3,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }, {
        name: 'Tier 4 Key',
        tier: 4,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }, {
        name: 'Tier 5 Key',
        tier: 5,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }, {
        name: 'Tier 6 Key',
        tier: 6,
        belongs_to: 'Account',
        category: 'key',
        createdAt: now,
        updatedAt: now
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Currencies', null, {});
  }
};

'use strict';
const {Effect} = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([queryInterface.addColumn(
          'Effects', // table name
          'minimum_efficiency', // new field name
          {
            type: Sequelize.DOUBLE,
            allowNull: true,
          },
      )]
    )

    let effects = await Effect.findAll({
      where: {
        is_active:true
      }
    })

    let effect_updates = effects.map(e => {
      let min_efficiency = 0.1
      if(e.star === 2){
        min_efficiency = 0.2
      } else if(e.star === 3){
        min_efficiency = 0.3
      }
      return {
        id:e.id,
        minimum_efficiency:min_efficiency
      }
    })

    await Effect.bulkCreate(effect_updates, {
      updateOnDuplicate:['minimum_efficiency']
    });
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Effect', 'minimum_efficiency'),
    ]);
  }
};

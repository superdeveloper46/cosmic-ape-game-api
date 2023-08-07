'use strict';
const { Mission_Currencies , Currency,Missions,sequelize } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {


      let Asc = await  Currency.findOne({
          where: {
              name: 'Ascension'
          }
      })
      let Cosmic = await Currency.findOne({
          where: {
              name: 'Cosmic'
          }
      })

        await  Mission_Currencies.update({
            currency_id: Asc.id
        },{
            where:{
                currency_id: Cosmic.id
            }
        });



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

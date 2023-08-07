'use strict';

const {Currency,Missions,Maps} = require("../models");
const csvtojson = require("csvtojson");
const mission_currencies_csv = require("./helpers/Mission_Currency_Rewards.csv");
const {error} = require("sequelize-cli/lib/helpers/view-helper");
module.exports = {
  async up (queryInterface, Sequelize) {
    let Cosmic = await Currency.findOne({
      where: {
        name: 'Cosmic'
      }
    });

    let active_missions = await  Missions.findAll({
      include:[Maps],
      where :{
        is_active:true
      }
    })

    const mission_currencies_json = await csvtojson().fromString(mission_currencies_csv);

    const now = new Date()
    let mc_cosmic  = mission_currencies_json.map(mcj => {

      let mission = active_missions.find(m => mcj.Type.toLowerCase() === m.main_branch.toLowerCase()  &&
          mcj.Location.toLowerCase() === m.Map.name.toLowerCase() &&
          mcj.Secondary_Branch.toLowerCase().toLowerCase() && m.secondary_branch.toLowerCase() &&
          parseInt(mcj.Tier) === m.tier
      )
      if(!mission){
        throw Error("Failed to find missions")
      }

      return {
        mission_id: mission.id,
        currency_id: Cosmic.id,
        type: 'reward',
        lowest_amount: parseInt(mcj.Currency_Cosmic),
        createdAt: now,
        updatedAt: now
      }
    })

    const createdMissionKeyCurrencies = await queryInterface.bulkInsert('Mission_Currencies', mc_cosmic, {})


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

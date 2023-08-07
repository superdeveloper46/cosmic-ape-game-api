'use strict';
const csvtojson = require('csvtojson')
const mission_currencies_csv = require('./helpers/Mission_Currency_Rewards.csv')
const {Mission_Currencies,Currency,Missions,Maps} = require("../models");
const {Op} = require("sequelize");


module.exports = {
  async up (queryInterface, Sequelize) {

    const mission_currencies_json = await csvtojson().fromString(mission_currencies_csv)

    let existing_mission_currencies = await  Mission_Currencies.findAll({
      include:[
        {
          model:Currency,
          where : {
            name:'Ascension'
          }
        },
        {
          model: Missions,
          where:{
            tier: {
              [Op.lte]:4
            }
          },
          include:[Maps]
        }
      ]
    });

    let  reward_updates = existing_mission_currencies.map( mc => {
      let mcj_val = mission_currencies_json.find(mcj => mcj.Type.toLowerCase() === mc.Mission.main_branch.toLowerCase()  &&
          mcj.Location.toLowerCase() === mc.Mission.Map.name.toLowerCase() &&
          mcj.Secondary_Branch.toLowerCase().toLowerCase() && mc.Mission.secondary_branch.toLowerCase() &&
          parseInt(mcj.Tier) === mc.Mission.tier
      )
      if(!mcj_val){
        throw Error(`Failed to find a value for  type [${mc.Mission.main_branch}] map [${mc.Mission.Map.name}] secondary branch [${mc.Mission.secondary_branch}] Tier [${ mc.Mission.tier}]`)
      }
     return {
       id:mc.id,
       mission_id:mc.mission_id,
       currency_id:mc.currency_id,
       lowest_amount:mcj_val.Currency_Ascension_lowest,
       highest_amount:mcj_val.Currency_Ascension_highest
     }

    });

      await Mission_Currencies.bulkCreate(reward_updates,
          {
            updateOnDuplicate: ["lowest_amount", "highest_amount"]
          })

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

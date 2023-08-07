'use strict';
const { Resource, Missions, Mission_Resource_Reward, Maps } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    await Mission_Resource_Reward.destroy({
      where: {}
    })

    const missions = await Missions.findAll({
      where: {
        is_active: true
      },
      include: Maps
    })

    const resources = await Resource.findAll({
      where: {
        is_active: true
      }
    })

    const createdMissionResourceRewards = await Mission_Resource_Reward.bulkCreate([
      //region 1
      //tier 1

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 2,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 2,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 2,
        highest_amount: 5,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 2,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 2,
        highest_amount: 5,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 2,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 2,
        highest_amount: 5,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 2

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 2,
        highest_amount: 4,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 2,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 4,
        highest_amount: 7,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 4,
        highest_amount: 7,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 4,
        highest_amount: 7,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 4,
        highest_amount: 7,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 4,
        highest_amount: 7,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 4,
        highest_amount: 7,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 3

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 2,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 6,
        highest_amount: 10,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 6,
        highest_amount: 10,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 6,
        highest_amount: 10,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 6,
        highest_amount: 10,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 6,
        highest_amount: 10,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 6,
        highest_amount: 10,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 4

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 2,
        highest_amount: 4,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 2,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 8,
        highest_amount: 15,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 8,
        highest_amount: 15,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 8,
        highest_amount: 15,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 8,
        highest_amount: 15,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 8,
        highest_amount: 15,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 8,
        highest_amount: 15,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 5

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 10,
        highest_amount: 20,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 10,
        highest_amount: 20,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 10,
        highest_amount: 20,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 6

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 30,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 5,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Experience Relic').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Treasure Chest').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 47,
        lowest_amount: 1,
        highest_amount: 3,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 6,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 12,
        highest_amount: 25,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Prisma Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 12,
        highest_amount: 25,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Ironwood').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 12,
        highest_amount: 25,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 12,
        highest_amount: 25,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 55,
        lowest_amount: 12,
        highest_amount: 25,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Silver Wool').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 35,
        lowest_amount: 12,
        highest_amount: 25,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      
      //region 1
      //tier 1

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 3,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 3,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 3,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        reward_id: resources.find(resource => resource.name === 'Common Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 2

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 2,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 4,
        highest_amount: 8,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 4,
        highest_amount: 8,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 4,
        highest_amount: 8,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === '100 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        reward_id: resources.find(resource => resource.name === 'Uncommon Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 3

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 1,
        highest_amount: 4,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Stone').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 6,
        highest_amount: 12,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 6,
        highest_amount: 12,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 6,
        highest_amount: 12,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        reward_id: resources.find(resource => resource.name === 'Rare Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 4

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 2,
        highest_amount: 3,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 8,
        highest_amount: 16,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 8,
        highest_amount: 16,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 8,
        highest_amount: 16,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === '1000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        reward_id: resources.find(resource => resource.name === 'Epic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 5

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 2,
        highest_amount: 4,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Shard').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 4,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95.5,
        lowest_amount: 10,
        highest_amount: 20,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.95,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.005,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        reward_id: resources.find(resource => resource.name === 'Legendary Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      
      //tier 6

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Artifact').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 65,
        lowest_amount: 2,
        highest_amount: 5,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Ore').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 25,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Gem').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 10,
        lowest_amount: 1,
        highest_amount: 2,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Purple Quartz').id,
        category: 'Mineral Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 12,
        highest_amount: 24,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Gem').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Lotus Flower').id,
        category: 'Plant Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 12,
        highest_amount: 24,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Gem').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Iridian Scale Leather').id,
        category: 'Animal Resource',
        reward_type: 'reward',
        reward_description: null,
        name: 'Bronze',
        luck: 95,
        lowest_amount: 12,
        highest_amount: 24,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Cosmic Gem').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Silver',
        luck: 4.9,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === '10000 Year Old Ginseng').id,
        reward_type: 'reward',
        reward_description: null,
        name: 'Gold',
        luck: 0.01,
        lowest_amount: 1,
        highest_amount: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        reward_id: resources.find(resource => resource.name === 'Mythic Key').id,
        reward_type: 'cost',
        reward_description: null,
        name: 'Key',
        luck: 100,
        lowest_amount: 1,
        highest_amount: null,
      },
    ])
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

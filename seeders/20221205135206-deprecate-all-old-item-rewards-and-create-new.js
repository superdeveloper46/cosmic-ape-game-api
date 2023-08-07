'use strict';
const { Missions, Mission_Item_Reward, Maps } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    await Mission_Item_Reward.destroy({
      where: {}
    })

    const missions = await Missions.findAll({
      where: {
        is_active: true
      },
      include: Maps
    })

    const createdMissionItemRewards = await Mission_Item_Reward.bulkCreate([
      //region 1
      //tier 1

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.8,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.8,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.8,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.75,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.25,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.75,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.25,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.75,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        star: 1,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.25,
        star: 2,
        category: null,
      },

      //tier 2

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.36,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.24,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.36,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.24,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.36,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.24,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.3,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.3,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.3,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        star: 2,
        category: 'footwear',
      },

      //tier 3

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.48,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.32,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.48,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.32,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.48,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.32,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.4,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: 'jewelry',
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.4,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: 'trinket',
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.4,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.2,
        star: 2,
        category: 'footwear',
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      },

      //tier 4

      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.6,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.6,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.6,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.4,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.5,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.5,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.5,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.5,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 5.5,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4,
        star: 2,
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.5,
        star: 3,
        category: null,
      },

      //region 2
      //tier 1
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 1.86,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 1.86,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.86,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.42,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.10,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.30,
        star: 3,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.10,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.30,
        star: 3,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.10,
        star: 1,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.30,
        star: 3,
        category: 'footwear',
      }, 
      
      //tier 2
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 2.40,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.80,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.20,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.80,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.80,
        star: 3,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.20,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.80,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.80,
        star: 3,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.20,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.80,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.20,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.80,
        star: 3,
        category: 'footwear',
      },
      
      //tier 3
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.10,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.10,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 3.10,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.70,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        star: 1,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.50,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.00,
        star: 3,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        star: 1,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.50,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.00,
        star: 3,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        star: 1,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.50,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.00,
        star: 3,
        category: 'footwear',
      },
      
      //tier 4
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 3.60,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.60,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 3.60,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.20,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.80,
        star: 2,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.80,
        star: 3,
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.20,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.80,
        star: 2,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.80,
        star: 3,
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.20,
        star: 3,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.80,
        star: 2,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 1,
        luck: 4.20,
        star: 2,
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.80,
        star: 3,
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.20,
        star: 3,
        category: null,
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

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
        luck: 2.4,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.4,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.4,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.2,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.7,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.7,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 2.7,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 0.3,
        type: 'Legendary Equipment',
        category: null,
      },

      //tier 2
      
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.28,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.28,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 3.36,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.28,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.78,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 2.8,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.42,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.78,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 2.8,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.42,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.78,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 2.8,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 0.42,
        type: 'Legendary Equipment',
        category: null,
      },

      //tier 3
      
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.36,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.36,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 4.32,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.36,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.86,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 3.6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.54,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.86,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 3.6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.54,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 4.86,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 3.6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 0.54,
        type: 'Legendary Equipment',
        category: null,
      },

      //tier 4
      
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.44,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.44,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 5.28,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.44,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.94,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 4.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.66,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.94,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 4.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.66,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 5.94,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 4.4,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 0.66,
        type: 'Legendary Equipment',
        category: null,
      },

      //tier 5
      
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.52,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.52,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 6.24,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.52,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 7.02,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 5.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.78,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 7.02,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 5.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.78,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 7.02,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 5.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 0.78,
        type: 'Legendary Equipment',
        category: null,
      },

      //tier 6
      
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Lost City of Lasol' && mission.secondary_branch === 'Gold' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.6,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Prism Valley' && mission.secondary_branch === 'Experience' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.6,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 7.2,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crystal Forest' && mission.secondary_branch === 'Gold & Experience' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.6,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 8.1,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Azulhenge' && mission.secondary_branch === 'Resource (Mineral)' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.9,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 8.1,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Crusader Village' && mission.secondary_branch === 'Resource (Plant)' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.9,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 8.1,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 6,
        type: 'Equipment',
        category: null,
      },
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Rainfall Village' && mission.secondary_branch === 'Resource (Animal)' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 0.9,
        type: 'Legendary Equipment',
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
        luck: 2.56,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 2.56,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 2.56,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 0.32,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.00,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.00,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item1',
        tier: 1,
        luck: 4.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item2',
        tier: 1,
        luck: 3.00,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item3',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 1
        ).id,
        name: 'item4',
        tier: 1,
        luck: 1.50,
        type: 'Legendary Equipment',
        category: null,
      }, 

      
      //tier 2
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 3.20,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 3.20,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 3.20,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 2,
        luck: 0.40,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 6.60,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 1.80,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 6.60,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 1.80,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item1',
        tier: 2,
        luck: 6.60,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item2',
        tier: 2,
        luck: 1.80,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item3',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 2
        ).id,
        name: 'item4',
        tier: 2,
        luck: 1.80,
        type: 'Legendary Equipment',
        category: null,
      }, 

      
      //tier 3
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 3.84,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 3.84,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 3.84,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 3,
        luck: 0.48,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 7.70,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 2.10,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 7.70,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 2.10,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item1',
        tier: 3,
        luck: 7.70,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item2',
        tier: 3,
        luck: 2.10,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item3',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 3
        ).id,
        name: 'item4',
        tier: 3,
        luck: 2.10,
        type: 'Legendary Equipment',
        category: null,
      }, 

      
      //tier 4
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 4.48,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 4.48,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 4.48,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 4,
        luck: 0.56,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 8.80,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 2.40,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 8.80,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 2.40,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item1',
        tier: 4,
        luck: 8.80,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item2',
        tier: 4,
        luck: 2.40,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item3',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 4
        ).id,
        name: 'item4',
        tier: 4,
        luck: 2.40,
        type: 'Legendary Equipment',
        category: null,
      }, 

      
      //tier 5
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 5.12,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 5.12,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 5.12,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 5
        ).id,
        name: 'item4',
        tier: 5,
        luck: 0.64,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 9.90,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 2.70,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item4',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 9.90,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 2.70,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item4',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item1',
        tier: 5,
        luck: 9.90,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item2',
        tier: 5,
        luck: 2.70,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item3',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 5
        ).id,
        name: 'item4',
        tier: 5,
        luck: 2.70,
        type: 'Legendary Equipment',
        category: null,
      }, 

      
      //tier 6
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 5.76,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 5.76,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 5.76,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian River' && mission.secondary_branch === 'Evolution' && mission.tier === 6
        ).id,
        name: 'item4',
        tier: 6,
        luck: 0.72,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 11.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 3.00,
        type: 'Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
        category: 'jewelry',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Evergreen Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item4',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 11.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 3.00,
        type: 'Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
        category: 'trinket',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Waterfall Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item4',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item1',
        tier: 6,
        luck: 11.00,
        type: 'Equipment',
        category: null,
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item2',
        tier: 6,
        luck: 3.00,
        type: 'Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item3',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
        category: 'footwear',
      }, 
      {
        mission_id: missions.find(
          mission => mission.main_branch === 'Expedition' && mission.Map.name === 'Iridian Village' && mission.secondary_branch === 'Legendary' && mission.tier === 6
        ).id,
        name: 'item4',
        tier: 6,
        luck: 3.00,
        type: 'Legendary Equipment',
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

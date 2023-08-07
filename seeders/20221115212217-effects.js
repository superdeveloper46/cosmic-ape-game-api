'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()

    return queryInterface.bulkInsert('Effects', [
      //normal - speed
      {
        category: 'normal',
        type: 'speed',
        tier: 1,
        effect: 'Reduces Mission Time',
        bonus: 5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 2,
        effect: 'Reduces Mission Time',
        bonus: 7.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 3,
        effect: 'Reduces Mission Time',
        bonus: 10,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 4,
        effect: 'Reduces Mission Time',
        bonus: 12.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 5,
        effect: 'Reduces Mission Time',
        bonus: 15,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 6,
        effect: 'Reduces Mission Time',
        bonus: 17.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 7,
        effect: 'Reduces Mission Time',
        bonus: 20,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'speed',
        tier: 8,
        effect: 'Reduces Mission Time',
        bonus: 25,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - prosperity
      {
        category: 'normal',
        type: 'prosperity',
        tier: 1,
        effect: 'Increase Gold gain',
        bonus: 10,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 2,
        effect: 'Increase Gold gain',
        bonus: 12.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 3,
        effect: 'Increase Gold gain',
        bonus: 15,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 4,
        effect: 'Increase Gold gain',
        bonus: 17.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 5,
        effect: 'Increase Gold gain',
        bonus: 20,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 6,
        effect: 'Increase Gold gain',
        bonus: 22.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 7,
        effect: 'Increase Gold gain',
        bonus: 25,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'prosperity',
        tier: 8,
        effect: 'Increase Gold gain',
        bonus: 30,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - aptitude
      {
        category: 'normal',
        type: 'aptitude',
        tier: 1,
        effect: 'Increase Experience gain',
        bonus: 10,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 2,
        effect: 'Increase Experience gain',
        bonus: 12.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 3,
        effect: 'Increase Experience gain',
        bonus: 15,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 4,
        effect: 'Increase Experience gain',
        bonus: 17.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 5,
        effect: 'Increase Experience gain',
        bonus: 20,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 6,
        effect: 'Increase Experience gain',
        bonus: 22.5,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 7,
        effect: 'Increase Experience gain',
        bonus: 25,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'aptitude',
        tier: 8,
        effect: 'Increase Experience gain',
        bonus: 30,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - smash
      {
        category: 'normal',
        type: 'smash',
        tier: 1,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 2,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 25,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 3,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 4,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 35,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 5,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 6,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 45,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 7,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'smash',
        tier: 8,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - harvest
      {
        category: 'normal',
        type: 'harvest',
        tier: 1,
        effect: 'Increases Plant Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 2,
        effect: 'Increases Plant Resource Gathering',
        bonus: 25,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 3,
        effect: 'Increases Plant Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 4,
        effect: 'Increases Plant Resource Gathering',
        bonus: 35,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 5,
        effect: 'Increases Plant Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 6,
        effect: 'Increases Plant Resource Gathering',
        bonus: 45,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 7,
        effect: 'Increases Plant Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'harvest',
        tier: 8,
        effect: 'Increases Plant Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - hunt
      {
        category: 'normal',
        type: 'hunt',
        tier: 1,
        effect: 'Increases Animal Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 2,
        effect: 'Increases Animal Resource Gathering',
        bonus: 25,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 3,
        effect: 'Increases Animal Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 4,
        effect: 'Increases Animal Resource Gathering',
        bonus: 35,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 5,
        effect: 'Increases Animal Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 6,
        effect: 'Increases Animal Resource Gathering',
        bonus: 45,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 7,
        effect: 'Increases Animal Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'hunt',
        tier: 8,
        effect: 'Increases Animal Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //normal - luck
      {
        category: 'normal',
        type: 'luck',
        tier: 1,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 2,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 25,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 3,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 4,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 35,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 5,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 6,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 45,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 7,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'normal',
        type: 'luck',
        tier: 8,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 

      
      //legendary - speed
      {
        category: 'legendary',
        type: 'speed',
        tier: 1,
        effect: 'Reduces Mission Time',
        bonus: 12,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 2,
        effect: 'Reduces Mission Time',
        bonus: 15,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 3,
        effect: 'Reduces Mission Time',
        bonus: 18,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 4,
        effect: 'Reduces Mission Time',
        bonus: 21,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 5,
        effect: 'Reduces Mission Time',
        bonus: 24,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 6,
        effect: 'Reduces Mission Time',
        bonus: 27,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 7,
        effect: 'Reduces Mission Time',
        bonus: 30,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'speed',
        tier: 8,
        effect: 'Reduces Mission Time',
        bonus: 35,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - prosperity
      {
        category: 'legendary',
        type: 'prosperity',
        tier: 1,
        effect: 'Increase Gold gain',
        bonus: 20,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 2,
        effect: 'Increase Gold gain',
        bonus: 25,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 3,
        effect: 'Increase Gold gain',
        bonus: 30,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 4,
        effect: 'Increase Gold gain',
        bonus: 35,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 5,
        effect: 'Increase Gold gain',
        bonus: 40,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 6,
        effect: 'Increase Gold gain',
        bonus: 45,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 7,
        effect: 'Increase Gold gain',
        bonus: 50,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'prosperity',
        tier: 8,
        effect: 'Increase Gold gain',
        bonus: 60,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - aptitude
      {
        category: 'legendary',
        type: 'aptitude',
        tier: 1,
        effect: 'Increase Experience gain',
        bonus: 20,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 2,
        effect: 'Increase Experience gain',
        bonus: 25,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 3,
        effect: 'Increase Experience gain',
        bonus: 30,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 4,
        effect: 'Increase Experience gain',
        bonus: 35,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 5,
        effect: 'Increase Experience gain',
        bonus: 40,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 6,
        effect: 'Increase Experience gain',
        bonus: 45,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 7,
        effect: 'Increase Experience gain',
        bonus: 50,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'aptitude',
        tier: 8,
        effect: 'Increase Experience gain',
        bonus: 60,
        max_bonus: 100,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - smash
      {
        category: 'legendary',
        type: 'smash',
        tier: 1,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 2,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 3,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 4,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 5,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 6,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 70,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 7,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 80,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'smash',
        tier: 8,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 100,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - harvest
      {
        category: 'legendary',
        type: 'harvest',
        tier: 1,
        effect: 'Increases Plant Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 2,
        effect: 'Increases Plant Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 3,
        effect: 'Increases Plant Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 4,
        effect: 'Increases Plant Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 5,
        effect: 'Increases Plant Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 6,
        effect: 'Increases Plant Resource Gathering',
        bonus: 70,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 7,
        effect: 'Increases Plant Resource Gathering',
        bonus: 80,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'harvest',
        tier: 8,
        effect: 'Increases Plant Resource Gathering',
        bonus: 100,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - hunt
      {
        category: 'legendary',
        type: 'hunt',
        tier: 1,
        effect: 'Increases Animal Resource Gathering',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 2,
        effect: 'Increases Animal Resource Gathering',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 3,
        effect: 'Increases Animal Resource Gathering',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 4,
        effect: 'Increases Animal Resource Gathering',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 5,
        effect: 'Increases Animal Resource Gathering',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 6,
        effect: 'Increases Animal Resource Gathering',
        bonus: 70,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 7,
        effect: 'Increases Animal Resource Gathering',
        bonus: 80,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'hunt',
        tier: 8,
        effect: 'Increases Animal Resource Gathering',
        bonus: 100,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, 


      //legendary - luck
      {
        category: 'legendary',
        type: 'luck',
        tier: 1,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 20,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 2,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 30,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 3,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 40,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 4,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 50,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 5,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 60,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 6,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 70,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 7,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 80,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now
      }, {
        category: 'legendary',
        type: 'luck',
        tier: 8,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 100,
        max_bonus: 170,
        createdAt: now,
        updatedAt: now,
      }      
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Effects', null, {});
  }
};

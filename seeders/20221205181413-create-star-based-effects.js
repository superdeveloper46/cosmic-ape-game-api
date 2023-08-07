'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()

    return queryInterface.bulkInsert('Effects', [
      //star 1 speed
      {
        star: 1,
        type: 'speed',
        tier: 1,
        effect: 'Reduces Mission Time',
        bonus: 5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 2,
        effect: 'Reduces Mission Time',
        bonus: 7.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 3,
        effect: 'Reduces Mission Time',
        bonus: 10,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 4,
        effect: 'Reduces Mission Time',
        bonus: 12.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 5,
        effect: 'Reduces Mission Time',
        bonus: 15,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 6,
        effect: 'Reduces Mission Time',
        bonus: 17.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 7,
        effect: 'Reduces Mission Time',
        bonus: 20,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'speed',
        tier: 8,
        effect: 'Reduces Mission Time',
        bonus: 25,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 prosperity
      {
        star: 1,
        type: 'prosperity',
        tier: 1,
        effect: 'Increase Gold gain',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 2,
        effect: 'Increase Gold gain',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 3,
        effect: 'Increase Gold gain',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 4,
        effect: 'Increase Gold gain',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 5,
        effect: 'Increase Gold gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 6,
        effect: 'Increase Gold gain',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 7,
        effect: 'Increase Gold gain',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'prosperity',
        tier: 8,
        effect: 'Increase Gold gain',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 aptitude
      {
        star: 1,
        type: 'aptitude',
        tier: 1,
        effect: 'Increase Experience gain',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 2,
        effect: 'Increase Experience gain',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 3,
        effect: 'Increase Experience gain',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 4,
        effect: 'Increase Experience gain',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 5,
        effect: 'Increase Experience gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 6,
        effect: 'Increase Experience gain',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 7,
        effect: 'Increase Experience gain',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'aptitude',
        tier: 8,
        effect: 'Increase Experience gain',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 smash
      {
        star: 1,
        type: 'smash',
        tier: 1,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 2,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 3,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 4,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 5,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 6,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 7,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'smash',
        tier: 8,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 harvest
      {
        star: 1,
        type: 'harvest',
        tier: 1,
        effect: 'Increases Plant Resource Gathering',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 2,
        effect: 'Increases Plant Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 3,
        effect: 'Increases Plant Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 4,
        effect: 'Increases Plant Resource Gathering',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 5,
        effect: 'Increases Plant Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 6,
        effect: 'Increases Plant Resource Gathering',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 7,
        effect: 'Increases Plant Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'harvest',
        tier: 8,
        effect: 'Increases Plant Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 hunt
      {
        star: 1,
        type: 'hunt',
        tier: 1,
        effect: 'Increases Animal Resource Gathering',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 2,
        effect: 'Increases Animal Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 3,
        effect: 'Increases Animal Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 4,
        effect: 'Increases Animal Resource Gathering',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 5,
        effect: 'Increases Animal Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 6,
        effect: 'Increases Animal Resource Gathering',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 7,
        effect: 'Increases Animal Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'hunt',
        tier: 8,
        effect: 'Increases Animal Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 1 luck
      {
        star: 1,
        type: 'luck',
        tier: 1,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 20,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 2,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 3,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 4,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 35,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 5,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 6,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 45,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 7,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 1,
        type: 'luck',
        tier: 8,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 
      
      //star 2 speed
      {
        star: 2,
        type: 'speed',
        tier: 1,
        effect: 'Reduces Mission Time',
        bonus: 7,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 2,
        effect: 'Reduces Mission Time',
        bonus: 10,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 3,
        effect: 'Reduces Mission Time',
        bonus: 13,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 4,
        effect: 'Reduces Mission Time',
        bonus: 16,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 5,
        effect: 'Reduces Mission Time',
        bonus: 19,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 6,
        effect: 'Reduces Mission Time',
        bonus: 22,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 7,
        effect: 'Reduces Mission Time',
        bonus: 25,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'speed',
        tier: 8,
        effect: 'Reduces Mission Time',
        bonus: 30,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 prosperity
      {
        star: 2,
        type: 'prosperity',
        tier: 1,
        effect: 'Increase Gold gain',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 2,
        effect: 'Increase Gold gain',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 3,
        effect: 'Increase Gold gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 4,
        effect: 'Increase Gold gain',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 5,
        effect: 'Increase Gold gain',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 6,
        effect: 'Increase Gold gain',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 7,
        effect: 'Increase Gold gain',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'prosperity',
        tier: 8,
        effect: 'Increase Gold gain',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 aptitude
      {
        star: 2,
        type: 'aptitude',
        tier: 1,
        effect: 'Increase Experience gain',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 2,
        effect: 'Increase Experience gain',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 3,
        effect: 'Increase Experience gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 4,
        effect: 'Increase Experience gain',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 5,
        effect: 'Increase Experience gain',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 6,
        effect: 'Increase Experience gain',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 7,
        effect: 'Increase Experience gain',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'aptitude',
        tier: 8,
        effect: 'Increase Experience gain',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 smash
      {
        star: 2,
        type: 'smash',
        tier: 1,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 2,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 3,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 4,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 5,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 6,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 7,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'smash',
        tier: 8,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 harvest
      {
        star: 2,
        type: 'harvest',
        tier: 1,
        effect: 'Increases Plant Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 2,
        effect: 'Increases Plant Resource Gathering',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 3,
        effect: 'Increases Plant Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 4,
        effect: 'Increases Plant Resource Gathering',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 5,
        effect: 'Increases Plant Resource Gathering',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 6,
        effect: 'Increases Plant Resource Gathering',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 7,
        effect: 'Increases Plant Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'harvest',
        tier: 8,
        effect: 'Increases Plant Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 hunt
      {
        star: 2,
        type: 'hunt',
        tier: 1,
        effect: 'Increases Animal Resource Gathering',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 2,
        effect: 'Increases Animal Resource Gathering',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 3,
        effect: 'Increases Animal Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 4,
        effect: 'Increases Animal Resource Gathering',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 5,
        effect: 'Increases Animal Resource Gathering',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 6,
        effect: 'Increases Animal Resource Gathering',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 7,
        effect: 'Increases Animal Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'hunt',
        tier: 8,
        effect: 'Increases Animal Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 luck
      {
        star: 2,
        type: 'luck',
        tier: 1,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 25,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 2,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 32.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 3,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 4,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 47.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 5,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 55,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 6,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 62.5,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 7,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 2,
        type: 'luck',
        tier: 8,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 
      
      //star 3 speed
      {
        star: 3,
        type: 'speed',
        tier: 1,
        effect: 'Reduces Mission Time',
        bonus: 9,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 2,
        effect: 'Reduces Mission Time',
        bonus: 12.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 3,
        effect: 'Reduces Mission Time',
        bonus: 16,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 4,
        effect: 'Reduces Mission Time',
        bonus: 19.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 5,
        effect: 'Reduces Mission Time',
        bonus: 23,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 6,
        effect: 'Reduces Mission Time',
        bonus: 26.5,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 7,
        effect: 'Reduces Mission Time',
        bonus: 30,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'speed',
        tier: 8,
        effect: 'Reduces Mission Time',
        bonus: 35,
        max_bonus: 60,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 prosperity
      {
        star: 3,
        type: 'prosperity',
        tier: 1,
        effect: 'Increase Gold gain',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 2,
        effect: 'Increase Gold gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 3,
        effect: 'Increase Gold gain',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 4,
        effect: 'Increase Gold gain',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 5,
        effect: 'Increase Gold gain',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 6,
        effect: 'Increase Gold gain',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 7,
        effect: 'Increase Gold gain',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'prosperity',
        tier: 8,
        effect: 'Increase Gold gain',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 aptitude
      {
        star: 3,
        type: 'aptitude',
        tier: 1,
        effect: 'Increase Experience gain',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 2,
        effect: 'Increase Experience gain',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 3,
        effect: 'Increase Experience gain',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 4,
        effect: 'Increase Experience gain',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 5,
        effect: 'Increase Experience gain',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 6,
        effect: 'Increase Experience gain',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 7,
        effect: 'Increase Experience gain',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'aptitude',
        tier: 8,
        effect: 'Increase Experience gain',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 smash
      {
        star: 3,
        type: 'smash',
        tier: 1,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 2,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 3,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 4,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 5,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 6,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 7,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'smash',
        tier: 8,
        effect: 'Increases Mineral Resource Gathering',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 harvest
      {
        star: 3,
        type: 'harvest',
        tier: 1,
        effect: 'Increases Plant Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 2,
        effect: 'Increases Plant Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 3,
        effect: 'Increases Plant Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 4,
        effect: 'Increases Plant Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 5,
        effect: 'Increases Plant Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 6,
        effect: 'Increases Plant Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 7,
        effect: 'Increases Plant Resource Gathering',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'harvest',
        tier: 8,
        effect: 'Increases Plant Resource Gathering',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 hunt
      {
        star: 3,
        type: 'hunt',
        tier: 1,
        effect: 'Increases Animal Resource Gathering',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 2,
        effect: 'Increases Animal Resource Gathering',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 3,
        effect: 'Increases Animal Resource Gathering',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 4,
        effect: 'Increases Animal Resource Gathering',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 5,
        effect: 'Increases Animal Resource Gathering',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 6,
        effect: 'Increases Animal Resource Gathering',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 7,
        effect: 'Increases Animal Resource Gathering',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'hunt',
        tier: 8,
        effect: 'Increases Animal Resource Gathering',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 


      //star 2 luck
      {
        star: 3,
        type: 'luck',
        tier: 1,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 30,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 2,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 40,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 3,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 50,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 4,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 60,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 5,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 70,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 6,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 80,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 7,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 90,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, {
        star: 3,
        type: 'luck',
        tier: 8,
        effect: 'Increases Expedition Mission Luck Rate',
        bonus: 100,
        max_bonus: null,
        createdAt: now,
        updatedAt: now
      }, 
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Effects', null, {});
  }
};

'use strict';

const { Op } = require('sequelize');
const { Levels } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const exps = [
      0,
      150,
      350,
      600,
      900,
      1300,
      1800,
      2400,
      3150,
      4050,
      5100,
      6200,
      7400,
      8700,
      10100,
      11650,
      13350,
      15200,
      17200,
      19400,
      21800,
      24400,
      27200,
      30200,
      33450,
      36950,
      40645,
      44303,
      48290,
      52636,
      57374,
      62537,
      68166,
      74301,
      80988,
      88277,
      96221,
      104881,
      114321,
      124610,
      135824,
      148049,
      161373,
      175897,
      191727,
      208983,
      227791,
      246015,
      265696,
      286951,
      309908,
      334700,
      361476,
      390394,
      421626,
      455356,
      491784,
      531127,
      573617,
      619507,
      669067,
      722592,
      773174,
      827296,
      885207,
      947171,
      1013473,
      1084416,
      1160326,
      1241548,
      1328457,
      1421449,
      1506736,
      1597140,
      1692968,
      1794546,
      1902219,
      1997330,
      2097196,
      2202056,
      2312159
    ]
    const staminas = [
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      91,
      92,
      93,
      94,
      95,
      96,
      97,
      98,
      99,
      100,
    ]
    const levels = await Levels.findAll()

    const query = levels.map(level => ({
      id: level.id,
      experience: exps[level.level] || 0,
      stamina: staminas[level.level] || 0,
      stamina_refresh_per_hour: 5,
    }))

    await Levels.bulkCreate(
      query,
      {
        updateOnDuplicate: ["experience", "stamina", "stamina_refresh_per_hour"],
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Levels', null, {});
  }
};
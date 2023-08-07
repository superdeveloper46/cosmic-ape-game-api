'use strict';
const { Maps } = require('../models/index');

module.exports = {
  async up (queryInterface, Sequelize) {
    const lostCityOfLasol = await Maps.update(
      {
        name: 'Lost City of Lasol'
      },
      {
        where: {
          name: 'THE LOST CITY OF LASOL'
        }
      }
    )

    const crystalForest = await Maps.update(
      {
        name: 'Crystal Forest'
      },
      {
        where: {
          name: 'CRYSTAL FOREST'
        }
      }
    )

    const azulhenge = await Maps.update(
      {
        name: 'Azulhenge'
      },
      {
        where: {
          name: 'AZULHENGE'
        }
      }
    )

    const prismValley = await Maps.update(
      {
        name: 'Prism Valley'
      },
      {
        where: {
          name: 'PRISM VALLEY'
        }
      }
    )

    const crusaderVillage = await Maps.update(
      {
        name: 'Crusader Village'
      },
      {
        where: {
          name: 'COSMIC VILLAGE'
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    const lostCityOfLasol = await Maps.update(
      {
        name: 'THE LOST CITY OF LASOL'
      },
      {
        where: {
          name: 'Lost City of Lasol'
        }
      }
    )

    const crystalForest = await Maps.update(
      {
        name: 'CRYSTAL FOREST'
      },
      {
        where: {
          name: 'Crystal Forest'
        }
      }
    )

    const azulhenge = await Maps.update(
      {
        name: 'AZULHENGE'
      },
      {
        where: {
          name: 'Azulhenge'
        }
      }
    )

    const prismValley = await Maps.update(
      {
        name: 'PRISM VALLEY'
      },
      {
        where: {
          name: 'Prism Valley'
        }
      }
    )

    const crusaderVillage = await Maps.update(
      {
        name: 'COSMIC VILLAGE'
      },
      {
        where: {
          name: 'Crusader Village'
        }
      }
    )
  }
};

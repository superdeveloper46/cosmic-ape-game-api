const Redis = require('ioredis');
const fetchMissionEfficiencyDurability = require('../info/fetch-mission-efficiency-durability');

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
});

const getReducedInventoryDurabilityByMission = async ({
  inventory,
  mission,
}) => {
  return 1
}

module.exports = getReducedInventoryDurabilityByMission
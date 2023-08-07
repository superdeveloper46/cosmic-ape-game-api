const Redis = require('ioredis');
const fetchMissionEfficiencyDurability = require('../info/fetch-mission-efficiency-durability');
const powerEffects = require('../../assets/info/power-effects.json');

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
});

const getReducedInventoryEfficiencyByMission = async ({
  inventory,
  mission,
  ape,
}) => {
  const missionEfficiencyEfficiencies = await fetchMissionEfficiencyDurability({ redis })
  const reducingEfficiencies = missionEfficiencyEfficiencies.find(effect => effect.tier === mission.tier)
  const reducingEfficiency = !!reducingEfficiencies ? reducingEfficiencies[`star${inventory.Item.star}`] : 0
  const powerEffect = (powerEffects || []).find(pe => pe.slug === ape?.power)
  //getting mission duration bonus from power effect
  const efficiencyPowerEffect = (powerEffect?.effects || []).find(effect => effect.type === 'efficiency')

  return Math.max((inventory.efficiency || 0) - reducingEfficiency * mission.time * (100.0 - efficiencyPowerEffect?.amount || 0) / 100, 0)
}

module.exports = getReducedInventoryEfficiencyByMission
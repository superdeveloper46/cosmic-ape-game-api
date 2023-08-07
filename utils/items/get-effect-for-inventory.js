const Redis = require('ioredis');
const fetchEfficiencyEffects = require('../info/fetch-efficiency-effect');

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
});

const getEffectForInventory = async inventory => {

  const efficiencyPercent = Math.max(inventory.efficiency / inventory.Item.efficiency, inventory.Effect.minimum_efficiency)
  const effect = efficiencyPercent * inventory.Effect.bonus
  if (!effect) return 0
  return effect
}

module.exports = getEffectForInventory
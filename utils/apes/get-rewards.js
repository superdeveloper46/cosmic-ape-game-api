const { Resource, Resource_Inventory, Utility, Utility_Inventory } = require('../../models/index');
const { Op } = require("sequelize");
const { LOOTBOX_ALL, LOOTBOX_BRONZE } = require('../../static/lootbox-types');
const getValueBetweenLowestAndHighest = require('../statics/get-value-between-lowest-and-highest');
const getResourcesByCategory = require('../resource/get-resources-by-category');
const getRandomItemFromArray = require('../statics/get-random-item-from-array');

const getRewards = async ({
  ape,
  missionEffect,
  transaction
}) => {
  if (!ape || !missionEffect) return 'No Ape or no mission effect'

  console.log('Rewarding Resources && Utilities')

  const availableLootboxes = LOOTBOX_ALL.map(
    lootbox => (missionEffect.Mission_Resource_Rewards || []).filter(reward => reward.name === lootbox)
  )
  const rewardingLootboxes = availableLootboxes.filter(
    lootbox => {
      if (lootbox.length === 0) return false

      const luck = (lootbox[0].luck || 0) * (100.0 + missionEffect.luck_bonus) / 100
      const isRewarding = (Math.random() * 100) <= luck
      return isRewarding
    }
  )
  let rewardings = rewardingLootboxes.flat()
  if (rewardings.length === 0) {
    rewardings = [(missionEffect.Mission_Resource_Rewards || []).find(reward => reward.name === LOOTBOX_BRONZE)]
  }
  console.log('Rewarding Resources ....', rewardings)
  try {
    const rewards = await Promise.all(
      rewardings.map(
        async reward => {
          const resource = !!reward.category 
            ? getRandomItemFromArray(await getResourcesByCategory({ category: reward.category, transaction }))
            : reward.Resource
          if (!resource) return null

          let amount = Math.round(getValueBetweenLowestAndHighest(reward.lowest_amount, reward.highest_amount))
          const luck = (
            resource.type === 'Plant Resource'
            ? missionEffect.plant_bonus
            : resource.type === 'Mineral Resource'
            ? missionEffect.mineral_bonus
            : resource.type === 'Animal Resource'
            ? missionEffect.animal_bonus
            : 0
          )
          amount = Math.floor(amount * (100.0 + luck) / 100)
          
          let resourceInventory
          if (!!resource.stack) {
            resourceInventory = await Resource_Inventory.findOne({
              where: {
                ape_id: ape.id,
                resource_id: resource.id,
              }
            }, { transaction })
          }
          if (!resourceInventory) {
            resourceInventory = await Resource_Inventory.create({
              ape_id: ape.id,
              resource_id: resource.id,
              resource_quantity: 0
            }, { transaction })
          }

          resourceInventory.set({
            resource_quantity: resourceInventory.resource_quantity + amount
          })
          resourceInventory = await resourceInventory.save({ transaction })

          return {
            ...resourceInventory.dataValues,
            Resource: resource,
            amount,
          }
        }
      )
    )
    console.log(`Resources && Utilities rewarded to ape(${ape.id})`, rewards)

    return rewards
  } catch(err){
    console.log(err)
    throw new Error(`Failed to reward resources && utilities for ${ape.id}`);
  }
}

module.exports = getRewards;
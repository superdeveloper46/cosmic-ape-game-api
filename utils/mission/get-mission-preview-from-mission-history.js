const { Item_Equipped, Inventory } = require('../../models/index');
var moment = require('moment');
const getLevel = require('../levels/get-level');
const getTotalEffectBonusesFromEffects = require('../statics/get-total-effect-bonus-from-effects');
const powerEffects = require('../../assets/info/power-effects.json');

const getMissionPreviewFromMissionHistory = async ({
  ape,
  missionHistory,
  transaction,
  redis,
}) => {
  if (!missionHistory) {
    return {
      result: false,
      status: 404,
      msg: "No mission history"
    }
  }
  try {
    const itemEquippeds = missionHistory.equippedItems || await missionHistory.getEquippedItems({ transaction })
    const mission = missionHistory.Mission || await missionHistory.getMission({ transaction })
    const powerEffect = (powerEffects || []).find(pe => pe.slug === ape?.power)

    console.log(itemEquippeds)
    const effects = (itemEquippeds || []).map(
      item_equip => ({
        ...(item_equip.Inventory?.Effect?.dataValues || {}),
        bonus: (item_equip.Inventory?.Effect?.bonus || 0) * (item_equip.effect)
      })
    ).filter(effect => !!effect)
    const effectBonuses = getTotalEffectBonusesFromEffects(effects)

    return {
      ...mission.dataValues,
      time_bonus: (effectBonuses['speed'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'duration')?.amount || 0),
      gold_bonus: (effectBonuses['prosperity'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'gold')?.amount || 0),
      exp_bonus: (effectBonuses['aptitude'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'experience')?.amount || 0),
      luck_bonus: (effectBonuses['luck'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'luck')?.amount || 0),
      mineral_bonus: (effectBonuses['smash'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'mineral')?.amount || 0),
      plant_bonus: (effectBonuses['harvest'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'plant')?.amount || 0),
      animal_bonus: (effectBonuses['hunt'] || 0) + ((powerEffect?.effects || []).find(effect => effect.type === 'animal')?.amount || 0),
      remainingMinutes: moment(missionHistory['started_at']).add(missionHistory['duration'] || 0, 'hours').diff(moment(), 'minutes') + 1
    }

  } catch(err){
    console.log(err)
    throw new Error(`Failed to get preview from mission history ${err.message}`)
  }

}

module.exports = getMissionPreviewFromMissionHistory;
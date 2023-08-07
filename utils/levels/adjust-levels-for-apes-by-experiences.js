const { 
  Apes,
} = require('../../models/index');
const getCurrenciesByCharacters = require("../currencies/get-currencies-by-characters")
const fetchLevels = require('../info/fetch-levels')

const adjustLevelsForApesByExperiences = async ({
  apes,
  redis,
  transaction,
}) => {
  console.log('Adjusting ape levels by experiences')

  const levels = await fetchLevels({
    redis,
  })
  const updatingApes = await Promise.all(apes.map(async ape => {
    console.log('adjusting level by experience: ', ape)
    const level = levels.find(level => level.level === ape.level)
    if (!level) return false

    const maxLevel = (await ape.getTier({ transaction:transaction }))?.max_level || 0
    console.log('max_level: ', maxLevel)
    if (ape.level > maxLevel) return false

    const xp = ape.experience
    console.log('Current Experience:', xp)

    const tierLevels = levels.filter(level => level.level <= maxLevel && level.experience <= xp)

    let newLevel = 0
    if (tierLevels.length > 0) {
      const lastLevel = tierLevels[tierLevels.length - 1]
      newLevel = lastLevel.level
    }
    if (ape.level === newLevel) return false

    return { id: ape.id, level: newLevel }
  }))

  const updatedApes = await Apes.bulkCreate(
    updatingApes.filter(ape => !!ape),
    {
      updateOnDuplicate: ['level'],
      transaction:transaction
    }
  )
  console.log(`Adjusted ${updatedApes.length} apes level by experience`, updatedApes.map(ape => ape.id))

  return updatedApes
}

module.exports = adjustLevelsForApesByExperiences
const axios = require('axios')
const csvtojson = require('csvtojson')
const missionFile = require('../../assets/info/mission-efficiency-durability.csv')

const fetchMissionEfficiencyDurability = async ({
  redis
} = {}) => {
  try {
    console.log(`Getting All Mission Efficiency and Durability`)

    if (!!redis) {
      let missionCosts = await redis.get(`Mission_Efficiency_Durability`)
      if (!!missionCosts) {
        const missionsCostJson = JSON.parse(missionCosts)
        console.log(`Got All Mission Efficiency and Durability From Cache`)
        return missionsCostJson
      }
    }

    // const missionsCSV = await axios.get(`${process.env.STATIC_CSVS_ENDPOINT}/mission-efficiency-durability.csv`)
    
    // const missionsCostJson = await csvtojson().fromString(missionsCSV.data)

    const missionsCostJson = await csvtojson().fromString(missionFile)

    console.log(`Got All Mission Efficiency and Durability From CSV - ${missionsCostJson}`)

    const missionCosts = missionsCostJson.map(row => ({
      tier: Number(row['Mission Tier']),
      star1: Number(row['Star 1']),
      star2: Number(row['Star 2']),
      star3: Number(row['Star 3']),
    }))

    console.log(`Parsed All Mission Efficiency and Durability from CSV - ${missionCosts}`)

    if (!!redis) {
      console.log(`Setting All Mission Efficiency and Durability to cache - ${missionCosts}`)
      redis.set(`Mission_Efficiency_Durability`, JSON.stringify(missionCosts), "EX", 600)
    }

    return missionCosts
  } catch (err) {
    console.log(err)

    console.log('Retrieving empty mission efficiency and durability info from error')
    return []
  }
}

module.exports = fetchMissionEfficiencyDurability
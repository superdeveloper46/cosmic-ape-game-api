
const csvtojson = require('csvtojson')
const accountLevelsCsv = require('../../assets/info/account_levels.csv')


const fetchAccountLevels = async ({
  redis
} = {}) => {
  try {


    if (!!redis) {
      let account_levels = await redis.get(`Account_Levels`)
      if (!!account_levels) {
        const account_levels_json = JSON.parse(account_levels)
        console.log(`Got All  Account Levels From Cache`)
        return account_levels_json
      }
    }

    // const levelsCsv = await axios.get(`${process.env.STATIC_CSVS_ENDPOINT}/levels.csv`)
    
    // const levelsJson = await csvtojson().fromString(levelsCsv.data)

    const accountLevelsJson = await csvtojson().fromString(accountLevelsCsv)

    console.log(`Got All Levels From CSV `)

    const account_levels = accountLevelsJson.map(level => ({
      level: Number(level['level']),
      experience_low: Number(level['experience_low']),
      experience_high: Number(level['experience_high']),
      luck: Number(level['luck']),
    }))

    console.log(`Parsed All Account Levels from CSV`)

    if (!!redis) {
      console.log(`Setting all levels to cache `)
      redis.set(`Account_Levels`, JSON.stringify(account_levels))
    }

    return account_levels
  } catch (err) {
    console.log(err)

    console.log('Retrieving empty level info from error')
    return []
  }
}

module.exports = fetchAccountLevels
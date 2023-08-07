const axios = require('axios')
const csvtojson = require('csvtojson')
const powersCsvFile = require('../../assets/info/powers.csv')

const fetchPowers = async ({
  redis
} = {}) => {
  try {
    console.log(`Getting All Powers`)

    if (!!redis) {
      let powers = await redis.get(`Powers`)
      if (!!powers) {
        const powersJson = JSON.parse(powers)
        console.log(`Got All Powers From Cache`)
        return powersJson
      }
    }

    // const powersCsv = await axios.get(`${process.env.STATIC_CSVS_ENDPOINT}/powers.csv`)
    
    // const powersJson = await csvtojson().fromString(powersCsv.data)

    const powersJson = await csvtojson().fromString(powersCsvFile)

    console.log(`Got All Powers From CSV `)

    const powers = powersJson.map(power => ({
      power: power['power'],
      slug: power['slug'],
      icon: power['icon'],
      description: power['description'],
    }))

    console.log(`Parsed All Powers from CSV`, powers)

    if (!!redis) {
      console.log(`Setting all powers to cache `)
      redis.set(`Powers`, JSON.stringify(powers))
    }

    return powers
  } catch (err) {
    console.log(err)

    console.log('Retrieving empty power info from error')
    return []
  }
}

module.exports = fetchPowers
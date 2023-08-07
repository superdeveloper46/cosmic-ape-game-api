const {
  Item_Detail,
  sequelize
} = require('../../models/index');

const fetchItemImages = async ({
  redis
} = {}) => {
  try {
    console.log(`Getting All Item Images`)

    if (!!redis) {
      let itemImages = await redis.get(`Item_Images`)
      if (!!itemImages  && itemImages.length>0) {
        const itemImagesJson = JSON.parse(itemImages)
        console.log(`Got All Item Images From Cache`)
        return itemImagesJson
      }
    }

    // const itemImagesCsv = await axios.get(`${process.env.STATIC_CSVS_ENDPOINT}/item-images.csv`)
    
    // const itemImagesJson = await csvtojson().fromString(itemImagesCsv.data)


    const itemImages =  JSON.parse(JSON.stringify(await Item_Detail.findAll()));


    console.log(`Parsed All Item Images from DB - ${itemImages}`)

    if (!!redis) {

      redis.set(`Item_Images`, JSON.stringify(itemImages))
    }

    return itemImages
  } catch (err) {
    console.log(err)

    console.log('Retrieving empty item images info from error')
    return []
  }
}

module.exports = fetchItemImages
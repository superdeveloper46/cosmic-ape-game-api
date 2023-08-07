const { 
  Resource
} = require('../../models/index');

const Redis = require("ioredis");

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
});

const getResourcesByCategory = async ({
  category,
  transaction
}) => {
  let resources = await redis.get(`Resource_Category_${category}`)

  if (!!resources) {
    resources = JSON.parse(resources)
  } else {
    resources = await Resource.findAll({
      where:{
        type:category,
        is_active:true,
      },
      transaction:transaction
    })

    redis.set(`Resource_Category_${category}`, JSON.stringify(resources), "EX", 600)
  }

  return resources
}

module.exports = getResourcesByCategory;
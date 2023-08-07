
const { Product,Resource,Currency} = require('../../models/index')
const Redis = require("ioredis");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
});

module.exports = {
    async getProducts(req, res) {
        try {
            let products = await Product.findAll({
                include:[
                {
                    model:Resource,
                },
                {
                    model:Currency,
                },
                {
                    model:Currency,
                    as: 'purchase_currency',
                }]
            });
            res.status(200).json(products)
        }catch(err){
            console.log(err)
            res.status(400).json(err.message)
        }
    }



}
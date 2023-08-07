const {Product,Resource,Currency,sequelize} = require("../../models");


module.exports = {
    async findProductById(product_id, transaction){
        let product  = await Product.findOne({
            where :{
                id:product_id,
                is_active:true
            },
            include:[
                {
                    model:Resource
                },
                {
                    model:Currency
                },
                {
                    model:Currency,
                    as : "purchase_currency"
                }
            ],
            transaction:transaction
        });

        return product
    }
}
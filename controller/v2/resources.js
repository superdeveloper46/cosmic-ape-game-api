
const { Resource,Resource_Inventory,sequelize } = require('../../models/index');
const Redis = require("ioredis");
const redis = new Redis({
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host

});

module.exports = {
    async resources(req, res) {
        let searchTerm= "resources";
        let resources

        try {
            console.log('Getting resources from cache')
            resources = await redis.get(searchTerm)

            if (!!resources) {

                return res.json(JSON.parse(resources));
            }
        } catch (err) {
            console.log(`Failed to get resources from cache - ${err}`)
        }

        try {
            console.log('Getting resources from DB')

            resources = await Resource.findAll({
                where: {
                    is_active: true,
                }
            });

            console.log(`Got resources from DB && set to Cache `)
            redis.set(searchTerm, JSON.stringify(resources));

            return res.json(resources)
        } catch (err) {
            console.log(`Failed to get resources ${err}`)
            
            return res.status(500).json({
                msg: "Something went wrong."
            })
        }

    },

    async account_resource_summary(req,res) {
        const {wallet} = req.query

        try {
            const result = await sequelize.query(`
                        SELECT r.id, r.name,r.type,r.icon, SUM(ri.resource_quantity) AS quantity
                        from Resource_Inventories ri
                                 inner join Apes a on ri.ape_id = a.id
                                 left join Resources r on r.id = ri.resource_id
                        where a.owner = :owner
                        GROUP BY r.id, r.name,r.type,r.icon`,
                {replacements: {owner: wallet}, type: sequelize.QueryTypes.SELECT})
            res.json(result)
        }catch(err){
            console.log(err)
            res.status(400).json("Something went wrong")
        }





    }
}
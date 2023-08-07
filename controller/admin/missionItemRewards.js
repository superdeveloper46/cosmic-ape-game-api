
const { Mission_Item_Reward, Missions, Items } = require('../../models/index');

module.exports = {
    async gets(req, res) {
        const items = await Mission_Item_Reward.findAll(
            {
                include: [
                    {
                        model: Missions,
                        required: true,
                        attributes: ['name']
                    },
                    {
                        model: Items,
                        attributes: ['name'],
                        required: true
                    },
                ]
            },
        );
        console.log(items)
        res.json(items);
    },

    async get(req, res) {
        const existingItem = await Mission_Item_Reward.findOne({
            where: {
              id: req.params.id
            }
          }
        );
        res.json(existingItem);
    },

    async create(req, res) {

        const existingItem = await Mission_Item_Reward.findOne({
            where: {
              name: req.body.name
            }
          }
        );

        if(!existingItem){
            let item = await Mission_Item_Reward.create(req.body);
            res.status(200).json({
                success: true,
                id: item.id
            });
        }else{
            return res.status(200).json({
                success: false,
                msg: "Item name already exist."
            });
        }

        
    },

    async update(req, res) {
        await Mission_Item_Reward.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            success: true,
        });
    },
}
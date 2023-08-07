
const { Items } = require('../../models/index');

module.exports = {
    async gets(req, res) {
        const items = await Items.findAll();
        res.json(items);
    },

    async get(req, res) {
        const existingItem = await Items.findOne({
            where: {
              id: req.params.id
            }
          }
        );
        res.json(existingItem);
    },

    async create(req, res) {

        const existingItem = await Items.findOne({
            where: {
              name: req.body.name
            }
          }
        );

        if(!existingItem){
            let item = await Items.create(req.body);
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
        await Items.update(req.body, 
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            success: true,
        });
    },

    async delete(req, res) {
        try{
            await Items.destroy({
                where: {
                  id: req.body.id
                }
              }
            );
            res.status(200).json({
                success: true,
            });
        }
        catch(err){
            res.status(200).json({
                success: false,
                msg: `Deleteing failed`
            })
        }
    },

    async deletes(req, res) {
        try{
            let ids = req.body.ids;
            for(var i=0; i<ids.length; i++){
                await Items.destroy({
                    where: {
                      id: ids[i]
                    }
                  }
                );
            }
            
            res.status(200).json({
                success: true,
            });
        }
        catch(err){
            res.status(200).json({
                success: false,
                msg: `Deleteing failed`
            })
        }
    },
}
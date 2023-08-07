
const { Maps } = require('../../models/index');

module.exports = {
    async gets(req, res) {
        const maps = await Maps.findAll();
        res.json(maps);
    },

    async get(req, res) {
        const existingMap = await Maps.findOne({
            where: {
              id: req.params.id
            }
          }
        );
        res.json(existingMap);
    },

    async create(req, res) {

        const existingMap = await Maps.findOne({
            where: {
              name: req.body.name
            }
          }
        );

        if(!existingMap){
            let map = await Maps.create(req.body);
            res.status(200).json({
                success: true,
                id: map.id
            });
        }else{
            return res.status(200).json({
                success: false,
                msg: "Map name already exist."
            });
        }

        
    },

    async update(req, res) {
        await Maps.update(req.body, 
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
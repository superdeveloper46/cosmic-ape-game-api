
const { Effect } = require('../../models/index');

module.exports = {
    async gets(req, res) {
        const effects = await Effect.findAll();
        res.json(effects);
    },

    async get(req, res) {
        const existingEffect = await Effect.findOne({
            where: {
              id: req.params.id
            }
          }
        );
        res.json(existingEffect);
    },

    async create(req, res) {

        const existingEffect = await Effect.findOne({
            where: {
                effect: req.body.effect
            }
          }
        );

        if(!existingEffect){
            let effect = await Effect.create(req.body);
            res.status(200).json({
                success: true,
                id: effect.id
            });
        }else{
            return res.status(200).json({
                success: false,
                msg: "Effect name already exist."
            });
        }

        
    },

    async update(req, res) {
        await Effect.update(req.body, 
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
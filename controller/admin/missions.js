
const { Missions, Maps } = require('../../models/index');

module.exports = {
    async gets(req, res) {
        const missions = await Missions.findAll(
            {
                include: {
                    model: Maps,
                    required: true,
                    attributes: ['name'],
                },
            },
        );
        res.json(missions);
    },

    async get(req, res) {
        const existingMission = await Missions.findOne({
            where: {
              id: req.params.id
            }
          }
        );
        res.json(existingMission);
    },

    async create(req, res) {

        const existingMission = await Missions.findOne({
            where: {
              name: req.body.name
            }
          }
        );

        if(!existingMission){
            let mission = await Missions.create(req.body);
            res.status(200).json({
                success: true,
                id: mission.id
            });
        }else{
            return res.status(200).json({
                success: false,
                msg: "Mission name already exist."
            });
        }

        
    },

    async update(req, res) {
        await Missions.update(req.body, 
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
            await Missions.destroy({
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
                await Missions.destroy({
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
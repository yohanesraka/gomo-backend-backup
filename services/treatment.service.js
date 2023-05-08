const {newError, errorHandler} = require('../utils/errorHandler');

class _treatment{
    constructor(db){
        this.db = db;
    }
    // Get Treatment
    getTreatment = async (req) => {
        try{
            if(!req.query.id_ternak) newError(400, 'id_ternak tidak boleh kosong', 'getTreatment Service');

            const ternak = await this.db.Ternak.findOne({
                attributes: ['id_ternak', 'id_fp'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where: {
                    id_ternak: req.query.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!ternak) newError(404, 'Data Ternak tidak ditemukan', 'getTreatment Service');

            if(ternak.dataValues.fase.dataValues.fase.toLowerCase().startsWith('adaptasi')){
                const list = await this.db.Treatment.findAll({
                    attributes: ['id_treatment', 'step', 'treatment'],
                    where: {
                        step: parseInt(ternak.dataValues.fase.dataValues.fase.split(' ')[1])
                    }
                });
                if(list.length <= 0) newError(404, 'Data Treatment tidak ditemukan', 'getTreatment Service');
                
                return {
                    code: 200,
                    data: {
                        total: list.length,
                        id_ternak: ternak.dataValues.id_ternak,
                        treatments: list
                    }
                };
            }
            else{
                newError(400, 'Ternak tidak di fase Adaptasi', 'getTreatment Service');
            }
        }catch (error){
            return errorHandler(error);
        }
    }   

    // Get All Treatment
    getAllTreatment = async (req) => {
        try{
            const list = await this.db.Treatment.findAll({
                attributes: ['id_treatment', 'step', 'treatment'],
                where: req.query
            });
            if(list.length <= 0) newError(404, 'Data Treatment tidak ditemukan', 'getAllTreatment Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    treatments: list
                }
            }
        }catch(error){
            return errorHandler(error);
        }
    }

    // Create new Treatment
    // createTreatment = async (req) => {
    //     try{
    //         const schema = joi.object({
    //             step: joi.number().required(),
    //             treatment: joi.string().required()
    //         });
    //         const {error, value} = schema.validate(req.body);
    //         if(error){
    //             return {
    //                 code: 400,
    //                 error: error.details[0].message
    //             }
    //         }

    //         const fase = await this.db.Fase.findAll({
    //             where: {
    //                 fase: {
    //                     [Op.like]: 'adaptasi%'
    //                 }
    //             }
    //         })
    //         if(fase.length <= 0){
    //             return {
    //                 code: 404,
    //                 error: 'Fase Pemeliharaan Ternak not found'
    //             }
    //         }

    //         const adaptasiByStep = fase.find(f => parseInt(f.dataValues.fase.charAt(f.dataValues.fase.length - 1)) === value.step);
    //         if(!adaptasiByStep){
    //             const adaptasi = await this.db.Fase.create({
    //                 fase: `adaptasi ${value.step}`,
    //             });
    //             if(!adaptasi){
    //                 return {
    //                     code: 500,
    //                     error: 'Failed to create fase'
    //                 }
    //             }
    //         }

    //         const treatment = await this.db.Treatment.create(value);
    //         if(!treatment){
    //             return{
    //                 code: 500,
    //                 error: 'Failed to create treatment'
    //             }
    //         }

    //         return {
    //             code: 200,
    //             data: treatment
    //         }
    //     }catch(error){
    //         log_error('createTreatment Service', error);
    //         return {
    //             code: 500,
    //             error
    //         }
    //     }
    // }
}

module.exports = (db) => new _treatment(db);
const joi = require('joi');
const date = require('date-and-time');
const {newError, errorHandler} = require('../utils/errorHandler');

class _produksiSusu{
    constructor(db){
        this.db = db;
    }

    //Get Data Produksi Susu
    getDataProduksi = async (req) =>{
        try{

            req.query.id_peternakan = req.dataAuth.id_peternakan;
            
            const list = await this.db.ProduksiSusu.findAll({
                attributes: ['produksi_pagi','produksi_sore','total_harian','tanggal_produksi'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak',]
                    },
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where : req.query
            });
            if(list.length <=0){
                newError(404, 'Data Produksi Susu tidak ditemukan','getProduksiSusu');
            }
            return{
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            }
        }catch (error){
            return errorHandler(error)
        }
    }

    //Create Data Produksi
    createDataProduksi = async (req) => {
        try{
            const schema = joi.object({
                id_produksi_susu: joi.number().required(),
                id_peternakan: joi.number().required(),
                id_ternak:  joi.number().required(),
                id_fp:  joi.number().required(),
                produksi_pagi: joi.string().required(),
                produksi_sore: joi.string().required(),
                produksi_sore: joi.string().required(),
                total_harian: joi.string().required(),
                tanggal_produksi: joi.string().required().isoDate()
            }); 
            const {error, value} = schema.validate(req.body);
            if(error){
                newError(400, error.details[0].message, 'createdProduksiSusu Service');
            }

            //Add id_user to params
            value.id_produksi_susu = req.dataAuth.id_produksi_susu

            //Create New ProduksiSusu
            const add = await this.db.ProduksiSusu.create({
                id_produksi_susu: value.id_produksi_susu,
                id_peternakan: value.id_peternakan,
                id_ternak: value.id_ternak,
                id_fp: value.id_fp,
                produksi_pagi: value.produksi_pagi,
                produksi_sore: value.produksi_sore,
                total_harian: value.total_harian,
                tanggal_produksi: value.tanggal_produksi
            });
            if (!add) newError(500, 'Gagal menambahkan Produksi Susu','createProduksiSusu Service')
            return{
                code: 200,
                data: {
                    message:"success"
                }
            }
    
        }catch (error){
            // console.log(error)
            return errorHandler(error)
            // throw error
        }
    }

    //Update Data Produksi
    updateDataProduksi = async (req)=>{
        try{
            const schema = joi.object({
                id_produksi_susu: joi.number().required(),
                id_peternakan: joi.number().required(),
                id_ternak:  joi.number().required(),
                id_fp:  joi.number().required(),
                produksi_pagi: joi.string().required(),
                produksi_sore: joi.string().required(),
                produksi_sore: joi.string().required(),
                total_harian: joi.string().required(),
                tanggal_produksi: joi.string().required().isoDate()
            });

            const {error, value} = schema.validate(req.body);
            if (error) newError(400, error.details[0].message,'updateDataProduksi');

            //Check if DataProduksi exist
            const dataProduksi = await this.db.ProduksiSusu.findOne({where: {
                id_ternak: value.id_ternak,
                id_peternakan: req.dataAuth.id_peternakan
            }});
            if(!dataProduksi) newError(404,'Data Produksi tidak ditemukan', 'updateDataProduksi Service');



            //Update Data Produksi
            const update = await this.db.ProduksiSusu.update({
                id_ternak: value.id_ternak || dataProduksi.dataValues.id_ternak,
                
            });
        }catch (error){
            return errorHandler(error)
        }
    } 
}

module.exports = (db) => new _produksiSusu(db);
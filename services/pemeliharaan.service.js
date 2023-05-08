// Helper databse yang dibuat
const DateExtension = require('@joi/date')
const Joi = require('joi');
const joi = Joi.extend(DateExtension);
const {newError, errorHandler} = require('../utils/errorHandler');

class _pemeliharaan{
    constructor(db){
        this.db = db;
    }
    // Get data Pemeliharaan per hari
    getPemeliharaan = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Get data Pemeliharaan
            const list = await this.db.Pemeliharaan.findAll({
                attributes: ['tanggal_pemeliharaan', 'jenis_pakan', 'jumlah_pakan', 'pembersihan_kandang', 'pembersihan_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: [
                            'id_kandang',
                            'kode_kandang'
                        ]
                    }
                ],
                where : req.query
            });
            
            const date = new Date();
            const result = list.filter((item) => {
                return item.dataValues.tanggal_pemeliharaan.getDate() === date.getDate() &&
                item.dataValues.tanggal_pemeliharaan.getMonth() === date.getMonth() &&
                item.dataValues.tanggal_pemeliharaan.getFullYear() === date.getFullYear()
            }); 
            
            if(result.length <= 0) newError(404, 'Data Pemeliharaan tidak ditemukan', 'getPemeliharaan Service');

            return {
                code: 200,
                data: {
                    total: result.length,
                    list: result
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Get all data Pemeliharaan
    getAllPemeliharaan = async (req) => {   
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Get data Pemeliharaan
            const list = await this.db.Pemeliharaan.findAll({
                attributes: ['tanggal_pemeliharaan', 'jenis_pakan', 'jumlah_pakan', 'pembersihan_kandang', 'pembersihan_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: [
                            'id_kandang',
                            'kode_kandang'
                        ]
                    }
                ],
                where : req.query
            });
            if(list.length <= 0) newError(404, 'Data Pemeliharaan tidak ditemukan', 'getAllPemeliharaan Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Create new pemeliharaan
    createPemeliharaan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
                tanggal_pemeliharaan: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null),
                jenis_pakan: joi.string().required(),
                jumlah_pakan: joi.number().required(),
                pembersihan_kandang: joi.boolean().required(),
                pembersihan_ternak: joi.boolean().required(),
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.message, 'createPemeliharaan Service');
            
            // Create data
            const pemeliharaan = await this.db.Pemeliharaan.create(
                {
                    id_kandang: value.id_kandang,
                    tanggal_pemeliharaan: value.tanggal_pemeliharaan ? value.tanggal_pemeliharaan : new Date(),
                    jenis_pakan: value.jenis_pakan,
                    jumlah_pakan: value.jumlah_pakan,
                    pembersihan_kandang: value.pembersihan_kandang,
                    pembersihan_ternak: value.pembersihan_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                },
            );
            if(!pemeliharaan) newError(500, 'Gagal menambah data Pemeliharaan', 'createPemeliharaan Service');

            return {
                code: 200,
                data: {
                    id_pemeliharaan: pemeliharaan.id_pemeliharaan,
                    id_kandang: pemeliharaan.id_kandang,
                    tanggal_pemeliharaan: pemeliharaan.tanggal_pemeliharaan,
                    createdAt: pemeliharaan.createdAt,
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _pemeliharaan(db);
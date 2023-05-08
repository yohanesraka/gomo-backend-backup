// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {newError, errorHandler} = require('../utils/errorHandler');

class _jenisKandang{
    constructor(db){
        this.db = db;
    }
    // Get Jenis Kandang
    getJenisKandang = async (req) => {
        try{
            // Get data jenis kandang
            const list = await this.db.JenisKandang.findAll({
                where: req.query
            });
            if(list.length <= 0) newError(404, 'Data Jenis Kandang tidak ditemukan', 'getJenisKandang Service');
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

    // Create new jenis kandang
    createJenisKandang = async (req) => {
        try {
            // Validate request body
            const schema = joi.object({
                jenis_kandang: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'createJenisKandang Service');

            // Create new jenis kandang
            const jenisKandang = await this.db.JenisKandang.create(value);
            if(!jenisKandang) newError(500, 'Gagal menambahkan data jenis kandang', 'createJenisKandang Service');

            return {
                code: 200,
                data: {
                    id_jenis_kandang: jenisKandang.id_jenis_kandang,
                    jenis_kandang: jenisKandang.jenis_kandang,
                    createdAt: jenisKandang.createdAt
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }

    // Update jenis kandang
    updateJenisKandang = async (req) => {
        try {
            // Validate request body
            const schema = joi.object({
                id_jenis_kandang: joi.number().required(),
                jenis_kandang: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'updateJenisKandang Service');

            // Update jenis kandang
            const jenisKandang = await this.db.JenisKandang.update({
                jenis_kandang: value.jenis_kandang
            }, {
                where: {
                    id_jenis_kandang: value.id_jenis_kandang
                }
            });
            if(jenisKandang <= 0) newError(500, 'Gagal mengubah data jenis kandang', 'updateJenisKandang Service');

            return {
                code: 200,
                data: {
                    id_jenis_kandang: value.id_jenis_kandang,
                    jenis_kandang: value.jenis_kandang,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }

    // Delete jenis kandang
    deleteJenisKandang = async (req) => {
        try {
            // Validate request body
            const schema = joi.object({
                id_jenis_kandang: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'deleteJenisKandang Service');

            // Delete jenis kandang
            const jenisKandang = await this.db.JenisKandang.destroy({
                where: {
                    id_jenis_kandang: value.id_jenis_kandang
                }
            });
            if(jenisKandang <= 0) newError(500, 'Gagal menghapus data jenis kandang', 'deleteJenisKandang Service');

            return {
                code: 200,
                data: {
                    id_jenis_kandang: value.id_jenis_kandang,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _jenisKandang(db);
// Helper databse yang dibuat
const joi = require('joi');
const {newError, errorHandler} = require('../utils/errorHandler');

class _penyakit{
    constructor(db){
        this.db = db;
    }
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Get data penyakit
            const list = await this.db.Penyakit.findAll({ where : req.query });
            if(list.length <= 0) newError(404, 'Data Penyakit tidak ditemukan', 'getPenyakit Service');

            return {
                code : 200,
                data: {
                    total: list.length,
                    list
                },
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Create new Penyakit
    createPenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_penyakit: joi.string().required(),
                gejala: joi.string().required(),
                penanganan: joi.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'createPenyakit Service');

            // Create new penyakit
            const add = await this.db.Penyakit.create({
                nama_penyakit: value.nama_penyakit,
                gejala: value.gejala,
                penanganan: value.penanganan,
            });
            if(!add) newError(500, 'Gagal menambah data penyakit', 'createPenyakit Service');

            return {
                code: 200,
                data: {
                    id_penyakit: add.id_penyakit,
                    nama_penyakit: add.nama_penyakit,
                    createdAt: add.createdAt
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }

    // Update Penyakit
    updatePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
                nama_penyakit: joi.string().required(),
                gejala: joi.string().required(),
                penanganan: joi.string().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'updatePenyakit Service');

            // Update penyakit
            const update = await this.db.Penyakit.update({
                nama_penyakit: value.nama_penyakit,
                deskripsi: value.deskripsi,
                gejala: value.gejala,
                penanganan: value.penanganan,
            }, {
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(update <= 0) newError(500, 'Gagal mengubah data penyakit', 'updatePenyakit Service');

            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    updatedAt: new Date()
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }

    // Delete Penyakit
    deletePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'deletePenyakit Service');

            // Query data
            const del = await this.db.Penyakit.destroy({
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(del <= 0) newError(500, 'Gagal menghapus data penyakit', 'deletePenyakit Service');
            
            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    deletedAt: new Date()
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _penyakit(db);
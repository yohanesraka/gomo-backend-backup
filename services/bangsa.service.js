// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {newError, errorHandler} = require('../utils/errorHandler');

class _bangsa{
    constructor(db){
        this.db = db;
    }
    // Get data varietas
    getBangsa = async (req) => {
        try{
            // Query data
            const list = await this.db.Bangsa.findAll({ where : req.query });
            if(list.length <= 0) newError(404, 'Data Bangsa tidak ditemukan', 'getBangsa');
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

    // Create new Bangsa
    createBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                bangsa: joi.string().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'createBangsa');

            // Query data
            const add = await this.db.Bangsa.create({
                bangsa: value.bangsa
            });
            if(!add) newError(500, 'Gagal menambahkan data bangsa', 'createBangsa');

            return {
                code: 200,
                data: {
                    id_bangsa: add.id_bangsa,
                    bangsa: add.bangsa,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }

    // Update Bangsa
    updateBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_bangsa: joi.number().required(),
                bangsa: joi.string().required()
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'updateBangsa');

            // Query data
            const update = await this.db.Bangsa.update({
                bangsa: value.bangsa
            }, {
                where: {
                    id_bangsa: value.id_bangsa
                }
            });
            if(update <= 0) newError(500, 'Gagal mengubah data bangsa', 'updateBangsa');

            return {
                code: 200,
                data: {
                    is_bangsa: value.is_bangsa,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }

    // Delete Bangsa
    deleteBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_bangsa: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'deleteBangsa');

            // Query data
            const del = await this.db.Bangsa.destroy({
                where: {
                    id_bangsa: value.id_bangsa
                }
            });
            if(del <= 0) newError(500, 'Gagal menghapus data bangsa', 'deleteBangsa');
            
            return {
                code: 200,
                data: {
                    id_bangsa: value.id_bangsa,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _bangsa(db);
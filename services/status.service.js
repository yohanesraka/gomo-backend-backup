// Helper databse yang dibuat
const joi = require('joi');
const {newError, errorHandler} = require('../utils/errorHandler');
class _status{
    constructor(db){
        this.db = db;
    }
    // Get Status
    getStatus = async (req) => {
        try{
            // Get data status ternak
            const list = await this.db.StatusTernak.findAll({
                attrbutes: ['id_status_ternak','status_ternak'],
                where: req.query
            });
            if(list.length <= 0) newError(404, 'Data Status tidak ditemukan', 'getStatus Service');

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
    
    // Create new status
    createStatus = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                status_ternak: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'createStatus Service');

            // Create new status
            const status = await this.db.StatusTernak.create(value);
            if(!status) newError(500, 'Gagal menambahkan data status ternak', 'createStatus Service');

            return {
                code: 200,
                data: status
            }
        } catch (error) {
            return errorHandler(error);
        }
    }

    // Update status
    updateStatus = async (req) => {
        try {
            // Validate request body
            const schema = joi.object({
                id_status_ternak: joi.number().required(),
                status_ternak: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'updateStatus Service');

            // Update Status Ternak
            const status = await this.db.StatusTernak.update({
                status_ternak: value.status_ternak
            }, {
                where: {
                    id_status_ternak: value.id_status_ternak
                }
            });
            if(status <= 0) newError(500, 'Gagal update data status ternak', 'updateStatus Service');

            return {
                code: 200,
                data: {
                    id_status_ternak: value.id_status_ternak,
                    status: value.status,
                    updatedAt: new Date()
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }

    // Delete status
    deleteStatus = async (req) => {
        try {
            // Validate request body
            const schema = joi.object({
                id_status_ternak: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'deleteStatus Service');

            // Delete Status Ternak
            const status = await this.db.StatusTernak.destroy({
                where: {
                    id_status_ternak: value.id_status_ternak
                }
            });
            if(status <= 0) newError(500, 'Gagal menghapus data status ternak', 'deleteStatus Service');

            return {
                code: 200,
                data: {
                    id_status_ternak: value.id_status_ternak,
                    deletedAt: new Date()
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _status(db);
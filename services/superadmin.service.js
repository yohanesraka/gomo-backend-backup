// Helper databse yang dibuat
const joi = require('joi');
const {generateToken} = require('../utils/auth');
const config = require('../config/app.config')
const date = require('date-and-time');
const {newError, errorHandler} = require('../utils/errorHandler');
const cron = require('node-cron');
const { Op } = require("sequelize");

class _superAdmin{
    constructor(db){
        this.db = db;
    }
    // Get Data users
    getUsers = async (req) => {
        try{
            // Add query params
            req.query.role = 'admin';
            // Get data users
            const list = await this.db.AuthUser.findAll({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status'],
                include: [
                    {
                        model: this.db.Peternakan,
                        as: 'peternakan',
                        attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'subscribe', 'postcode', 'longitude', 'latitude', 'alamat_postcode', 'token'],
                    }
                ],
                where : req.query });
            if(list.length <= 0) newError(404, 'Data Users tidak ditemukan', 'getUsers Service');

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

    // Get Peternakan
    getPeternakan = async (req) => {
        try{
            // Get data peternakan
            const list = await this.db.Peternakan.findAll({
                attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'subscribe', 'postcode', 'longitude', 'latitude', 'alamat_postcode', 'token'],
                include: [
                    {
                        model: this.db.AuthUser,
                        as: 'user',
                        attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status'],
                    }
                ],
                where : req.query });
            if(list.length <= 0) newError(404, 'Data Peternakan tidak ditemukan', 'getPeternakan Service');

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

    // Generate new toke for superadmin and bod 
    generateNewToken = async (req) => {
        try{
            // Validate request
            const schema = joi.object({
                id_peternakan: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'generateNewToken Service');
            
            // Generate new token
            const token = generateToken({ 
                id_user: req.dataAuth.id_user, 
                nama_pengguna: req.dataAuth.nama_pengguna, 
                role: req.dataAuth.role,
                status: req.dataAuth.status,
                id_peternakan: value.id_peternakan
            });

            return {
                code: 200,
                data: {
                    token,
                    expiresAt: date.format(date.addSeconds(new Date(), config.jwt.expiresIn), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        }
        catch (error){
            return errorHandler(error);
        }
    }

    // Set farm to premium farm
    setPremiumFarm = async (req) => {
        try{
            // Validate request
            const schema = joi.object({
                id_peternakan: joi.number().required(),
                months: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'setPremiumFarm Service');

            // subcribe premium farm time
            const farmData = await this.db.Peternakan.findOne({ where: { id_peternakan: value.id_peternakan } });
            if(!farmData) newError(404, 'Peternakan tidak ditemukan', 'setPremiumFarm Service');

            const oldDate = farmData.dataValues.subscribe ? new Date(farmData.dataValues.subscribe) : new Date();
            const newDate = new Date(oldDate.setMonth(oldDate.getMonth() + value.months));

            // Update data peternakan
            const farm = await this.db.Peternakan.update({ subscribe: newDate}, { where: { id_peternakan: value.id_peternakan } });
            if(farm[0] <= 0) newError(500, 'Gagal update data peternakan', 'setPremiumFarm Service');

            return {
                code: 200,
                data: {
                    message: `Success to subscribe premium farm ${value.id_peternakan} for ${value.months} months, until ${newDate}`
                }
            }
        }
        catch (error){
            return errorHandler(error);
        }
    }

    // Set farm premium to free farm
    setFreeFarmAuto = function () {
        cron.schedule('0 0 * * *', async () => {
            // Update data farm
            await this.db.Peternakan.update({ subscribe: null}, { where: { subscribe: { [Op.lte]: new Date() } }});
        }
        , {
            scheduled: true,
            timezone: "Asia/Jakarta"
        });
    }

    // Set farm premium to free farm manual
    setFreeFarmManual = async (req) => {
        try{
            // Validate request
            const schema = joi.object({
                id_peternakan: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'setFreeFarmManual Service');

            // Check peternakan
            const farmData = await this.db.Peternakan.findOne({ where: { id_peternakan: value.id_peternakan, subscribe:{[Op.not]: null} } });
            if(!farmData) newError(400, `Peternakan with id ${value.id_peternakan} is not premium Peternakan`, 'setFreeFarmManual Service');

            // Update data peternakan
            const farm = await this.db.Peternakan.update({ subscribe: null}, { where: { id_peternakan: value.id_peternakan } });
            if(farm[0] <= 0) newError(500, 'Gagal update data peternakan', 'setFreeFarmManual Service');

            return {
                code: 200,
                data: {
                    message: `Success to set free premium farm ${value.id_peternakan}`
                }
            }
        }
        catch (error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _superAdmin(db);
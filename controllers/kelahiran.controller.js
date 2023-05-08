const { Router } = require('express');
const kelahiranService = require('../services/kelahiran.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const kelahiranController = (db) => {
    const s$kelahiran = kelahiranService(db);
    const KelahiranController = Router();

    /**
     * Get new ternak kelahiran (cempe)
     */
    KelahiranController.get('/new-cempe', authentication, adminMiddleware, async (req, res, next) => {  
        const list = await s$kelahiran.getNewTernakKelahiran(req);
        response.sendResponse(res, list);
    });

    /**
     * Get data kelahiran
     */
    KelahiranController.get('/data-ternak-kelahiran', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kelahiran.getKelahiran(req);
        response.sendResponse(res, list);
    });

    /**
     * Create kelahiran
     * @param {number} id_ternak
     * @param {date} tanggal_masuk
     * @param {date} tanggal_lahir
     * @param {number} id_sire
     * @param {number} id_dam
     * @param {string} jenis_kelamin
     * @param {number} id_bangsa
     * @param {number} id_kandang
     */
    KelahiranController.post('/create', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kelahiran.createKelahiran(req);
        console.log(list);
        response.sendResponse(res, list);
    });

    return KelahiranController;
}

module.exports = kelahiranController;
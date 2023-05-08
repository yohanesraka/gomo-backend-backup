const { Router } = require('express');
const kebuntinganService = require('../services/kebuntingan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const kebuntinganController = (db) => {
    const s$kebuntingan = kebuntinganService(db);
    const KebuntinganController = Router();

    /**
     * Get list kandang
     */
    KebuntinganController.get('/kandang', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kebuntingan.getKandangKebuntingan(req);
        response.sendResponse(res, list);
    });

    /**
     * Get list ternak
     */
    KebuntinganController.get('/ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kebuntingan.getDataTernakInKandang(req);
        response.sendResponse(res, list);
    });

    /**
     * Set abortus
     * @param {number} id_ternak
     */
    KebuntinganController.post('/set-abortus', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kebuntingan.setTernakAbortus(req);
        response.sendResponse(res, list);
    });

    /**
     * Get ternak kebuntingan
     */
    KebuntinganController.get('/all-ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kebuntingan.getTernakKebuntingan(req);
        response.sendResponse(res, list);
    });

    return KebuntinganController;
}

module.exports = kebuntinganController;
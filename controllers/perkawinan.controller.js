const { Router } = require('express');
const perkawinanService = require('../services/perkawinan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const perkawinanController = (db) => {
    const s$perkawinan = perkawinanService(db);
    const PerkawinanController = Router();

    /**
     * Get Ternak in waiting list perkawinan
     */
    PerkawinanController.get('/waiting-list', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getTernakWaitingList(req);
        response.sendResponse(res, list);
    });

    /**
     * Get Perkawinan
     */
    PerkawinanController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getPerkawinan(req);
        response.sendResponse(res, list);
    });

    /**
     * Create Perkawinan
     * @param {number} id_indukan
     * @param {number} id_pejantan
     */
     PerkawinanController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.createPerkawinan(req);
        response.sendResponse(res, list);
    });

    /**
     * Update Perkawinan
     * @param {number} id_perkawinan
     * @param {string} status
     * @param {number} id_kandang
     * @param {boolean} usg_1
     * @param {boolean} usg_2
     */
    PerkawinanController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.updatePerkawinan(req);
        response.sendResponse(res, list);
    });

    /**
     * Get data ternak perkawinan
     */
    PerkawinanController.get('/ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getTernakInPerkawinan(req);
        response.sendResponse(res, list);
    });

    /**
     * Get kandang perkawinan
     */
    PerkawinanController.get('/kandang', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getKandangPerkawinan(req);
        response.sendResponse(res, list);
    });

    /**
     * Get indukan perkawinan
     */
    PerkawinanController.get('/indukan', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getIndukanPerkawinan(req);
        response.sendResponse(res, list);
    });

    return PerkawinanController;
}

module.exports = perkawinanController;
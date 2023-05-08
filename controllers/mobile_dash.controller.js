const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');
const mobileDashService = require('../services/mobile_dash.service');
const response = require('../utils/response');

const mobileDashController = (db) => {
    const s$mobileDash = mobileDashService(db);
    const MobileDashController = Router();

    /**
     * Get Data total ternak
     */
    MobileDashController.get('/total-ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$mobileDash.getTotalTernak(req);
        response.sendResponse(res, list);
    });

    /**
     * Get Data total ternak by status
     */
    MobileDashController.get('/total-ternak-by-status', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$mobileDash.getTotalTernakByStatus(req);
        response.sendResponse(res, list);
    });

    /**
     * Get Data total ternak by fase
     */
    MobileDashController.get('/total-ternak-by-fase', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$mobileDash.getTotalTernakByFase(req);
        response.sendResponse(res, list);
    });

    return MobileDashController;
}

module.exports = mobileDashController;
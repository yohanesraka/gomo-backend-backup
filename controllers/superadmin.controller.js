const { Router } = require('express');
const superAdminService = require('../services/superadmin.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { superAdminMiddleware } = require('../middlewares/authorization');

const superAdminController = (db) => {
    const s$superAdmin = superAdminService(db);
    const SuperAdminController = Router();

    /**
     * List User
     */
    SuperAdminController.get('/users', authentication, superAdminMiddleware, async (req, res, next) => {
        const list = await s$superAdmin.getUsers(req);
        response.sendResponse(res, list);
    });

    /**
     * Get Peternakan
     */
    SuperAdminController.get('/peternakan', authentication, superAdminMiddleware, async (req, res, next) => {
        const list = await s$superAdmin.getPeternakan(req);
        response.sendResponse(res, list);
    });

    /**
     * Generate new token for superadmin and bod
     * @param {string} id_user
     */
    SuperAdminController.post('/generate-token', authentication, superAdminMiddleware, async (req, res, next) => {
        const result = await s$superAdmin.generateNewToken(req);
        response.sendResponse(res, result);
    });

    /**
     * Set premium farm
     * @param {number} id_peternakan
     * @param {number} months
     */
    SuperAdminController.post('/set-premium-farm', authentication, superAdminMiddleware, async (req, res, next) => {
        const result = await s$superAdmin.setPremiumFarm(req);
        response.sendResponse(res, result);
    });

    /**
     * Set free farm auto
     */
    s$superAdmin.setFreeFarmAuto();

    /**
     * Set free farm manual 
     */
    SuperAdminController.post('/set-free-farm', authentication, superAdminMiddleware, async (req, res, next) => {
        const result = await s$superAdmin.setFreeFarmManual(req);
        response.sendResponse(res, result);
    });

    return SuperAdminController;
}

module.exports = superAdminController;
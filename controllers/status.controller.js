const { Router } = require('express');
const statusService = require('../services/status.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const statusController = (db) => {
    const s$status = statusService(db);
    const StatusController = Router();

    /**
     * Get List Status
    */

    StatusController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$status.getStatus(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Status
     * @param {string} status_ternak
     */

    StatusController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$status.createStatus(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Status
     * @param {number} id_status_ternak
     * @param {string} status_ternak
    */

    StatusController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$status.updateStatus(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Status
     * @param {number} id_status_ternak
    */

    StatusController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$status.deleteStatus(req);
        response.sendResponse(res, del);
    });

    return StatusController;
}

module.exports = statusController;
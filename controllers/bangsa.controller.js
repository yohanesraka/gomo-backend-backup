const { Router } = require('express');
const bangsaService = require('../services/bangsa.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const bangsaController = (db) => {
    const s$bangsa = bangsaService(db);
    const BangsaController = Router();

    /**
     * Get Data Bangsa
    */
    BangsaController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$bangsa.getBangsa(req);
        response.sendResponse(res, detail);
    });

    /**
     * Create Bangsa
     * @param {string} bangsa
     */
    BangsaController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$bangsa.createBangsa(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Bangsa
     * @param {string} id_bangsa
     * @param {string} bangsa
    */
    BangsaController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$bangsa.updateBangsa(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Bangsa
     * @param {number} id_bangsa
    */
    BangsaController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$bangsa.deleteBangsa(req);
        response.sendResponse(res, del);
    });

    return BangsaController;
}

module.exports = bangsaController;
const { Router } = require('express');
const riwayatPerkawinanService = require('../services/riwayat_perkawinan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const riwayatPerkawinanController = (db) => {
    const s$riwayatPerkawinan = riwayatPerkawinanService(db);
    const RiwayatPerkawinanController = Router();

    /**
     * Get Riwayat Perkawinan
     */
    RiwayatPerkawinanController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$riwayatPerkawinan.getRiwayatPerkawinan(req);
        response.sendResponse(res, list);
    });

    return RiwayatPerkawinanController;
}

module.exports = riwayatPerkawinanController;
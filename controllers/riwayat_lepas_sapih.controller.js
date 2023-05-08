const { Router } = require('express');
const riwayatLepasSapihService = require('../services/riwayat_lepas_sapih.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const riwayatLepasSapihController = (db) => {
    const s$riwayatLepasSapih = riwayatLepasSapihService(db);
    const RiwayatLepasSapihController = Router();

    /**
     * Get Riwayat Lepas Sapih
     */
    RiwayatLepasSapihController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$riwayatLepasSapih.getRiwayatLepasSapih(req);
        response.sendResponse(res, list);
    });

    return RiwayatLepasSapihController;
}

module.exports = riwayatLepasSapihController;
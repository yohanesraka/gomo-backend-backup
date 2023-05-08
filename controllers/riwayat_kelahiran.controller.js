const { Router } = require('express');
const riwayatKelahiranService = require('../services/riwayat_kelahiran.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const riwayatKelahiranController = (db) => {
    const s$riwayatKelahiran = riwayatKelahiranService(db);
    const RiwayatKelahiranController = Router();

    /**
     * Get Riwayat Kelahiran
     */
    RiwayatKelahiranController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$riwayatKelahiran.getRiwayatKelahiran(req);
        response.sendResponse(res, list);
    });

    return RiwayatKelahiranController;
}

module.exports = riwayatKelahiranController;
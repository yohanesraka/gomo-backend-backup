const { Router } = require('express');
const riwayatKebuntinganService = require('../services/riwayat_kebuntingan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const riwayatKebuntinganController = (db) => {
    const s$riwayatKebuntingan = riwayatKebuntinganService(db);
    const RiwayatKebuntinganController = Router();

    /**
     * Get Riwayat Kebuntingan
     */
    RiwayatKebuntinganController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$riwayatKebuntingan.getRiwayatKebuntingan(req);
        response.sendResponse(res, list);
    });

    return RiwayatKebuntinganController;
}

module.exports = riwayatKebuntinganController;
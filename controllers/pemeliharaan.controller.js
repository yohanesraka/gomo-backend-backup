const { Router } = require('express');
const pemeliharaanService = require('../services/pemeliharaan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const pemeliharaanController = (db) => {
    const s$pemeliharaan = pemeliharaanService(db);
    const PemeliharaanController = Router();

    /**
     * Get all Pemeliharaan
     */
    PemeliharaanController.get('/all', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$pemeliharaan.getAllPemeliharaan(req);
        response.sendResponse(res, detail);
    });

    /**
     * Get Pemeliharaan
     */
    PemeliharaanController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$pemeliharaan.getPemeliharaan(req);
        response.sendResponse(res, detail);
    });

    /**
     * Create Pemeliharaan
     * @param {number} id_kandang
     * @param {string} tanggal_pemeliharaan
     * @param {string} jenis_pakan
     * @param {number} jumlah_pakan
     * @param {boolean} pembersihan_kandang
     * @param {string} pembersihan_ternak
     */
    PemeliharaanController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$pemeliharaan.createPemeliharaan(req);
        response.sendResponse(res, add);
    });
    

    return PemeliharaanController;
}

module.exports = pemeliharaanController;
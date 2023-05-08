const { Router } = require('express');
const adaptasiService = require('../services/adaptasi.service');
const treatmentService = require('../services/treatment.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const adaptasiController = (db) => {
    const s$adaptasi = adaptasiService(db);
    const s$treatment = treatmentService(db);
    const AdaptasiController = Router();

    /**
     * Get Treatment
     * @param {number} id_ternak
     */
    AdaptasiController.get('/treatment', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$treatment.getTreatment(req);
        response.sendResponse(res, list);
    });

    /**
     * Get all treatment
     */
    AdaptasiController.get('/treatment/all', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$treatment.getAllTreatment(req);
        response.sendResponse(res, list);
    });

    /**
     * Create adaptasi
     * @param {number} id_ternak
     */
    AdaptasiController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const result = await s$adaptasi.createAdaptasi(req);
        response.sendResponse(res, result);
    });

    /**
     * Get all riwayat adaptasi complete data
     */
    AdaptasiController.get('/complete', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getAdaptasiComplete(req);
        response.sendResponse(res, list);
    });
     
    /**
     * Get all riwayat adaptasi main data
     */
    AdaptasiController.get('/main', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getAdaptasiMain(req);
        response.sendResponse(res, list);
    });

    /**
     * Get all riwayat adaptasi by step
     */
    AdaptasiController.get('/by-step', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getAdaptasiByStep(req);
        response.sendResponse(res, list);
    });

    /**
     * Get ternak by step adaptasi
     * @param {number} step
     */
    AdaptasiController.get('/step', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getTernakByStep(req);
        response.sendResponse(res, list);
    });

    /**
     * Get all ternak in adaptasi
     */
    AdaptasiController.get('/ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getAllTernakInAdaptasi(req);
        response.sendResponse(res, list);
    });

    return AdaptasiController;
}

module.exports = adaptasiController;
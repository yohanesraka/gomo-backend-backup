const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');
const webDashService = require('../services/web_dash.service');
const populasiService = require('../services/populasi.service');
const response = require('../utils/response');

const webDashController = (db) => {
    const s$webDash = webDashService(db);
    const s$populasi = populasiService(db);
    const WebDashController = Router();

    /**
     * Get Populasi
     */
    WebDashController.get('/populasi', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$populasi.getPopulasi(req);
        response.sendResponse(res, list);
    });
    // s$webDash.createPopulasi();

    // /**
    //  * Get jumlah ternak sakit dan sehat
    //  */
    // WebDashController.get('/status_kesehatan', authentication, adminMiddleware, async (req, res, next) => {
    //     const list = await s$webDash.getStatusKesehatan(req);
    //     response.sendResponse(res, list);
    // });

    /**
     * Get total ternak by status ternak
     */
    WebDashController.get('/total-ternak-by-status', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalTernakByStatus(req);
        response.sendResponse(res, list);
    });

    /**
     * Get total kandang
     */
    WebDashController.get('/total-kandang', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalKandang(req);
        response.sendResponse(res, list);
    });

    /**
     * Get total ternak
     */
    WebDashController.get('/total-ternak', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalTernak(req);
        response.sendResponse(res, list);
    });

    /**
     * Get total ternak by fase
     */
    WebDashController.get('/total-ternak-by-fase', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalTernakByFase(req);
        response.sendResponse(res, list);
    });

    /**
     * Get total ternak by jenis kandang
     */
    WebDashController.get('/total-ternak-by-jenis-kandang', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalTernakByJenisKandang(req);
        response.sendResponse(res, list);
    });

    /**
     * Get ADG cempe
     */
    WebDashController.get('/adg-cempe', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getADGCempe(req);
        response.sendResponse(res, list);
    });

    /**
     * Get total ternak by status keluar
     */
    WebDashController.get('/total-ternak-by-status-keluar', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getTotalTernakByStatusKeluar(req);
        response.sendResponse(res, list);
    });

    /**
     * Get Coordinate
     */
    WebDashController.get('/coordinate', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$webDash.getCoordinate(req);
        response.sendResponse(res, list);
    });

    return WebDashController;
}

module.exports = webDashController;
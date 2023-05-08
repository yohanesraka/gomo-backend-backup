const { Router } = require('express');
const kandangService = require('../services/kandang.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const kandangController = (db) => {
    const s$kandang = kandangService(db);
    const KandangController = Router();

    /**
     * Get List Kandang (use query)
    */

    KandangController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$kandang.getKandang(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Kandang
     * @param {string} kode_kandang
     * @param {string} jenis_kandang
     */

    KandangController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$kandang.createKandang(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Kandang
     * @param {number} id_kandang
     * @param {string} kode_kandang
     * @param {string} jenis_kandang
     * @param {string} status
    */

    KandangController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$kandang.updateKandang(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Kandang
     * @param {number} id_kandang
    */

    KandangController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$kandang.deleteKandang(req);
        response.sendResponse(res, del);
    });

    /**
     * Get kode kandang
     */
    KandangController.get('/kode-kandang', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$kandang.getKodeKandang(req);
        response.sendResponse(res, list);
    });

    return KandangController;
}

module.exports = kandangController;
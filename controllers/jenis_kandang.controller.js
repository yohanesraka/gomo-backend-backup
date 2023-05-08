const { Router } = require('express');
const jenisKandangService = require('../services/jenis_kandang.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const jenisKandangController = (db) => {
    const s$jenisKandang = jenisKandangService(db);
    const JenisKandangController = Router();

    /**
     * Get List Jenis Kandang
    */

    JenisKandangController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$jenisKandang.getJenisKandang(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Jenis Kandang
     * @param {string} jenis_kandang
     */

    JenisKandangController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$jenisKandang.createJenisKandang(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Jenis Kandang
     * @param {number} id_jenis_kandang
     * @param {string} jenis_kandang
    */

    JenisKandangController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$jenisKandang.updateJenisKandang(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Jenis Kandang
     * @param {number} id_jenis_kandang
    */

    JenisKandangController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$jenisKandang.deleteJenisKandang(req);
        response.sendResponse(res, del);
    });

    return JenisKandangController;
}

module.exports = jenisKandangController;
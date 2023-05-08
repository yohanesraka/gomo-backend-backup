const { Router } = require('express');
const kesehatanService = require('../services/kesehatan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const kesehatanController = (db) => {
    const s$kesehatan = kesehatanService(db);
    const KesehatanController = Router();

    // Get total ternak sakit by penyakit
    KesehatanController.get('/total-sakit-by-penyakit', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$kesehatan.getTotalTernakSakitByPenyakit(req);
        response.sendResponse(res, detail);
    });

    // Get ternak sakit by penyakit
    KesehatanController.get('/ternak-sakit', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$kesehatan.getTernakSakit(req);
        response.sendResponse(res, detail);
    });

    // Update status kesehatan ternak
    KesehatanController.put('/update-status-kesehatan', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$kesehatan.updateKesehatan(req);
        response.sendResponse(res, edit);
    });

    // Set ternak sakit
    KesehatanController.post('/set-ternak-sakit', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$kesehatan.setTernakSakit(req);
        response.sendResponse(res, add);
    });

    return KesehatanController;
}

module.exports = kesehatanController;
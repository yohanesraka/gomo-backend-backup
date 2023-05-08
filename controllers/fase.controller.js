const { Router } = require('express');
const faseService = require('../services/fase.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const faseController = (db) => {
    const s$fase = faseService(db);
    const FaseController = Router();

    /**
     * Get List Fase
    */

    FaseController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$fase.getFase(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Fase
     * @param {string} fase
     */

    FaseController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$fase.createFase(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Fase
     * @param {number} id_fp
     * @param {string} fase
    */

    FaseController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$fase.updateFase(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Fase
     * @param {number} id_fp
    */

    FaseController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$fase.deleteFase(req);
        response.sendResponse(res, del);
    });

    return FaseController;
}

module.exports = faseController;
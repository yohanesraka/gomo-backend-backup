const { Router } = require('express');
const lepasSapihService = require('../services/lepas_sapih.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const lepasSapihController = (db) => {
    const s$lepasSapih = lepasSapihService(db);
    const LepasSapihController = Router();

    /**
     * Create lepas sapih
     * @param {number} id_ternak
     * @param {string} tanggal_lepas_sapih
     * @param {number} id_kandang
     */
    LepasSapihController.post('/', authentication, adminMiddleware, async (req, res) => {
        const detail = await s$lepasSapih.createLepasSapih(req);
        response.sendResponse(res, detail);
    });

    /**
     * Get lepas sapih
     */
    LepasSapihController.get('/', authentication, adminMiddleware, async (req, res) => {
        const detail = await s$lepasSapih.getLepasSapih(req);
        response.sendResponse(res, detail);
    });

    /**
     * Seleksi lepas sapih
     * @param {number} id_ternak
     * @param {string} status
     */
    LepasSapihController.post('/seleksi', authentication, adminMiddleware, async (req, res) => {
        const detail = await s$lepasSapih.seleksiLepasSapih(req);
        response.sendResponse(res, detail);
    });

    /**
     * Get data ternal lepas sapih dashboard web
     */
     LepasSapihController.get('/ternak-dash', authentication, adminMiddleware, async (req, res) => {
        const detail = await s$lepasSapih.getLepasSapihDashboard(req);
        response.sendResponse(res, detail);
    });    

    return LepasSapihController;
}

module.exports = lepasSapihController;
const { Router } = require('express');
const response = require('../utils/response');
// const statusService = require('../services/status.service');
// const kandangService = require('../services/kandang.service');
// const pakanService = require('../services/pakan.service');
// const penyakitService = require('../services/penyakit.service');
// const jenisKandangService = require('../services/jenis_kandang.service');
// const ternakService = require('../services/ternak.service');
// const bangsaService = require('../services/bangsa.service');
const formInputService = require('../services/form_input.service');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const formInputController = (db) => {
    // const s$status = statusService(db);
    // const s$kandang = kandangService(db);
    // const s$pakan = pakanService(db);
    // const s$penyakit = penyakitService(db)
    // const s$jenisKandang = jenisKandangService(db);
    // const s$ternak = ternakService(db);
    // const s$bangsa = bangsaService(db);
    const s$formInput = formInputService(db);

    const FormInputController = Router();


    /**
    //  * Get List Status
    // */
    //  FormInputController.get('/status', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$status.getStatus(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get List Kandang (use query)
    // */

    // FormInputController.get('/kandang', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$kandang.getKandang(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get Jenis Pakan
    // */
    // FormInputController.get('/jenis-pakan', authentication, adminMiddleware, async (req, res) => {
    //     const data = await s$pakan.getJenisPakan(req);
    //     return response.sendResponse(res, data);
    // });

    // /**
    // * Get List Penyakit
    // */
    // FormInputController.get('/penyakit', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$penyakit.getPenyakit(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get List Jenis Kandang
    // */
    // FormInputController.get('/jenis-kandang', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$jenisKandang.getJenisKandang(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get data indukan
    // */
    // FormInputController.get('/indukan', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$ternak.getDataIndukanFormInput(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get data pejantan
    // */
    // FormInputController.get('/pejantan', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$ternak.getDataPejantanFormInput(req);
    //     response.sendResponse(res, detail);
    // } );

    // /**
    // * Get Data Bangsa
    // */
    // FormInputController.get('/bangsa', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$bangsa.getBangsa(req);
    //     response.sendResponse(res, detail);
    // });

    /**
     * Get Data Form Input
     */
    FormInputController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$formInput.getDataFormInput(req);
        response.sendResponse(res, detail);
    });

    return FormInputController;
}

module.exports = formInputController;
const { Router } = require("express");
const prediksiService = require("../services/prediksi_susu.service");
const response = require("../utils/response");
const authentication = require("../middlewares/authentication");
const { adminMiddleware } = require("../middlewares/authorization");

const prediksiController = (db) => {
    const s$prediksi = prediksiService(db);
    const PrediksiController = Router();

    //Get List Prediksi Susu
    PrediksiController.get("/", authentication, adminMiddleware, async (_req, res) => {
        const list = await s$prediksi.getDataPrediksi();
        response.sendResponse(res, list);
    });

    PrediksiController.put("/literasi", authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$prediksi.updateDataLiterasi(req);
        response.sendResponse(res, edit);
    });

    PrediksiController.put("/prediksi", authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$prediksi.updateDataPrediksi(req);
        response.sendResponse(res, edit);
    });

    return PrediksiController;
};
module.exports = prediksiController;

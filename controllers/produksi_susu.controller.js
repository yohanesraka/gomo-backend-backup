const { Router } = require("express");
const produksiService = require("../services/produksi_susu.service");
const response = require("../utils/response");
const authentication = require("../middlewares/authentication");
const { adminMiddleware } = require("../middlewares/authorization");
const { string } = require("joi");

const produksiController = (db) => {
    const s$produksi = produksiService(db);
    const ProduksiController = Router();

    ProduksiController.get("/", authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$produksi.getDataProduksi(req);
        response.sendResponse(res, list);
    });

    ProduksiController.get("/total", authentication, adminMiddleware, async (req, res, next) => {
        const listTotal = await s$produksi.getTotalDataProduksi(req);
        response.sendResponse(res, listTotal);
    });

    ProduksiController.get("/:id_ternak", authentication, adminMiddleware, async (req, res, next) => {
        const listByID = await s$produksi.getDataProduksiByIdTernak(req);
        response.sendResponse(res, listByID);
    });

    /**
     * @param {number} id_peternakan
     * @param {number} id_ternak
     * @param {string} produksi_pagi
     * @param {string} produksi_sore
     * @param {string} kualitas
     * @param {string} tanggal_produksi
     */

    ProduksiController.post("/", authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$produksi.createDataProduksi(req);
        response.sendResponse(res, add);
        // console.log(res);
    });

    ProduksiController.put("/", authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$produksi.updateDataProduksi(req);
        response.sendResponse(res, edit);
    });

    ProduksiController.delete("/:id_produksi_susu", authentication, adminMiddleware, async (req, res, next) => {
        req.body.id_produksi_susu = req.params.id_produksi_susu;
        const deleteResult = await s$produksi.deleteDataProduksi(req);
        response.sendResponse(res, deleteResult);
    });

    return ProduksiController;
};
module.exports = produksiController;

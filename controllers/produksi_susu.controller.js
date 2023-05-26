const {Router} = require('express');
const produksiService = require('../services/produksi_susu.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');
const { string } = require('joi');

const produksiController = (db) =>{
    const s$produksi = produksiService(db);
    const ProduksiController = Router();
    

    //Get List Produksi Susu
    ProduksiController.get('/', authentication,adminMiddleware, async(req, res, next)=>{
        const list = await s$produksi.getDataProduksi(req);
        response.sendResponse(res, list);
    });

    /** 
     * @param {number} id_peternakan
     * @param {number} id_produksi_susu
     * @param {number} id_ternak
     * @param {number} id_fp
     * @param {string} produksi_pagi
     * @param {string} produksi_sore
     * @param {string} total_harian
     * @param {string} tanggal_produksi
    */

    //Create New Produksi Susu
    ProduksiController.post('/', authentication, adminMiddleware, async (req, res, next)=>{
        const add = await s$produksi.createDataProduksi(req);
        response.sendResponse(res, add);
        // console.log(res);
    });

    

    return ProduksiController;
     
}
module.exports = produksiController;
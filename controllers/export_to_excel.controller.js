const { Router } = require("express");
const exportExcelService = require("../services/export_to_excel.service");
const response = require("../utils/response");
const authentication = require("../middlewares/authentication");
const { adminMiddleware } = require("../middlewares/authorization");

const exportExcelController = (db) => {
    const s$exportExcel = exportExcelService(db);
    const ExportExcelController = Router();

    ExportExcelController.get("/", authentication, adminMiddleware, async (_req, res) => {
        const exportData = await s$exportExcel.getExportToExcel();
        response.sendResponse(res, exportData);
    });

    return ExportExcelController;
};

module.exports = exportExcelController;

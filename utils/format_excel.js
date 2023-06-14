require("exceljs");
require("fs");
const path = require("path");
const os = require("os");

// Fungsi untuk memformat kolom di Excel
const formatColumn = (worksheet, columnIndex, width, headerText) => {
    const column = worksheet.getColumn(columnIndex);
    column.width = width;
    column.header = headerText;
};

// Fungsi untuk memformat header kolom di Excel
const formatHeaderRow = (worksheet, headerRow) => {
    headerRow.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = { bold: true };
        cell.border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, top: { style: "thin" } };
        cell.alignment.wrapText = true;
    });
};

// Fungsi untuk memformat data baris di Excel
const formatDataRow = (worksheet, dataRow) => {
    dataRow.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = { bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" }, top: { style: "thin" } };
    });
};

// Fungsi untuk menghasilkan file Excel dari workbook
const generateExcelFile = async (workbook) => {
    const filename = `Data Produksi Susu.xlsx`;
    // buat file path di default folder download user (misal: C:\Users\user\Downloads)
    const filePath = path.join(os.homedir(), "Downloads", filename);
    await workbook.xlsx.writeFile(filePath);

    return filePath;
};

module.exports = {
    formatColumn,
    formatHeaderRow,
    formatDataRow,
    generateExcelFile,
};

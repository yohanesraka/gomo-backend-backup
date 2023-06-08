const { newError, errorHandler } = require("../utils/errorHandler");
const { formatColumn, formatHeaderRow, formatDataRow, generateExcelFile } = require("../utils/format_excel");
const ExcelJS = require("exceljs");

class ExportToExcelService {
    constructor(db) {
        this.db = db;
    }

    async getExportToExcel() {
        try {
            const ProduksiSusu = await this.db.ProduksiSusu.findAll({
                include: [{ model: this.db.Ternak, as: "ternak" }],
            });
            const listPrediksi = await this.db.Prediksi.findAll();
            const listTernakLaktasi = await this.db.Ternak.findAll({
                include: [{ model: this.db.Fase, as: "fase" }],
                where: { status_perah: "Perah" },
            });
            const listTernak = await this.db.Ternak.findAll({
                include: [{ model: this.db.Fase, as: "fase" }],
            });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Produksi Susu");

            formatColumn(worksheet, 1, 10, "Hari Ke");
            formatColumn(worksheet, 2, 15, "Tanggal Produksi");
            formatColumn(worksheet, 3, 15, "Data Sesuai Literasi");
            formatColumn(worksheet, 4, 15, "Data Keinginan Peternak");
            formatColumn(worksheet, 5, 15, "Data Harian Rata Rata");
            listTernak.forEach((ternak, index) => {
                // merge cell untuk header ternak
                worksheet.mergeCells(1, 6 + index * 2, 1, 7 + index * 2);
                formatColumn(worksheet, 6 + index * 2, 10, `Ternak ID ${ternak.id_ternak}`);
                formatColumn(worksheet, 7 + index * 2, 10);
                formatHeaderRow(worksheet, worksheet.getRow(1));
            });

            // looping prediksi susu untuk menambahkan data prediksi ke dalam worksheet
            listPrediksi.forEach((prediksi) => {
                // mencari data ProduksiSusu berdasarkan tanggal
                const ProduksiHarian = ProduksiSusu.filter((row) => row.tanggal_produksi.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" }) === prediksi.tanggal.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" }));
                // produksi pagi
                const produksiPagi = ProduksiHarian.reduce((acc, row) => acc + row.produksi_pagi, 0);
                // produksi sore
                const produksiSore = ProduksiHarian.reduce((acc, row) => acc + row.produksi_sore, 0);

                // average harian
                const average = (produksiPagi + produksiSore) / listTernakLaktasi.length;
                // total harian per ternak urut berdasarkan id ternak (ASC) jika kosong maka 0
                const totalHarianPerTernak = listTernak.map((ternak) => {
                    const ternakProduksi = ProduksiHarian.find((row) => row.id_ternak === ternak.id_ternak);
                    return ternakProduksi ? ternakProduksi.total_harian : 0;
                });

                // fase ternak per ternak urut berdasarkan id ternak (ASC) jika kosong maka 0
                const faseTernakPerTernak = listTernak.map((ternak) => {
                    const fase = ternak.fase.dataValues.fase;
                    return fase;
                });

                // masukkan data totalHarianPerternak dan faseTernakPerTernak secara berurutan ke dalam array
                const dataPerTernak = [];
                for (let i = 0; i < listTernak.length; i++) {
                    dataPerTernak.push(totalHarianPerTernak[i]);
                    dataPerTernak.push(faseTernakPerTernak[i]);
                }

                const dataRow = worksheet.addRow([prediksi.id_hari, prediksi.tanggal.toLocaleDateString(), prediksi.data_literasi, prediksi.data_prediksi, average, ...dataPerTernak]);

                formatDataRow(worksheet, dataRow);
            });

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) {
                    const avgCell = row.getCell(5);
                    const avgCellValue = avgCell.value;
                    const avgCellPrev = row.getCell(4);
                    const avgCellPrevValue = avgCellPrev.value;

                    if (avgCellValue === avgCellPrevValue) {
                        avgCell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "FF00FF00" },
                        };
                    } else if (avgCellValue < avgCellPrevValue) {
                        const color = Math.round((avgCellValue / avgCellPrevValue) * 255);
                        avgCell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: `FFFF${color.toString(16)}00` },
                        };
                    } else if (avgCellValue > avgCellPrevValue) {
                        const color = Math.round((avgCellPrevValue / avgCellValue) * 255);
                        avgCell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: `FF00${color.toString(16)}FF` },
                        };
                    }

                    const totalHarianTernakColumns = [];
                    const faseTernak = [];

                    // Mengumpulkan indeks kolom totalHarianTernak dan idTernak
                    for (let i = 6; i < row.cellCount; i += 2) {
                        totalHarianTernakColumns.push(i);
                        faseTernak.push(i + 1);
                    }

                    // Menerapkan kondisi pada kolom totalHarianTernak
                    totalHarianTernakColumns.forEach((columnIndex) => {
                        const totalHarianTernakCell = row.getCell(columnIndex);

                        if (totalHarianTernakCell.value < 2000) {
                            totalHarianTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFF0000" },
                            };
                        } else if (totalHarianTernakCell.value >= 2000 && totalHarianTernakCell.value <= 2500) {
                            totalHarianTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFFFF00" },
                            };
                        } else if (totalHarianTernakCell.value > 2500) {
                            totalHarianTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFFFF00" },
                            };
                        }
                    });

                    // Menerapkan kondisi pada kolom fase ternak
                    faseTernak.forEach((columnIndex) => {
                        const faseTernakCell = row.getCell(columnIndex);
                        // berikan warna pada fase ternak dengan kondisi Perkawinan = pink Kebuntingan = kuning Kering = merah Pemerahan = biru muda Melahirkan = hijau Kosong = abu muda Waiting List Perkawinan = pink
                        if (faseTernakCell.value === "Perkawinan") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFF00FF" },
                            };
                        } else if (faseTernakCell.value === "Kebuntingan") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFFFF00" },
                            };
                        } else if (faseTernakCell.value === "Kering") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFF0000" },
                            };
                        } else if (faseTernakCell.value === "Pemerahan") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FF00FFFF" },
                            };
                        } else if (faseTernakCell.value === "Melahirkan") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FF00FF00" },
                            };
                        } else if (faseTernakCell.value === "Kosong") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FF808080" },
                            };
                        } else if (faseTernakCell.value === "Waiting List Perkawinan") {
                            faseTernakCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFF00FF" },
                            };
                        } else {
                            faseTernakCell.fill = {
                                // tidak berikan warna pada fase ternak dengan kondisi lainnya
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: "FFFFFFFF" },
                            };
                        }
                    });
                }
            });

            await generateExcelFile(workbook);

            return {
                code: 200,
                status: "OK",
                data: ProduksiSusu,
            };
        } catch (error) {
            console.log(error);
            throw errorHandler(error);
        }
    }
}

module.exports = (db) => new ExportToExcelService(db);

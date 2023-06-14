const joi = require("joi");
const { newError, errorHandler } = require("../utils/errorHandler");

class _prediksiSusu {
    constructor(db) {
        this.db = db;
    }

    getDataPrediksi = async () => {
        try {
            const data = await this.db.Prediksi.findAll({
                attributes: ["id_hari", "tanggal", "data_literasi", "data_prediksi"],
            });

            if (data.length === 0) {
                return newError(404, "Data prediksi susu tidak ditemukan", "getDataPrediksi Service");
            }

            let totalDataLiterasi = 0;
            let totalDataPrediksi = 0;
            for (let i = 0; i < data.length; i++) {
                totalDataLiterasi += data[i].data_literasi;
                totalDataPrediksi += data[i].data_prediksi;
            }

            return {
                code: 200,
                data: {
                    totalDataLiterasi,
                    totalDataPrediksi,
                    data,
                },
            };
        } catch (error) {
            throw errorHandler(500, error.message);
        }
    };

    updateDataLiterasi = async (req) => {
        try {
            // const currentTimestamp = new Date("2023-01-04"); // jika ingin menggunakan data dummy uncomment ini dan comment yang dibawah
            const currentTimestamp = new Date();
            currentTimestamp.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" });
            // set jam menjadi 00:00:00
            currentTimestamp.setHours(currentTimestamp.getHours()); // Mengatur jam menjadi WIB
            currentTimestamp.setHours(7);
            currentTimestamp.setMinutes(0);
            currentTimestamp.setSeconds(0);
            currentTimestamp.setMilliseconds(0);

            const data = await this.db.ProduksiSusu.findAll({
                attributes: ["produksi_pagi", "produksi_sore", "tanggal_produksi"],
                where: {
                    tanggal_produksi: currentTimestamp,
                },
            });
            if (data.length === 0) {
                return newError(404, `Masukan data susu tanggal  ${currentTimestamp}  terlebih dahulu`, "updateDataLiterasi Service");
            }
            const listTernak = await this.db.Ternak.findAll({
                include: [{ model: this.db.Fase, as: "fase" }],
                where: { status_perah: "Perah" },
            });
            for (let i = 0; i < 240; i++) {
                if (i !== 0) currentTimestamp.setDate(currentTimestamp.getDate() + 1);
                const data = {
                    tanggal: currentTimestamp,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
            }
            // buat rata-rata produksi susu per hari
            let totalProduksiHarian = 0;
            for (let i = 0; i < data.length; i++) {
                totalProduksiHarian += data[i].produksi_pagi + data[i].produksi_sore;
            }
            const rataRataProduksiHarian = totalProduksiHarian / listTernak.length;

            const schema = joi.object({
                delta_naik: joi.number().required(),
                delta_turun: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return newError(400, error.message);
            }
            const { delta_naik, delta_turun } = value;

            // update kolom data_literasi looping dari hari 1 sampai hari 61 dengan value rataRataProduksiHarian + delta_naik, pada hari 62 sampai hari 121 dengan value rataRataProduksiHarian - delta_turun, pada hari 122 sampai terakhir dengan value 0

            for (let i = 0; i <= 60; i++) {
                const data = {
                    data_literasi: rataRataProduksiHarian,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
                if (i > 0) {
                    const dataBefore = await this.db.Prediksi.findOne({
                        attributes: ["data_literasi"],
                        where: {
                            id_hari: i,
                        },
                    });
                    const dataBeforeValue = dataBefore.dataValues.data_literasi;
                    const data = {
                        data_literasi: dataBeforeValue + delta_naik,
                    };
                    await this.db.Prediksi.update(data, {
                        where: {
                            id_hari: i + 1,
                        },
                    });
                }
            }
            for (let i = 60; i <= 210; i++) {
                const dataBefore = await this.db.Prediksi.findOne({
                    attributes: ["data_literasi"],
                    where: {
                        id_hari: i,
                    },
                });
                const dataBeforeValue = dataBefore.dataValues.data_literasi;
                const data = {
                    data_literasi: dataBeforeValue + delta_turun,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
            }
            for (let i = 210; i < 241; i++) {
                const data = {
                    data_literasi: 0,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
            }

            const dataPrediksi = await this.db.Prediksi.findAll({
                attributes: ["id_hari", "tanggal", "data_literasi"],
            });

            return {
                code: 200,
                data: dataPrediksi,
            };
        } catch (error) {
            return errorHandler(error);
        }
    };

    updateDataPrediksi = async (req) => {
        try {
            // const currentTimestamp = new Date("2023-01-04"); // jika ingin menggunakan data dummy uncomment ini dan comment yang dibawah
            const currentTimestamp = new Date();
            currentTimestamp.setHours(currentTimestamp.getHours()); // Mengatur jam menjadi WIB
            currentTimestamp.setHours(7);
            currentTimestamp.setMinutes(0);
            currentTimestamp.setSeconds(0);
            currentTimestamp.setMilliseconds(0);

            const literasi = await this.db.Prediksi.findAll({
                attributes: ["data_literasi"],
            });

            const data = await this.db.ProduksiSusu.findAll({
                attributes: ["produksi_pagi", "produksi_sore", "tanggal_produksi"],
                where: {
                    tanggal_produksi: currentTimestamp,
                },
            });
            if (data.length === 0) {
                return newError(404, `Masukan data susu tanggal  ${currentTimestamp}  terlebih dahulu`, "updateDataLiterasi Service");
            }
            const listTernak = await this.db.Ternak.findAll({
                include: [{ model: this.db.Fase, as: "fase" }],
                where: { status_perah: "Perah" },
            });
            // buat rata-rata produksi susu per hari
            let totalProduksiHarian = 0;
            for (let i = 0; i < data.length; i++) {
                totalProduksiHarian += data[i].produksi_pagi + data[i].produksi_sore;
            }
            const rataRataProduksiHarian = totalProduksiHarian / listTernak.length;

            let puncakLaktasi = 0;

            let SAP = 0;
            for (let i = 0; i <= 61; i++) {
                SAP += literasi[i].dataValues.data_literasi;
                if (i === 61) {
                    puncakLaktasi = literasi[i].dataValues.data_literasi;
                }
            }
            let PAK = 0;
            for (let i = 61; i <= 210; i++) {
                PAK += literasi[i].dataValues.data_literasi;
            }
            let total = 0;
            for (let i = 0; i < literasi.length; i++) {
                total += literasi[i].dataValues.data_literasi;
            }

            const persentaseSAP = (SAP / total) * 1;
            const persentasePAK = (PAK / total) * 1;

            const schema = joi.object({
                target_peternak: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return newError(400, error.message);
            }
            const { target_peternak } = value;

            const targetNaik = target_peternak * persentaseSAP;
            const targetTurun = target_peternak * persentasePAK;

            const deltaNaik = (2 * targetNaik - 2 * rataRataProduksiHarian * 61) / (60 * 61);
            const deltaTurun = (2 * targetTurun - 2 * puncakLaktasi * 150) / (150 * 149);

            for (let i = 0; i <= 60; i++) {
                const data = {
                    data_prediksi: rataRataProduksiHarian,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
                if (i > 0) {
                    const dataBefore = await this.db.Prediksi.findOne({
                        attributes: ["data_prediksi"],
                        where: {
                            id_hari: i,
                        },
                    });
                    const dataBeforeValue = dataBefore.dataValues.data_prediksi;
                    const data = {
                        data_prediksi: dataBeforeValue + Math.round(deltaNaik),
                    };
                    await this.db.Prediksi.update(data, {
                        where: {
                            id_hari: i + 1,
                        },
                    });
                }
            }
            for (let i = 60; i <= 210; i++) {
                const dataBefore = await this.db.Prediksi.findOne({
                    attributes: ["data_prediksi"],
                    where: {
                        id_hari: i,
                    },
                });
                const dataBeforeValue = dataBefore.dataValues.data_prediksi;
                const data = {
                    data_prediksi: dataBeforeValue + Math.round(deltaTurun),
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
            }
            for (let i = 210; i < 241; i++) {
                const data = {
                    data_prediksi: 0,
                };
                await this.db.Prediksi.update(data, {
                    where: {
                        id_hari: i + 1,
                    },
                });
            }
            const dataPrediksi = await this.db.Prediksi.findAll({
                attributes: ["id_hari", "tanggal", "data_literasi", "data_prediksi"],
            });

            return {
                code: 200,
                data: dataPrediksi,
            };
        } catch (error) {
            return errorHandler(error);
        }
    };
}

module.exports = (db) => new _prediksiSusu(db);

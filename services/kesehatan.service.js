// Helper databse yang dibuat
const DateExtension = require('@joi/date')
const Joi = require('joi');
const joi = Joi.extend(DateExtension);
const {newError, errorHandler} = require('../utils/errorHandler');
const {Op} = require('sequelize');

class _kesehatan {
    constructor(db) {
        this.db = db;
    }
    // Create new ternak sakit
    setTernakSakit = async (req) => {
        const t = await this.db.sequelize.transaction();
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                id_penyakit: joi.number().required(),
                tanggal_sakit: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null),
                id_kandang: joi.number().allow(null)
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'createKesehatan Service');

            console.log(value.tanggal_sakit)
            console.log(req.body.tanggal_sakit)

            // Get data penyakit
            const penyakit = await this.db.Penyakit.findOne({
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if (!penyakit) newError(404, 'Data penyakit tidak ditemukan', 'createKesehatan Service');

            // Create Kesehatan
            const add = await this.db.Kesehatan.create({
                id_ternak: value.id_ternak,
                id_penyakit: value.id_penyakit,
                tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : new Date(),
                gejala: penyakit.dataValues.gejala,
                penanganan: penyakit.dataValues.penanganan,
                id_peternakan: req.dataAuth.id_peternakan
            }, { transaction: t });
            if (!add) newError(500, 'Gagal menambah data penyakit', 'createKesehatan Service');

            // Update kandang ternak
            if (value.id_kandang != null) {
                const update = await this.db.Ternak.update({
                    id_kandang: value.id_kandang
                }, {
                    where: {
                        id_ternak: value.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    },
                    transaction: t
                });
                if (update <= 0) newError(500, 'Gagal mengubah data ternak', 'createKesehatan Service');
            }

            // Commit
            await t.commit();

            return {
                code: 200,
                data: {
                    id_kesehatan: add.dataValues.id_kesehatan,
                    id_ternak: add.dataValues.id_ternak,
                    id_penyakit: add.dataValues.id_penyakit,
                    createdAt: add.dataValues.createdAt,
                }
            };
        }
        catch (error) {
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Update Kesehatan
    updateKesehatan = async (req) => {
        const t = await this.db.sequelize.transaction();
        try {
            // Validate data
            const schema = joi.object({
                id_kesehatan: joi.number().required(),
                tanggal_sakit: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null),
                tanggal_sembuh: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null),
                id_kandang: joi.number().allow(null),
                gejala: joi.string().allow(null),
                penanganan: joi.string().allow(null)
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'updateKesehatan Service');

            // Check data Kesehatan
            const check = await this.db.Kesehatan.findOne({
                include: [
                    {
                        model: this.db.Penyakit,
                        as: 'penyakit',
                        attributes: ['nama_penyakit']
                    }
                ],
                where: {
                    id_kesehatan: value.id_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if (!check) newError(404, 'Data kesehatan tidak ditemukan', 'updateKesehatan Service');

            // Update Kesehatan
            const update = await this.db.Kesehatan.update({
                tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : check.dataValues.tanggal_sakit,
                gejala: value.gejala ? value.gejala : check.dataValues.gejala,
                penanganan: value.penanganan ? value.penanganan : check.dataValues.penanganan
            }, {
                where: {
                    id_kesehatan: value.id_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                },
                transaction: t
            });
            if (update <= 0) newError(500, 'Gagal mengubah data kesehatan', 'updateKesehatan Service');

            if (value.tanggal_sembuh != null) {
                // Delete data kesehatan
                const del = await this.db.Kesehatan.destroy({
                    where: {
                        id_kesehatan: value.id_kesehatan,
                        id_peternakan: req.dataAuth.id_peternakan
                    },
                    transaction: t
                });
                if (del <= 0) newError(500, 'Gagal menghapus data kesehatan', 'updateKesehatan Service');

                // Create riwayat kesehatan
                const add = await this.db.RiwayatKesehatan.create({
                    tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : check.dataValues.tanggal_sakit,
                    tanggal_sembuh: value.tanggal_sembuh ? value.tanggal_sembuh : check.dataValues.tanggal_sembuh,
                    gejala: value.gejala ? value.gejala : check.dataValues.gejala,
                    penanganan: value.penanganan ? value.penanganan : check.dataValues.penanganan,
                    penyakit: check.dataValues.penyakit.dataValues.nama_penyakit,
                    id_ternak: check.dataValues.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }, { transaction: t });
                if (!add) newError(500, 'Gagal menambah data riwayat kesehatan', 'updateKesehatan Service');
            }

            // Update kandang ternak
            if (value.id_kandang != null) {
                const update = await this.db.Ternak.update({
                    id_kandang: value.id_kandang
                }, {
                    where: {
                        id_ternak: check.dataValues.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    },
                    transaction: t
                });
                if (update <= 0) newError(500, 'Gagal mengubah data ternak', 'updateKesehatan Service');
            }

            // Commit
            await t.commit();

            return {
                code: 200,
                data: {
                    id_kesehatan: check.dataValues.id_kesehatan,
                    updatedAt: new Date()
                }
            };
        }
        catch (error) {
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Get total ternak sakit by penyakit
    getTotalTernakSakitByPenyakit = async (req) => {
        try {
            // Get data penyakit
            const penyakit = await this.db.Penyakit.findAll({
                attributes: ['id_penyakit', 'nama_penyakit'],
                include: [
                    {
                        model: this.db.Kesehatan,
                        as: 'kesehatan',
                        attributes: ['id_kesehatan']
                    }
                ]
            });
            if (penyakit.length <= 0) newError(404, 'Data penyakit tidak ditemukan', 'getTotalTernakSakitByPenyakit Service');

            // Get data kesehatan
            const kesehatan = await this.db.Kesehatan.findAll({
                attributes: ['id_kesehatan', 'id_penyakit'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });

            let data = [];
            penyakit.forEach((item) => {
                let total = 0;
                kesehatan.forEach((item2) => {
                    if (item.dataValues.id_penyakit == item2.dataValues.id_penyakit) {
                        total++;
                    }
                });
                if (total > 0) {
                    data.push({
                        id_penyakit: item.dataValues.id_penyakit,
                        nama_penyakit: item.dataValues.nama_penyakit,
                        total: total
                    });
                }
            });

            return {
                code: 200,
                data: {
                    total: data.length,
                    list: data
                }
            };
        }
        catch (error) {
            return errorHandler(error);
        }
    }

    // Get ternak sakit
    getTernakSakit = async (req) => {
        try {
            // add params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            const ternakSakit = await this.db.Kesehatan.findAll({
                attributes: ['id_kesehatan', 'id_ternak', 'tanggal_sakit', 'gejala', 'penanganan'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak'],
                        include: [
                            {
                                model: this.db.Kandang,
                                as: 'kandang',
                                attributes: ['id_kandang', 'kode_kandang']
                            }
                        ]
                    },
                    {
                        model: this.db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    }
                ],
                where: req.query,
                order: [
                    ['id_kesehatan', 'DESC']
                ]
            });
            for (let i = 0; i < ternakSakit.length; i++) {
                ternakSakit[i].dataValues.kandang = ternakSakit[i].dataValues.ternak.dataValues.kandang;
                delete ternakSakit[i].dataValues.ternak;
            }
            if (ternakSakit.length <= 0) newError(404, 'Data ternak sakit tidak ditemukan', 'getTernakSakit Service');

            return {
                code: 200,
                data: {
                    total: ternakSakit.length,
                    list: ternakSakit
                }
            };
        } catch (error) {
            return errorHandler(error);
        }
    }
}


module.exports = (db) => new _kesehatan(db);
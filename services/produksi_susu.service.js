const {
    Sequelize,
    Op
} = require('sequelize');
const joi = require('joi');
const date = require('date-and-time');
const {
    newError,
    errorHandler
} = require('../utils/errorHandler');
const ternakModel = require('../models/ternak.model');

class _produksiSusu {
    constructor(db) {
        this.db = db;
    }

    //Get Data Produksi Susu
    getDataProduksi = async (req) => {
        try {

            req.query.id_peternakan = req.dataAuth.id_peternakan;


            const list = await this.db.ProduksiSusu.findAll({

              //Get by id_fp
                include: [{
                    model: this.db.Ternak,
                    as: 'ternak',
                    where : {
                        id_fp: 6
                    },
                        include: [{
                            model: this.db.Fase,
                            as:'fase',
                            where: {
                                fase : 'Pemerahan'
                            }
                        }],      
                }],

                //  include: [{
                //     model: this.db.Ternak,
                //     as: 'ternak',

                //         include: [{
                //             model: this.db.Fase,
                //             as:'fase',
                //             where: {
                //                 fase : 'Pemerahan'
                //             }
                //         }],      
                // }],
                
                
                where: req.query

            });

            // list.forEach(element => {
            //     console.log(element.dataValues.id_ternak)
            // });
            if (list.length <= 0) {
                newError(404, 'Data Produksi Susu tidak ditemukan', 'getProduksiSusu');
            }

            // console.log(list[].dataValues)
            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            }
        } catch (error) {
            return errorHandler(error)
        }
    }

    //Create Data Produksi
    createDataProduksi = async (req) => {
        const t = await this.db.sequelize.transaction();
        try {
            const schema = joi.object({
                id_produksi_susu: joi.number().required(),
                id_peternakan: joi.number().required(),
                id_ternak: joi.number().required(),
                // id_fp:  joi.number().required(),
                produksi_pagi: joi.string().required(),
                produksi_sore: joi.string().required(),
                produksi_sore: joi.string().required(),
                total_harian: joi.string().required(),
                tanggal_produksi: joi.string().required().isoDate()
            });
            const {
                error,
                value
            } = schema.validate(req.body);
            if (error) {
                newError(400, error.details[0].message, 'createdProduksiSusu Service');
            }

            //Add id_user to params
            value.id_produksi_susu = req.dataAuth.id_produksi_susu

            //Create New ProduksiSusu
            const add = await this.db.ProduksiSusu.create({
                id_produksi_susu: value.id_produksi_susu,
                id_peternakan: value.id_peternakan,
                id_ternak: value.id_ternak,
                // id_fp: value.id_fp,
                produksi_pagi: value.produksi_pagi,
                produksi_sore: value.produksi_sore,
                total_harian: value.total_harian,
                tanggal_produksi: value.tanggal_produksi
            });
            if (!add) newError(500, 'Gagal menambahkan Produksi Susu', 'createProduksiSusu Service')
            await t.commit()
            return {
                code: 200,
                data: {
                    message: "success"
                }
            }

        } catch (error) {
            // console.log(error)
            await t.rollback();
            return errorHandler(error)
        }
    }

    //Update Data Produksi
    updateDataProduksi = async (req) => {
        const t = await this.db.sequelize.transaction();
        try {
            const schema = joi.object({
                id_produksi_susu: joi.number().required(),
                id_peternakan: joi.number().required(),
                id_ternak: joi.number().required(),
                id_fp: joi.number().required(),
                produksi_pagi: joi.string().required(),
                produksi_sore: joi.string().required(),
                produksi_sore: joi.string().required(),
                total_harian: joi.string().required(),
                tanggal_produksi: joi.string().required().isoDate()
            });

            const {
                error,
                value
            } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'updateDataProduksi');

            //Check if DataProduksi exist
            const dataProduksi = await this.db.ProduksiSusu.findOne({
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if (!dataProduksi) newError(404, 'Data Produksi tidak ditemukan', 'updateDataProduksi Service');


            //Update Data Produksi
            const update = await this.db.ProduksiSusu.update({
                // id_ternak: value.id_ternak || dataProduksi.dataValues.id_ternak,
                // id_peternakan: value.id_peternakan || data.dataValues.id_peternakan,
                id_fp: value.id_fp || data.dataValues.id_fp,
                produksi_pagi: value.produksi_pagi || data.dataValues.produksi_pagi,
                produksi_sore: value.produksi_sore || data.dataValues.produksi_sore,
                total_harian: value.total || data.dataValues.total_harian,
                tanggal_produksi: value.tanggal_produksi || data.dataValues.tanggal_produksi

            }, {
                where: {
                    id_produksi_susu: value.id_produksi_susu,
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak
                },
                transaction: t
            });
            if (update <= 0) newError(500, 'Gagal update Produksi Susu', 'updateDataProduksi Service');

        } catch (error) {
            await t.rollback();
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _produksiSusu(db);
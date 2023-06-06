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
                        id_fp: 7
                    },
                        include: [{
                            model: this.db.Fase,
                            as:'fase',
                            where: {
                                fase : 'Laktasi'
                            }
                        }],      
                }],

                where: req.query

            });

            if (list.length <= 0) {
                newError(404, 'Data Produksi Susu tidak ditemukan', 'getProduksiSusu');
            }
           
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

    createDataProduksi = async (req) => {
      const t = await this.db.sequelize.transaction();
      try {
          const schema = joi.object({
              id_peternakan: joi.number().required(),
              id_ternak: joi.number().required(),
              produksi_pagi: joi.string().required(),
              produksi_sore: joi.string().required(),
              tanggal_produksi: joi.string().required().isoDate(),
              kualitas: joi.string().required()
          });
  
          const { error, value } = schema.validate(req.body);
          const faseTernak = await this.db.Ternak.findOne({
            attributes: ['id_fp'],
            where : {
              id_fp : 7
            }
          });
          console.log("FASE :",faseTernak.dataValues.id_fp);
          

        if (!faseTernak) {
              throw newError(400, 'Ternak tidak dalam fase laktasi', 'createProduksiSusu Service');
          }
  
          value.id_peternakan = req.dataAuth.id_peternakan;
          value.total_harian = (Number(value.produksi_pagi) + Number(value.produksi_sore)).toString();
  
          const add = await this.db.ProduksiSusu.create({
              id_peternakan: value.id_peternakan,
              id_ternak: value.id_ternak,
              id_fp: faseTernak.dataValues.id_fp,
              produksi_pagi: value.produksi_pagi,
              produksi_sore: value.produksi_sore,
              total_harian: value.total_harian,
              kualitas: value.kualitas,
              tanggal_produksi: value.tanggal_produksi
          });
  
          if (!add) {
              throw newError(500, 'Gagal menambahkan Produksi Susu', 'createProduksiSusu Service');
          }
  
          await t.commit();
  
          return {
              code: 200,
              data: {
                  message: "success"
              }
          };
      } catch (error) {
          // console.log(error);
          await t.rollback();
          return errorHandler(error);
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
            id_fp: joi.number().required().valid(7),
            produksi_pagi: joi.string().required(),
            produksi_sore: joi.string().required(),
            total_harian: joi.string().required(),
            tanggal_produksi: joi.string().required().isoDate()
          });
      
          const { error, value } = schema.validate(req.body);
          if (error) newError(400, error.details[0].message, 'updateDataProduksi');
      
          const dataProduksi = await this.db.ProduksiSusu.findOne({
            where: {
              id_ternak: value.id_ternak,
              id_peternakan: req.dataAuth.id_peternakan
            }
          });
          if (!dataProduksi) newError(404, 'Data Produksi tidak ditemukan', 'updateDataProduksi Service');
      
          const update = await this.db.ProduksiSusu.update(
            {
              id_fp: value.id_fp || dataProduksi.id_fp,
              produksi_pagi: value.produksi_pagi || dataProduksi.produksi_pagi,
              produksi_sore: value.produksi_sore || dataProduksi.produksi_sore,
              total_harian: value.total_harian || dataProduksi.total_harian,
              tanggal_produksi: value.tanggal_produksi || dataProduksi.tanggal_produksi
            },
            {
              where: {
                id_produksi_susu: value.id_produksi_susu,
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak
              },
              transaction: t
            }
          );
          if (update <= 0) newError(500, 'Gagal update Produksi Susu', 'updateDataProduksi Service');
      
          await t.commit();
          return {
            code: 200,
            data: {
              message: "success"
            }
          };
        } catch (error) {
          await t.rollback();
          return errorHandler(error);
        }
      };
      
}




module.exports = (db) => new _produksiSusu(db);
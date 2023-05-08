// Helper databse yang dibuat
const DateExtension = require('@joi/date')
const Joi = require('joi');
const joi = Joi.extend(DateExtension);
const {newError, errorHandler} = require('../utils/errorHandler');

class _lkPemasukan{
    constructor(db){
        this.db = db;
    }
    // Get Data Ternak Masuk
    getTernakMasuk = async (req) => {
        try{
            // Get data fase
            const dataFase = await this.db.Fase.findOne({attributes: ['id_fp'], where: {fase: "Pemasukan"}});
            if(!dataFase) newError(404, 'Data Fase tidak ditemukan', 'getTernakMasuk Service');

            // Add id_user to query
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            req.query.id_fp = dataFase.dataValues.id_fp;
            req.query.status_keluar = null;
            req.query.tanggal_keluar = null;

            // Get data ternak masuk
            const list = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'rf_id'],
                where: req.query,
                order: [
                    ['createdAt', 'DESC']
                ]
            }); 
            if(list.length <= 0) newError(404, 'Data Ternak Masuk tidak ditemukan', 'getTernakMasuk Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Create LK Pemasukan
    createLKPemasukan = async (req) => {
        const t = await this.db.sequelize.transaction();
        try{
            // Validate request
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_masuk: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null),
                id_bangsa: joi.number().required(),
                jenis_kelamin: joi.string().required(),
                cek_poel: joi.number().integer().min(0).max(6).required(),
                cek_mulut: joi.string().required(),
                cek_telinga: joi.string().required(),
                cek_kuku_kaki: joi.string().required(),
                cek_kondisi_fisik_lain: joi.string().required(),
                cek_bcs: joi.number().integer().min(1).max(5).required(),
                id_status_ternak: joi.number().required(),
                status_kesehatan: joi.string().required(),
                id_kandang: joi.number().required(),
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.message, 'createLKPemasukan Service');

            // Get data ternak
            const dataTernak = await this.db.Ternak.findOne({attributes: ['rf_id'], where: {id_ternak: value.id_ternak, id_peternakan: req.dataAuth.id_peternakan}});
            if(!dataTernak) newError(404, 'Data Ternak tidak ditemukan', 'createLKPemasukan Service');

            // Check Ternak in LK Pemasukan
            const ternak = await this.db.LKPemasukan.findOne({where: {id_ternak: value.id_ternak, id_peternakan: req.dataAuth.id_peternakan}});
            if(ternak) newError(400, 'Ternak sudah ada di LK Pemasukan', 'createLKPemasukan Service');

            // get data fase
            const fase = await this.db.Fase.findOne({where: {fase: 'adaptasi 1'}});
            if(!fase) newError(404, 'Data Fase tidak ditemukan', 'createLKPemasukan Service');

            // Update Data ternak
            const date = new Date();
            const update = await this.db.Ternak.update({
                id_bangsa: value.id_bangsa,
                tanggal_masuk: value.tanggal_masuk || new Date(),
                jenis_kelamin: value.jenis_kelamin,
                id_kandang: value.id_kandang,
                id_fp: fase.dataValues.id_fp,
                id_status_ternak: value.id_status_ternak,
                tanggal_lahir: value.cek_poel > 0 ? date.setDate(date.getDate() - (value.cek_poel * 365)) : new Date(),
            },{
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan,
                },
                transaction: t
            });
            if(update <= 0) newError(400, 'Gagal update data ternak', 'createLKPemasukan Service');

            // Create riwayat fase
            const riwayatFase = await this.db.RiwayatFase.create({
                id_ternak: value.id_ternak,
                id_fp: fase.dataValues.id_fp,
                tanggal: value.tanggal_masuk || new Date(),
                id_peternakan: req.dataAuth.id_peternakan
            },{ transaction: t });
            if(!riwayatFase) newError(400, 'Gagal membuat riwayat fase', 'createLKPemasukan Service');

            // Create LK Pemasukan
            const lkPemasukan = await this.db.LKPemasukan.create({
                id_ternak: value.id_ternak,
                rf_id: dataTernak.dataValues.rf_id,
                id_bangsa: value.id_bangsa,
                jenis_kelamin: value.jenis_kelamin,
                cek_poel: value.cek_poel,
                cek_mulut: value.cek_mulut,
                cek_telinga: value.cek_telinga,
                cek_kuku_kaki: value.cek_kuku_kaki,
                cek_kondisi_fisik_lain: value.cek_kondisi_fisik_lain,
                cek_bcs: value.cek_bcs,
                id_status_ternak: value.id_status_ternak,
                status_kesehatan: value.status_kesehatan,
                id_kandang: value.id_kandang,
                id_peternakan: req.dataAuth.id_peternakan,
            },{ transaction: t });
            if(!lkPemasukan) newError(400, 'Gagal membuat LK Pemasukan', 'createLKPemasukan Service');

            // Commit transaction
            await t.commit();

            return {
                code: 200,
                data: {
                    id_lk_pemasukan: lkPemasukan.id_lk_pemasukan,
                    id_ternak: lkPemasukan.id_ternak,
                    rf_id: lkPemasukan.rf_id,
                    createdAt: lkPemasukan.createdAt,
                }
            };
        }catch (error){
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Get LK Pemasukan
    getLKPemasukan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const lkPemasukan = await this.db.LKPemasukan.findAll({
                where: req.query,
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {   model: this.db.StatusTernak,
                        as: 'status_ternak',
                        attributes: ['id_status_ternak', 'status_ternak']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            }
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(lkPemasukan.length <= 0) newError(404, 'Data LK Pemasukan tidak ditemukan', 'getLKPemasukan Service');

            return {
                code: 200,
                data: {
                    total: lkPemasukan.length,
                    list: lkPemasukan
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Get LK Pemasukan by this Month
    getLKPemasukanThisMonth = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const lkPemasukan = await this.db.LKPemasukan.findAll({
                where: req.query,
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {   model: this.db.StatusTernak,
                        as: 'status_ternak',
                        attributes: ['id_status_ternak', 'status_ternak']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            }
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(lkPemasukan.length <= 0) newError(404, 'Data LK Pemasukan tidak ditemukan', 'getLKPemasukanThisMonth Service');

            // Filter by this month
            const thisDate = new Date();
            const monthYear = thisDate.getMonth() + '-' + thisDate.getFullYear();
            const filtered = lkPemasukan.filter((item) => {
                return item.dataValues.createdAt.getMonth() + '-' + item.dataValues.createdAt.getFullYear() === monthYear;
            });

            let totalByKandang = {}

            for(let i = 0; i < filtered.length; i++){
                filtered[i].dataValues.kode_kandang = filtered[i].dataValues.kandang ? filtered[i].dataValues.kandang.dataValues.kode_kandang : null;
                filtered[i].dataValues.bangsa = filtered[i].dataValues.bangsa ? filtered[i].dataValues.bangsa.dataValues.bangsa : null;
                delete filtered[i].dataValues.kandang;

                if(filtered[i].dataValues.kode_kandang != null){
                    totalByKandang[filtered[i].dataValues.kode_kandang] ? totalByKandang[filtered[i].dataValues.kode_kandang]++ : totalByKandang[filtered[i].dataValues.kode_kandang] = 1;
                }
            }

            const ternakBetina = filtered.filter((item) => item.dataValues.jenis_kelamin != null && item.dataValues.jenis_kelamin.toLowerCase() == 'betina');
            const ternakJantan = filtered.filter((item) => item.dataValues.jenis_kelamin != null && item.dataValues.jenis_kelamin.toLowerCase() == 'jantan');

            return {
                code: 200,
                data: {
                    total: filtered.length,
                    total_betina: ternakBetina.length,
                    total_jantan: ternakJantan.length,
                    total_by_kandang: totalByKandang,
                    list: filtered
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _lkPemasukan(db);
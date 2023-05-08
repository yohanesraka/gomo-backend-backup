const {newError, errorHandler} = require('../utils/errorHandler');
const DateExtension = require('@joi/date')
const Joi = require('joi');
const joi = Joi.extend(DateExtension);
const {sequelize} = require('../models');

class _lepasSapih{
    constructor(db){
        this.db = db;
    }
    // Create lepas sapih
    createLepasSapih = async (req) => {
        const t = await sequelize.transaction();
        try{
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_lepas_sapih: joi.date().format(['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'DD-MM-YYYYTHH:mm:ss.SSSZ']).allow(null).required(),
                id_kandang: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.message, 'createLepasSapih Service');

            // Get data fase kelahiran
            const faseKelahiran = await this.db.Fase.findOne({where: {fase: 'Kelahiran'}});
            if(!faseKelahiran) newError(404, 'Data Fase Kelahiran tidak ditemukan', 'createLepasSapih Service');

            // Get data fase lepas sapih
            const faseLepasSapih = await this.db.Fase.findOne({where: {fase: 'Lepas Sapih'}});
            if(!faseLepasSapih) newError(404, 'Data Fase Lepas Sapih tidak ditemukan', 'createLepasSapih Service');

            // Check ternak
            const ternak = await this.db.Ternak.findOne({where: {id_ternak: value.id_ternak}});
            if(!ternak) newError(404, 'Ternak tidak ditemukan', 'createLepasSapih Service');
            if(ternak.dataValues.id_fp !== faseKelahiran.dataValues.id_fp) newError(400, 'Ternak not in fase kelahiran', 'createLepasSapih Service');

            // Check kandang
            const kandang = await this.db.Kandang.findOne({where: {id_kandang: value.id_kandang}});
            if(!kandang) newError(404, 'Kandang tidak ditemukan', 'createLepasSapih Service');

            // Update ternak to lepas sapih fase
            const updateTernak = await this.db.Ternak.update({
                id_fp: faseLepasSapih.dataValues.id_fp,
                id_kandang: value.id_kandang
            }, {
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }, 
                transaction: t
            });
            if(updateTernak[0] <= 0) newError(400, 'Gagal mengupdate fase ternak', 'createLepasSapih Service');

            // Create riwayat lepas sapih
            const createRiwayatLepasSapih = await this.db.RiwayatLepasSapih.create({
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak,
                tanggal_lepas_sapih: value.tanggal_lepas_sapih || new Date(),
                kode_kandang: kandang.dataValues.kode_kandang
            }, {transaction: t});
            if(!createRiwayatLepasSapih) newError(400, 'Gagal manambahkan riwayat fase', 'createLepasSapih Service');

            // Create riwayat fase cempe
            const createRiwayatFase = await this.db.RiwayatFase.create({
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak,
                id_fp: faseLepasSapih.dataValues.id_fp,
                tanggal: value.tanggal_lepas_sapih || new Date()
            }, {transaction: t});
            if(!createRiwayatFase) newError(400, 'Gagal menambah riwayat fase', 'createLepasSapih Service');

            // Get data fase laktasi
            const faseLaktasi = await this.db.Fase.findOne({where: {fase: 'Laktasi'}});
            if(!faseLaktasi) newError(404, 'Data Fase Laktasi tidak ditemukan', 'createLepasSapih Service');

            // Get data fase waiting list perkawinan
            const faseWaitingListPerkawinan = await this.db.Fase.findOne({where: {fase: 'Waiting List Perkawinan'}});
            if(!faseWaitingListPerkawinan) newError(404, 'Data Fase Waiting List Perkawinan tidak ditemukan', 'createLepasSapih Service');

            // Check Indukan
            const indukan = await this.db.Ternak.findOne({
                where: {
                    id_ternak: ternak.dataValues.id_dam
                }
            });
            if(!indukan) newError(404, 'Indukan tidak ditemukan', 'createLepasSapih Service');

            // If Indukan in Laktasi fase, Move to Waiting List perkawinan
            if(indukan.dataValues.id_fp === faseLaktasi.dataValues.id_fp){
                // Update ternak to waiting list perkawinan fase
                const updateIndukan = await this.db.Ternak.update({
                    id_fp: faseWaitingListPerkawinan.dataValues.id_fp
                }, {
                    where: {
                        id_ternak: ternak.dataValues.id_dam,
                        id_peternakan: req.dataAuth.id_peternakan
                    }, 
                    transaction: t
                });
                if(updateIndukan[0] <= 0) newError(400, 'Gagal update fase ternak', 'createLepasSapih Service');

                // Create riwayat fase
                const createRiwayatFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: ternak.dataValues.id_dam,
                    id_fp: faseWaitingListPerkawinan.dataValues.id_fp,
                    tanggal: new Date()
                }, {transaction: t});
                if(!createRiwayatFase) newError(400, 'Gagal menambah riwayat fase', 'createLepasSapih Service');
            }
                
            // Commit transaction
            await t.commit();

            return {
                code: 201,
                data: {
                    id_ternak: value.id_ternak,
                    createdAt: createRiwayatFase.dataValues.createdAt
                }
            }
        }catch(error){
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Get lepas sapih
    getLepasSapih = async (req) => {
        try{
            // Get data fase lepas sapih
            const dataLepasSapih = await this.db.Fase.findOne({where: {fase: 'Lepas Sapih'}});
            if(!dataLepasSapih) newError(404, 'Data Fase Lepas Sapih tidak ditemukan', 'getLepasSapih Service');

            // Add params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            req.query.id_fp = dataLepasSapih.dataValues.id_fp;
            req.query.status_keluar = null;

            // Get ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                include: [
                    {
                        model: this.db.RiwayatFase,
                        as: 'riwayat_fase',
                        attributes: ['tanggal'],
                        where: {
                            id_fp: req.query.id_fp
                        },
                        required: false
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        required: false
                    }
                ],
                where: req.query,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            for(let i = 0; i < ternak.length; i++){
                ternak[i].dataValues.tanggal = ternak[i].dataValues.riwayat_fase.length > 0 ? ternak[i].dataValues.riwayat_fase[0].dataValues.tanggal : null;
                delete ternak[i].dataValues.riwayat_fase;
            }

            if(ternak.length <= 0) newError(404, 'Data Lepas Sapih tidak ditemukan', 'getLepasSapih Service');

            return {
                code: 200,
                data: {
                    total: ternak.length,
                    list: ternak
                }
            }
        }catch(error){
            return errorHandler(error);
        }
    }

    // Seleksi ternak lepas sapih
    seleksiLepasSapih = async (req) => {
        const t = await this.db.sequelize.transaction();
        try{
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                status: joi.string().required(),
            })
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'seleksiLepasSapih Service');

            // Check status
            if(value.status.toLowerCase() !== 'pejantan' && value.status.toLowerCase() !== 'indukan' && value.status.toLowerCase() !== 'bakalan') newError(400, 'Status harus pejantan, indukan, atau bakalan', 'seleksiLepasSapih Service');

            // Get data fase lepas sapih
            const dataLepasSapih = await this.db.Fase.findOne({where: {fase: 'Lepas Sapih'}});
            if(!dataLepasSapih) newError(404, 'Data Fase Lepas Sapih tidak ditemukan', 'seleksiLepasSapih Service');

            // Check ternak
            const ternak = await this.db.Ternak.findOne({
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!ternak) newError(404, 'Ternak tidak ditemukan', 'seleksiLepasSapih Service');
            if(ternak.dataValues.id_fp !== dataLepasSapih.dataValues.id_fp) newError(400, 'Ternak not in Lepas Sapih fase', 'seleksiLepasSapih Service');

            // Get data status
            const dataStatus = await this.db.StatusTernak.findOne({where: {status_ternak: value.status}});
            if(!dataStatus) newError(404, `Data Status ${value.status} tidak ditemukan`, 'seleksiLepasSapih Service');

            // // Get fase waiting list perkawinan
            // const faseWaitingListPerkawinan = await this.db.Fase.findOne({where: {fase: 'Waiting List Perkawinan'}});
            // if(!faseWaitingListPerkawinan) newError(404, 'Data Fase Waiting List Perkawinan tidak ditemukan', 'seleksiLepasSapih Service');

            // // Get fase perkawinan
            // const fasePerkawinan = await this.db.Fase.findOne({where: {fase: 'Perkawinan'}});
            // if(!fasePerkawinan) newError(404, 'Data Fase Perkawinan tidak ditemukan', 'seleksiLepasSapih Service');

            // Get data fase adaptasi 1
            const faseAdaptasi1 = await this.db.Fase.findOne({where: {fase: 'Adaptasi 1'}});
            if(!faseAdaptasi1) newError(404, 'Data Fase Adaptasi 1 tidak ditemukan', 'seleksiLepasSapih Service');

            // let faseSeleksi;
            // if(value.status.toLowerCase() === 'pejantan'){
            //     faseSeleksi = fasePerkawinan.dataValues.id_fp;
            // }else if(value.status.toLowerCase() === 'betina'){
            //     faseSeleksi = faseWaitingListPerkawinan.dataValues.id_fp;
            // }else if(value.status.toLowerCase() === 'bakalan'){
            //     faseSeleksi = null
            // }else{
            //     newError(400, 'Status must be pejantan, betina, or bakalan', 'seleksiLepasSapih Service');
            // }

            let faseSeleksi;
            if(value.status.toLowerCase() === 'pejantan' || value.status.toLowerCase() === 'indukan'){
                faseSeleksi = faseAdaptasi1.dataValues.id_fp;
            }else if(value.status.toLowerCase() === 'bakalan'){
                faseSeleksi = null
            }else{
                newError(400, 'Status harus pejantan, indukan, atau bakalan' , 'seleksiLepasSapih Service');
            }
            // Update status ternak
            const updateStatusTernak = await this.db.Ternak.update({
                id_status_ternak: dataStatus.dataValues.id_status_ternak,
                id_fp: faseSeleksi
            }, {
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                },
                transaction: t
            });
            if(updateStatusTernak[0] <= 0) newError(400, 'Gagal update status ternak', 'seleksiLepasSapih Service');

            // Create riwayat fase
            if(faseSeleksi){
                const createRiwayatFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak,
                    id_fp: faseSeleksi,
                    tanggal: new Date()
                }, {transaction: t});
                if(!createRiwayatFase) newError(400, 'Gagal menambah riwayat fase', 'seleksiLepasSapih Service');
            }

            // Commit
            await t.commit();

            return {
                code: 201,
                data: {
                    id_ternak: value.id_ternak,
                    status: value.status,
                    updatedAt: new Date()
                }
            }
        }catch(error){
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Get ternak lepas sapih for dashboard monitoring
    getLepasSapihDashboard = async (req) => {
        try{
            // Get data fase lepas sapih
            const dataLepasSapih = await this.db.Fase.findOne({where: {fase: 'Lepas Sapih'}});
            if(!dataLepasSapih) newError(404, 'Data Fase Lepas Sapih tidak ditemukan', 'getLepasSapihDashboard Service');

            // Get ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'jenis_kelamin', 'tanggal_lahir'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: dataLepasSapih.dataValues.id_fp
                },
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    },
                    {
                        model: this.db.Timbangan,
                        as: 'timbangan',
                        attributes: ['berat', 'suhu']
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            let totalBetina = 0;
            let totalJantan = 0;
            let totalByKandang = {};
            for(let i = 0; i < ternak.length; i++){
                // Check total by jenis kelamin
                if(ternak[i].dataValues.jenis_kelamin.toLowerCase() === 'betina'){
                    totalBetina++;
                }else if(ternak[i].dataValues.jenis_kelamin.toLowerCase() === 'jantan'){
                    totalJantan++;
                }

                // count ternak by kandang
                if(ternak[i].dataValues.kandang){
                    if(totalByKandang[ternak[i].dataValues.kandang.dataValues.kode_kandang]){
                        totalByKandang[ternak[i].dataValues.kandang.dataValues.kode_kandang] += 1
                    }else{
                        totalByKandang[ternak[i].dataValues.kandang.dataValues.kode_kandang] = 1
                    }
                }

                const umurHari = ternak[i].dataValues.tanggal_lahir ? Math.round((new Date() - new Date(ternak[i].dataValues.tanggal_lahir)) / (1000 * 60 * 60 * 24)) : 0;
                ternak[i].dataValues.umur = `${Math.floor(umurHari / 30)} bulan ${umurHari % 30} hari`;
                delete ternak[i].dataValues.tanggal_lahir;

                ternak[i].dataValues.berat = ternak[i].dataValues.timbangan.length > 0 ? ternak[i].dataValues.timbangan[ternak[i].dataValues.timbangan.length - 1].dataValues.berat : null;
                ternak[i].dataValues.suhu = ternak[i].dataValues.timbangan.length > 0 ? ternak[i].dataValues.timbangan[ternak[i].dataValues.timbangan.length - 1].dataValues.suhu : null;
                delete ternak[i].dataValues.timbangan;
            }
            if(ternak.length <= 0) newError(404, 'Data Lepas Sapih tidak ditemukan', 'getLepasSapihDashboard Service');

            return {
                code: 200,
                data: {
                    kandang:{
                        total: Object.keys(totalByKandang).length,
                        list: totalByKandang
                    },
                    ternak:{
                        total_betina: totalBetina,
                        total_jantan: totalJantan,
                        total: ternak.length,
                        list: ternak
                    }
                }
            }
        }catch(error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _lepasSapih(db);
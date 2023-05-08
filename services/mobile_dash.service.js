const {Op} = require('sequelize');
const {newError, errorHandler} = require('../utils/errorHandler');

class _mobileDash{
    constructor(db){
        this.db = db;
    }
    /// Get Data total ternak
    getTotalTernak = async (req) => {
        try{
            // Get id fase pemasukan
            const idFasePemasukan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Pemasukan'
                }
            });
            if(!idFasePemasukan) newError(404, 'Fase Pemasukan tidak ditemukan');

            // Get total ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'jenis_kelamin'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: {
                        [Op.not] : idFasePemasukan.dataValues.id_fp,
                        [Op.not] : null
                    },
                    id_status_ternak: {
                        [Op.not]: null
                    },
                    jenis_kelamin: {
                        [Op.not]: null
                    },
                    status_keluar: null
                }
            });
            const totalTernak = ternak.length;

            // Get total kandang
            const totalKandang = await this.db.Kandang.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });

            // Get total ternak sakit
            const ternakSakit = await this.db.Kesehatan.count({
                attributes: [
                    [this.db.sequelize.fn('DISTINCT', this.db.sequelize.col('id_ternak')), 'id_ternak']
                ],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });

            // Get total ternak sehat
            const totalTernakSehat = totalTernak - ternakSakit;

            // Get total jantan and betina
            let totalJantan = 0;
            let totalBetina = 0;
            for(let i = 0; i < ternak.length; i++){
                if(ternak[i].dataValues.jenis_kelamin.toLowerCase() === 'jantan'){
                    totalJantan++;
                }else if(ternak[i].dataValues.jenis_kelamin.toLowerCase() === 'betina')
                    totalBetina++;
            }


            return {
                code: 200,
                data: {
                    total_ternak: totalTernak,
                    total_ternak_jantan: totalJantan,
                    total_ternak_betina: totalBetina,
                    total_kandang: totalKandang,
                    total_ternak_sakit: ternakSakit,
                    total_ternak_sehat: totalTernakSehat
                }
            }
        }catch(error){
            return errorHandler(error);
        }
    }

    /// Get Data total ternak by status
    getTotalTernakByStatus = async (req) => {
        try{
            // Get status id cempe
            const statusCempe = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Cempe'
                }
            });
            if(!statusCempe) newError(404, 'Status Cempe tidak ditemukan');

            // Get status id pejantan
            const statusPejantan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Pejantan'
                }
            });
            if(!statusPejantan) newError(404, 'Status Pejantan tidak ditemukan');

            // Get status id indukan
            const statusIndukan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Indukan'
                }
            });
            if(!statusIndukan) newError(404, 'Status Indukan tidak ditemukan');

            // Get total ternak pejantan
            const totalTernakPejantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusPejantan.dataValues.id_status_ternak,
                    jenis_kelamin: "Jantan",
                    status_keluar: null
                }
            });

            // Get total ternak jantan
            const totalTernakJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: {
                        [Op.not]: null
                    },
                    jenis_kelamin: 'Jantan',
                    status_keluar: null
                }
            });

            // Get total ternak indukan
            const totalTernakIndukan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusIndukan.dataValues.id_status_ternak,
                    jenis_kelamin: "Betina",
                    status_keluar: null
                }
            });

            // Get total ternak betina
            const totalTernakBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: {
                        [Op.not]: null
                    },
                    jenis_kelamin: 'Betina',
                    status_keluar: null
                }
            });

            // Get total ternak cempe jantan
            const totalTernakCempeJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'Jantan',
                    status_keluar: null
                }
            });

            // Get total ternak cempe betina
            const totalTernakCempeBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'Betina',
                    status_keluar: null
                }
            });

            // Get data fase kebuntingan
            const idFaseKebuntingan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Kebuntingan'
                }
            });
            if(!idFaseKebuntingan) newError(404, 'Fase Kebuntingan tidak ditemukan');

            // Get total ternak kebuntingan
            const totalTernakKebuntingan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: idFaseKebuntingan.dataValues.id_fp,
                    status_keluar: null
                }
            });

            // Get data fase laktasi
            const idFaseLaktasi = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Laktasi'
                }
            });
            if(!idFaseLaktasi) newError(404, 'Fase Laktasi tidak ditemukan');

            // Get total ternak laktasi
            const totalTernakLaktasi = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: idFaseLaktasi.dataValues.id_fp,
                    status_keluar: null
                }
            });

            return {
                code: 200,
                data: {
                    total_ternak: totalTernakJantan + totalTernakBetina,
                    total_ternak_pejantan: totalTernakPejantan,
                    total_ternak_jantan: totalTernakJantan,
                    total_ternak_indukan: totalTernakIndukan,
                    total_ternak_betina: totalTernakBetina,
                    total_ternak_cempe_jantan: totalTernakCempeJantan,
                    total_ternak_cempe_betina: totalTernakCempeBetina,
                    total_ternak_kebuntingan: totalTernakKebuntingan,
                    total_ternak_laktasi: totalTernakLaktasi
                }
            }
        }catch(error){
            return errorHandler(error);
        }
    }

    /// Get total ternak by fase
    getTotalTernakByFase = async (req) => {
        try{
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'id_fp'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null,
                    id_fp: {
                        [Op.not]: null
                    }
                }
            });

            // Get data fase
            const fase = await this.db.Fase.findAll({
                attributes: ['id_fp', 'fase']
            });
            if(!fase) newError(404, 'Fase tidak ditemukan');

            // Create Object Fase
            let list = {};
            for(let i = 0; i < fase.length; i++){
                if(fase[i].dataValues.fase.toLowerCase().startsWith('adaptasi')){
                    list['adaptasi'] = 0;
                }else if(fase[i].dataValues.fase.toLowerCase() == 'waiting list perkawinan'){
                    continue;
                }else if(fase[i].dataValues.fase.toLowerCase() == 'kelahiran' || fase[i].dataValues.fase.toLowerCase() == 'laktasi'){
                    list['kelahiran/laktasi'] = 0;
                }else{
                    list[fase[i].dataValues.fase.toLowerCase()] = 0;
                }
            }

            // Count ternak by fase
            for(let i = 0; i < ternak.length; i++){
                if(ternak[i].dataValues.fase.dataValues.fase.toLowerCase().startsWith('adaptasi')){
                    list['adaptasi']++;
                }else if(ternak[i].dataValues.fase.dataValues.fase.toLowerCase() == 'waiting list perkawinan'){
                    continue;
                }else if(ternak[i].dataValues.fase.dataValues.fase.toLowerCase() == 'kelahiran' || ternak[i].dataValues.fase.dataValues.fase.toLowerCase() == 'laktasi'){
                    list['kelahiran/laktasi']++;
                }else{
                    list[ternak[i].dataValues.fase.dataValues.fase.toLowerCase()]++;
                }
            }

            return {
                code: 200,
                data: list
            }
        }catch(error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _mobileDash(db);
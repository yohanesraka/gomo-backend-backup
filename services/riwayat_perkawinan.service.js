const { newError, errorHandler } = require('../utils/errorHandler');

class _riwayatPerkawinan {
    constructor(db) {
        this.db = db;
    }
    // Get riwayat perkawinan
    getRiwayatPerkawinan = async (req) => {
        try {
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            req.query.usg = 2
            // Get data riwayat perkawinan
            const list = await this.db.RiwayatPerkawinan.findAll({
                attributes: ['id_riwayat_perkawinan', 'id_indukan', 'id_pejantan', 'id_kandang', 'status', 'tanggal_perkawinan'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    },
                    // {
                    //     model: this.db.RiwayatKebuntingan,
                    //     as: 'riwayat_kebuntingan',
                    //     attributes: ['status'],
                    // }
                ],
                where: req.query,
            });

            // Get data ternak
            const ternak = await this.db.Ternak.findAll({where: {id_peternakan: req.dataAuth.id_peternakan}})
            for(let i = 0; i < list.length; i++) {
                list[i].dataValues.id_cempe = ternak.filter(ternak => ternak.dataValues.id_sire === list[i].dataValues.id_pejantan && ternak.dataValues.id_dam === list[i].dataValues.id_indukan).map(ternak => ternak.dataValues.id_ternak);
            }

            if(list.length <= 0) newError(404, 'Data Riwayat Perkawinan tidak ditemukan', 'getRiwayatPerkawinan Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                },
            };
        } catch (error) {
            return errorHandler(error);
        }
    }
}


module.exports = (db) => new _riwayatPerkawinan(db);
const { newError, errorHandler } = require('../utils/errorHandler');

class _riwayatLepasSapih {
    constructor(db) {
        this.db = db;
    }
    // Get riwayat lepas sapih
    getRiwayatLepasSapih = async (req) => {
        try {
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Get data riwayat lepas sapih
            const list = await this.db.RiwayatLepasSapih.findAll({ 
                attributes: ['id_riwayat_lepas_sapih', 'id_ternak', 'tanggal_lepas_sapih', 'kode_kandang'],
                where: req.query 
            });
            if (list.length <= 0) newError(404, 'Data Riwayat Lepas Sapih tidak ditemukan', 'getRiwayatLepasSapih Service');

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


module.exports = (db) => new _riwayatLepasSapih(db);
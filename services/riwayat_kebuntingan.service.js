const { newError, errorHandler } = require('../utils/errorHandler');

class _riwayatKebuntingan {
    constructor(db) {
        this.db = db;
    }
    // Get riwayat kebuntingan
    getRiwayatKebuntingan = async (req) => {
        try {
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Get data riwayat kebuntingan
            const list = await this.db.RiwayatKebuntingan.findAll({ 
                attributes: ['id_riwayat_kebuntingan', 'id_indukan', 'id_pejantan', 'status', 'tanggal_perkawinan', 'tanggal_kebuntingan'],
                where: req.query 
            });
            if (list.length <= 0) newError(404, 'Data Riwayat Kebuntingan tidak ditemukan', 'getRiwayatKebuntingan Service');

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


module.exports = (db) => new _riwayatKebuntingan(db);
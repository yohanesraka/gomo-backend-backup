const { newError, errorHandler } = require('../utils/errorHandler');

class _riwayatKelahiran {
    constructor(db) {
        this.db = db;
    }
    // Get LK Pemasukan
    getRiwayatKelahiran = async (req) => {
        try{
            // Add id_user to params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const RiwayatKelahiran = await this.db.RiwayatKelahiran.findAll({
                attributes: [
                    'id_kelahiran',
                    'id_ternak',
                    'tanggal_masuk',
                    'tanggal_lahir',
                    'id_sire',
                    'id_dam',
                    'jenis_kelamin',
                    'bangsa',
                    'kode_kandang'
                ],
                where: req.query,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(RiwayatKelahiran.length <= 0) newError(404, 'Data Riwayat Kelahiran tidak ditemukan', 'getRiwayatKelahiran Service');

            return {
                code: 200,
                data: {
                    total: RiwayatKelahiran.length,
                    list: RiwayatKelahiran
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Get LK Pemasukan by this Month
    // getRiwayatKelahiranThisMonth = async (req) => {
    //     try{
    //         // Add id_peternakan to params
    //         req.query.id_peternakan = req.dataAuth.id_peternakan;
    //         // Query Data
    //         const RiwayatKelahiran = await this.db.RiwayatKelahiran.findAll({
    //             attributes: [
    //                 'id_kelahiran',
    //                 'id_ternak',
    //                 'tanggal_masuk',
    //                 'tanggal_lahir',
    //                 'id_sire',
    //                 'id_dam',
    //                 'jenis_kelamin',
    //                 'bangsa',
    //                 'kode_kandang'
    //             ],
    //             where: req.query,
    //             order: [
    //                 ['createdAt', 'DESC']
    //             ]
    //         });
    //         if(RiwayatKelahiran.length <= 0) newError(404, 'Data Riwayat Kelahiran not found', 'getRiwayatKelahiranThisMonth Service');

    //         // Filter by this month
    //         const thisDate = new Date();
    //         const monthYear = thisDate.getMonth() + '-' + thisDate.getFullYear();
    //         const filtered = RiwayatKelahiran.filter((item) => {
    //             return item.dataValues.tanggal_lahir.getMonth() + '-' + item.dataValues.tanggal_lahir.getFullYear() === monthYear;
    //         });

    //         let totalByKandang = {}

    //         for(let i = 0; i < filtered.length; i++){
    //             if(filtered[i].dataValues.kode_kandang != null){
    //                 totalByKandang[filtered[i].dataValues.kode_kandang] ? totalByKandang[filtered[i].dataValues.kode_kandang]++ : totalByKandang[filtered[i].dataValues.kode_kandang] = 1;
    //             }
    //         }

    //         const ternakBetina = filtered.filter((item) => item.dataValues.jenis_kelamin != null && item.dataValues.jenis_kelamin.toLowerCase() == 'betina');
    //         const ternakJantan = filtered.filter((item) => item.dataValues.jenis_kelamin != null && item.dataValues.jenis_kelamin.toLowerCase() == 'jantan');

    //         return {
    //             code: 200,
    //             data: {
    //                 total: filtered.length,
    //                 total_betina: ternakBetina.length,
    //                 total_jantan: ternakJantan.length,
    //                 total_by_kandang: totalByKandang,
    //                 list: filtered
    //             }
    //         };
    //     }catch (error){
    //         return errorHandler(error);
    //     }
    // }
}


module.exports = (db) => new _riwayatKelahiran(db);
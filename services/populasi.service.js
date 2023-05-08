// Helper databse yang dibuat
const { Op } = require("sequelize");
 
class _populasi{
    constructor(db){
        this.db = db;
    }
    // Get data populasi
    getPopulasi = async (req) => {
        try {
            const thisYear = new Date().getFullYear();
            let data = {};
            for(let i = 1; i <= 12; i++){
                data[`${thisYear}-${i}`] = {
                    masuk: 0,
                    keluar: 0,
                    populasi: 0
                }
            }
            for(let i = 1; i <= 12; i++){
                data[`${thisYear}-${i}`].masuk = await this.db.Ternak.count({
                    attributes: ['tanggal_masuk'],
                    where: {
                        tanggal_masuk: {
                            [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
                        },
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                data[`${thisYear}-${i}`].keluar = await this.db.Ternak.count({
                    where: {
                        tanggal_keluar: {
                            [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
                        },
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                data[`${thisYear}-${i}`].populasi = (data[`${thisYear}-${i}`].masuk - data[`${thisYear}-${i}`].keluar) + (data[`${thisYear}-${i-1}`] ? data[`${thisYear}-${i-1}`].populasi : 0);
            }
            return{
                code: 200,
                data: {
                    total: Object.keys(data).length,
                    list: Object.keys(data).length > 0 ? data : null
                }
            }

        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _populasi(db);
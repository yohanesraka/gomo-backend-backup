// Riwayat Fase Service
module.exports = async (db, req, dataTernak) => {
    // Create riwayat fase
    const riwayatFase = await db.RiwayatFase.create({
        id_ternak: dataTernak.id_ternak,
        id_fp: dataTernak.id_fp,
        id_peternakan: req.dataAuth ? req.dataAuth.id_peternakan : dataTernak.id_peternakan,
        tanggal: new Date()
    });
    if(!riwayatFase){
        return false
    }
    return true
}
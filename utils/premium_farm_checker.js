const config = require('../config/app.config');

module.exports =  async (db, req) => {
    // Check is premium farm
    if(req.dataAuth && !req.dataAuth.is_premium_farm){
        // Check ternak count
        const ternakCount = await db.Ternak.count({where: {id_peternakan: req.dataAuth.id_peternakan}});
        if(ternakCount >= config.premiumFarm.limitTernak) {
            return {error: `Max ternak is ${config.premiumFarm.limitTernak}, please upgrade your account to premium`}
        }
    } 
    return {error: null}
}
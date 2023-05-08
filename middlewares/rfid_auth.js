const config = require('../config/app.config')
const jwt = require('jsonwebtoken')
const { log_error} = require('../utils/logging');
const db = require('../models');
const response = require('../utils/response');

const rfidAuth = async (req, res, next) => {
    // Check token in header
    let token
    if (req.body.token) {
      try {

        // Set token from Bearer token in header
        token = req.body.token

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret)

        const dataPeternakan = await db.Peternakan.findOne({where : {id_peternakan: decoded.id_peternakan}});
        if (!dataPeternakan || dataPeternakan.dataValues.token != token) {
          response.sendResponse(res, {code: 401, error: 'Invalid token'})
          return
        }

        // Set user to request
        req.dataAuth = {
          id_peternakan: decoded.id_peternakan,
          is_premium_farm: dataPeternakan.dataValues.subscribe ? true : false,
          iat: decoded.iat,
          exp: decoded.exp
        }
        
        next()
        return
      } catch (error) {
        log_error('Authentication Middleware', error)
        response.sendResponse(res, {code: 401, error})
        return
      }
    }
  
    if (!token) {
      response.sendResponse(res, {code: 401, error: 'Not authorized, no token'})
      return
    }
}

module.exports = rfidAuth
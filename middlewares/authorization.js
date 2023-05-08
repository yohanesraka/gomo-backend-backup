const db = require('../models');
const { log_info } = require('../utils/logging');
const response = require('../utils/response');

const bodMiddleware = async (req, res, next) => {
    if(req.dataAuth.role == 'bod' || req.dataAuth.role == 'superadmin'){
        next()
    }else{
        response.sendResponse(res, {code: 401, error: 'Not authorized, You are not BOD or Superadmin'})
    }
    return
}

const superAdminMiddleware = async (req, res, next) => {
    if(req.dataAuth.role == 'superadmin'){
        next();
    }else{
        response.sendResponse(res, {code: 401, error: 'Not authorized, you are not superadmin'})
    }
    return
};

const adminMiddleware = async (req, res, next) => {
    if(req.dataAuth.role == 'admin' || req.dataAuth.role == 'superadmin' || req.dataAuth.role == 'bod'){
        next();
    }else if(req.dataAuth.role == 'user'){
        response.sendResponse(res, {code: 401, error: 'Not authorized, you are not admin. Please contact your superadmin'})
    }else{
        response.sendResponse(res, {code: 401, error: 'Not authorized, Role not found'})
    }
    return
};


module.exports = {
    bodMiddleware,
    superAdminMiddleware,
    adminMiddleware
}
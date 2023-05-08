const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/app.config')

const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {algorithm: "HS256", expiresIn: config.jwt.expiresIn });
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}


module.exports = {generateToken, hashPassword, comparePassword};
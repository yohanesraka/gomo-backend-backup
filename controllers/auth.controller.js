const { Router } = require('express');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {adminMiddleware, superAdminMiddleware} = require('../middlewares/authorization');
const authService = require('../services/auth.service');
const { auth } = require('../config/app.config');
const upload = require('../utils/upload');

const authController = (db) =>{
    const s$auth = authService(db);
    const AuthController = Router();

    /**
     * Login
     * @param {string} username
     * @param {string} password
     */

    AuthController.post('/login', async (req, res, next) => {
        req.cookies = req.headers.cookie;
        const login = await s$auth.login(req.body);
        response.sendResponse(res, login);
    });

    /**
     * Register
     *
     * @param {string} username
     * @param {string} email
     * @param {string} no_hp
     * @param {string} alamat
     * @param {string} password
     * @param {string} repeat_password
     */

    AuthController.post('/register', async (req, res, next) => {
        const register = await s$auth.register(req.body);
        response.sendResponse(res, register);
    });

    /**
     * Logout
     */

    AuthController.post('/logout', authentication, async (req, res, next) => {
        const logout = await s$auth.logout(req, res);
        response.sendResponse(res, logout);
    });

    /**
     * Get Profile
     */
    AuthController.get('/profile', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$auth.getProfile(req);
        response.sendResponse(res, detail);
    });

    /**
     * Upload photo profile
     */
    AuthController.post('/photo-profile', authentication, adminMiddleware, upload.single('avatar'), async (req, res, next) => {
        const detail = await s$auth.uploadImage(req, res, next);
        response.sendResponse(res, detail);
    });

    /**
     * Delete photo profile
     */
    AuthController.delete('/photo-profile', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$auth.deleteImage(req, res, next);
        response.sendResponse(res, detail);
    });

    // /**
    //  * Upload photo profile
    //  */
    // AuthController.post('/photo-profile', authentication, adminMiddleware, async (req, res, next) => {
    //     const detail = await s$auth.uploadImage(req, res, next);
    //     response.sendResponse(res, detail);
    // });

    /**
     * Delete Account
     * @param {string} password
     */

    AuthController.delete('/delete-account', authentication, adminMiddleware, async (req, res, next) => {
        const deleteAccount = await s$auth.deleteAccount(req);
        response.sendResponse(res, deleteAccount);
    });

    /**
     * Update Account
     * @param {string} nama_lengkap
     * @param {string} username
     * @param {string} email
     * @param {string} no_hp
     * @param {string} alamat
     */

    AuthController.put('/update-account', authentication, adminMiddleware, async (req, res, next) => {
        const updateAccount = await s$auth.updateAccount(req);
        response.sendResponse(res, updateAccount);
    });

    /**
     * Update Password
     * @param {string} password
     * @param {string} new_password
     */

    AuthController.put('/update-password', authentication, adminMiddleware, async (req, res, next) => {
        const updatePassword = await s$auth.updatePassword(req);
        response.sendResponse(res, updatePassword);
    });

    /**
     * Verify
     * @param {string} token
     */
    AuthController.post('/verify', authentication, async (req, res, next) => {
        const verify = await s$auth.verify(req);
        response.sendResponse(res, verify);
    });

    /**
     * Forgot Password
     * @param {string} email
     */
    AuthController.post('/forgot-password', async (req, res, next) => {
        const forgotPassword = await s$auth.forgotPassword(req);
        response.sendResponse(res, forgotPassword);
    });

    /**
     * Activate Account
     */
    AuthController.get('/verify-account', async (req, res, next) => {
        const activateAccount = await s$auth.verifyAccount(req.query.token);
        response.sendResponse(res, activateAccount);
        res.redirect(auth.url_redirect_verify);
    });

    /**
     * Register BOD account
     * @param {string} email
     */
    AuthController.post('/register-bod', authentication, adminMiddleware, async (req, res, next) => {
        const registerBod = await s$auth.registerBod(req);
        response.sendResponse(res, registerBod);
    });

    return AuthController;
}

module.exports = authController;
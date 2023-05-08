const { Router } = require('express');

const loggingController = (db) => {
    const LoggingController = Router();

    /**
     * Get all logs error   
     */
    LoggingController.get('/', async (req, res, next) => {
        res.download('./error.log');
    });

    return LoggingController;
}

module.exports = loggingController;
const fs = require('fs');
const { log_error } = require('./logging');

// Error Model
const newError = (statusCode, message, tag) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.tag = tag;
    throw error;
};

// Error Handler
const errorHandler = (error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const tag = error.tag || 'Unknown';

    // Create log
    fs.appendFile('error.log', `${new Date()} - ${statusCode} - ${`[${tag}]`} ${message} \r ${error.stack} \r`, (err) => {
        if (err) throw err;
    });
    
    log_error(tag, `${error.stack}`);
    return {
        code: statusCode,
        error: message
    };
}

module.exports = {
    newError,
    errorHandler
};
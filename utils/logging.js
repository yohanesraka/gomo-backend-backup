const chalk = require('chalk');

const log_error = (tag, err) => {
    console.log(`${new Date()}`,chalk.green(`[${tag}]`) ,chalk.red(`ERROR: ${err}.`))
}

const log_info = (tag, info) => {
    console.log(`${new Date()}`,chalk.green(`[${tag}]`) ,chalk.blue(`INFO: ${info}.`))
}

const log_success = (tag, info) => {
    console.log(`${new Date()}`,chalk.green(`[${tag}]`) ,chalk.green(`INFO: ${info}.`))
}

const log_warning = (tag, info) => {
    console.log(`${new Date()}`,chalk.green(`[${tag}]`) ,chalk.yellow(`WARN: ${info}.`))
}

module.exports = {log_error, log_info, log_success, log_warning}
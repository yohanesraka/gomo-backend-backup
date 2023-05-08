const express = require('express');
const cors = require('cors');
const route = require('./routes/route');
const app = express();
const db = require('./models');
const {log_info} = require('./utils/logging');
const ci_cd = require('./utils/ci_cd');
const cookieParser = require('cookie-parser');
require('dotenv').config();

global.__basedir = __dirname;
const port = process.env.APP_PORT || 51001;

// Handler Cors
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/avatar', express.static(__basedir + '/public/static/images')); 
// app.use('/images', express.static('uploads'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routing
route(app, db);

// CI/CD
ci_cd(app);

app.listen(port, () => {
    log_info('app',`Server running on port ${port}`);
    }
);
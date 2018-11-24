'use strict';
const dotenv = require('dotenv');
// Making sure the .env is loaded
dotenv.config();

// Requiring my other dependencies
const fs = require('fs');
const path = require('path');
const debug = require('debug');
const jagql = require('@jagql/framework');
const cors = require('cors');
const oauthserver = require('express-oauth-server');
const memorystore = require('./oauth2/authModel.js');

// This is a library used to help parse the body of the api requests.
const bodyParser = require('body-parser');
const settings = require("./settings.js")({ model: memorystore });

var app = jagql.getExpressServer();

// set the bodyParser to parse the urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS for everything
var corsMechanism = cors(settings.corsOptions);
//app.options('*', corsMechanism);
//app.use(corsMechanism);

app.oauth = new oauthserver(settings.oauth2ServerOptions);

app.all('/token', app.oauth.token());

function selectivelyApply(fn) {
    return (req, res, next) => {
        if (req.path === '/swagger.json' ||
            req.path === '/favicon.ico' ||
            req.path === '/') {
            next();
        } else {
            fn(req, res, next);
        }
    }
}
app.all('*', selectivelyApply(app.oauth.authenticate()));

jagql.setConfig(settings.jagqlOptions);

jagql.authenticate((request, callback) => {
    // If a "blockMe" header is provided, block access.
    if (request.headers.blockme) return callback(new Error('Fail'));

    // If a "blockMe" cookie is provided, block access.
    if (request.cookies.blockMe) return callback(new Error('Fail'));

    return callback();
});

var sqlConfig = settings.jagqlHandlerOptions;

// Reading all resources
fs.readdirSync(path.join(__dirname, '/resources')).filter(
    filename => /^[a-z].*\.js$/.test(filename)).map(
        filename => path.join(__dirname, '/resources/', filename)).forEach((resourcePath) => {
            require(resourcePath)(jagql, sqlConfig);
        });

jagql.onUncaughtException((request, error) => {
    const errorDetails = error.stack.split('\n');
    //console.error(JSON.stringify({
    console.error({
        request,
        error: errorDetails.shift(),
        stack: errorDetails
    });
    //console.error({request, error: error});
});

// Some debugging
jagql.metrics.on('data', data => {
    if (process.env.DEBUG == true) {
        debug('metrics')(data);
    }
});

// Start the JAGQL server at the very end
jagql.start();
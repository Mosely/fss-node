'use strict';
// Requiring my dependencies
const fs = require('fs');
const path = require('path');
const debug = require('debug');
const dotenv = require('dotenv');
const jagql = require('@jagql/framework');
const cors = require('cors');

// Making sure the .env is loaded
dotenv.config();

//Enabling CORS for everything
var whitelist = [
    'http://nginx3.pantheon.local',
    'http://nginx3.pantheon.local:4202',
    'http://node1.pantheon.local:9999'
];
//var whitelist = ['*'];
var corsOptions = {
    origin: function (origin, callback) {
        // The following line should allow for same-origin bypass
        if (!origin) return callback(null, true);

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
var corsMechanism = cors(corsOptions);
var app = jagql.getExpressServer();
app.options('*', corsMechanism);
app.use(corsMechanism);

// Create configuration for server
jagql.setConfig({
    port: process.env.PORT,
    graphiql: process.env.ENABLE_GRAPHQL,
    swagger: {
        title: 'FSS-Node',
        version: '1.0.0',
        description: 'NodeJS variant of the FSS Backend.',
        license: {
            name: 'MIT',
            url: 'http://opensource.org/licenses/MIT'
        }
    },
    protocol: process.env.HTTP_PROTOCOL,
    hostname: process.env.HOST,
    base: '',
});

jagql.authenticate((request, callback) => {
    // If a "blockMe" header is provided, block access.
    if (request.headers.blockme) return callback(new Error('Fail'));

    // If a "blockMe" cookie is provided, block access.
    if (request.cookies.blockMe) return callback(new Error('Fail'));

    return callback();
});

var sqlConfig = {
    dialect: process.env.DB_DRIVER,
    dialectOptions: {
        supportBigNumbers: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: console.log
};

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
});

// Some debugging
jagql.metrics.on('data', data => {
    if (process.env.DEBUG == true) {
        debug('metrics')(data);
    }
});

// Start the JAGQL server at the very end
jagql.start();
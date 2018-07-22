'use strict';
// Requiring my dependencies
const server = module.exports = {};

const fs = require('fs');
const path = require('path');
const debug = require('debug');
const dotenv = require('dotenv');
const jagql = require('@jagql/framework');
const RelationalDbStore = require("jsonapi-store-relationaldb");

// Exposing some modules
server.start = jagql.start;
server.close = jagql.close;
server.getExpressServer = jagql.getExpressServer;
server.getRelationalDbStore = ((storeConfigObject) => {
    return new RelationalDbStore(storeConfigObject);
});

// Making sure the .env is loaded
dotenv.config();

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

// Reading all resources
fs.readdirSync(path.join(__dirname, '/resources')).filter(
    filename => /^[a-z].*\.js$/.test(filename)).map(
        filename => path.join(__dirname, '/resources/', filename)).forEach(require);

jagql.onUncaughtException((request, error) => {
    const errorDetails = error.stack.split('\n');
    console.error(JSON.stringify({
        request,
        error: errorDetails.shift(),
        stack: errorDetails
    }));
});

// Some debugging
jagql.metrics.on('data', data => {
    if (process.env.DEBUG == true) {
        debug('metrics')(data);
    }
});

// Start the JAGQL server at the very end
server.start();
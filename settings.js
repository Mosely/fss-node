module.exports = function (neededDependencies) {
    let options = {
        corsWhitelist: [
            'http://nginx3.pantheon.local',
            'http://nginx3.pantheon.local:4202',
            'http://node1.pantheon.local:9999'
        ],
        corsOptions: {
            origin: function (origin, callback) {
                // The following line should allow for same-origin bypass
                if (!origin) return callback(null, true);

                if (corsWhitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        },
        oauth2ServerOptions: {
            model: neededDependencies.model, //probably should set this in server.js
            alwaysIssueNewRefreshToken: true,
            accessTokenLifetime: neededDependencies.model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS,   // expiry time in seconds, consistent with JWT setting in model.js
            refreshTokenLifetime: neededDependencies.model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS   // expiry time in seconds, consistent with JWT setting in model.js
        },
        jagqlOptions: {
            port: process.env.PORT,
            graphiql: process.env.ENABLE_GRAPHQL,
            swagger: {
                title: 'FSS-backend',
                version: '1.0.0',
                description: 'FSS backend.',
                license: {
                    name: 'MIT',
                    url: 'http://opensource.org/licenses/MIT'
                },
                fss_auth: {
                    type: 'oauth2',
                    flow: 'password',
                    tokenUrl: process.env.HTTP_PROTOCOL+'://'+process.env.HOST+':'+process.env.PORT+'/token',
                    scopes: {
                        read: 'Read only.', 
                        write: 'Read and write'
                    }
                },
                security: {
                    fss_auth: ['read', 'write']
                }
            },
            protocol: process.env.HTTP_PROTOCOL,
            hostname: process.env.HOST,
            base: ''
            //base: 'apiv1'
        },
        jagqlHandlerOptions: {
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
        }
    };
    return options;
};
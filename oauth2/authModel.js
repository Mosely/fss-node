const JWT = require('jsonwebtoken');

const JWT_ISSUER = 'fss';
const JWT_SECRET_FOR_ACCESS_TOKEN = 'changeThis';
const JWT_SECRET_FOR_REFRESH_TOKEN = 'youBetterChangeThis';

// the expiry times should be consistent between the oauth2-server settings
// and the JWT settings (not essential, but makes sense)
const JWT_ACCESS_TOKEN_EXPIRY_SECONDS = 3600;             // 60 minutes
const JWT_REFRESH_TOKEN_EXPIRY_SECONDS = 1209600;         // 14 days

// In-memory datastores
const oauthClients = [{
    clientId: 'thom',
    clientSecret: 'nightworld',
    redirectUri: ''
}];

// generateToken
// This generateToken implementation generates a token with JWT.
// the token output is the Base64 encoded string.
function generateToken(type, user, scope, client, callback) {
    console.log("Entering generateToken()");
    let token;
    let secret;
    let exp = new Date();
    let payload = {
        // public claims
        iss: JWT_ISSUER,   // issuer
        sub: user.id,      // the subject should be the id of the user
        aud: client.id,    // the id of the client that requested this JWT
        //    exp: exp,        // the expiry date is set below - expiry depends on type
        //    jti: '',         // unique id for this token - needed if we keep an store of issued tokens?
        // private claims
        scope: scope
    };
    let options = {
        algorithm: 'HS256'  // HMAC using SHA-256 hash algorithm
    };

    if (type === 'accessToken') {
        secret = JWT_SECRET_FOR_ACCESS_TOKEN;
        exp.setSeconds(exp.getSeconds() + JWT_ACCESS_TOKEN_EXPIRY_SECONDS);
    } else {
        secret = JWT_SECRET_FOR_REFRESH_TOKEN;
        exp.setSeconds(exp.getSeconds() + JWT_REFRESH_TOKEN_EXPIRY_SECONDS);
    }
    //payload.exp = Math.round(exp.getTime() / 1000);
    payload.exp = exp.getTime();
    token = JWT.sign(payload, secret);

    console.log("Leaving generateToken()");
    callback(null, token);
};

// getUserById
// Should get the user object based just on a given id value
function getUserById(id) {
    console.log("Entering getUserById()");
    // This is definitely a DB call.
    // Need to assemble a user object with id and scope.
    // Also, no callback because this is going to be synchronous.
    // Might reevaluate to use callback in the future.
    let user = {
        id: 1,
        scope: 'evreything'
    };

    // TODO: DB magic
    console.log("Leaving getUserById()");
    return user;
}

const model = {
    generateAccessToken: function (client, user, scope, callback) {
        console.log("Entering generateAccessToken()");
        let accessToken = '';
        scope = user.scope; // scope should always be determined from the backend, 
        // not provided by the frontend. Consider pulling from getUser() 
        // returned user object.
        console.log("Leaving generateAccessToken()");
        return generateToken('accessToken', user, scope, client, function (err, token) {
            accessToken = token;
            if (err !== null) {
                callback(err, null);
                //return null;
            } else {
                callback(null, accessToken);
                //return accessToken;
            }
        });
    },
    generateRefreshToken: function (client, user, scope, callback) {
        console.log("Entering generateRefreshToken()");
        let refreshToken = '';
        scope = user.scope; // scope should always be determined from the backend, 
        // not provided by the frontend. Consider pulling from getUser() 
        // returned user object.
        console.log("Leaving generateRefreshToken()");
        return generateToken('refreshToken', user, scope, client, function (err, token) {
            refreshToken = token;
            if (err !== null) {
                callback(err, null);
                //return null;
            } else {
                callback(null, refreshToken);
                //return refreshToken;
            }
        });
    },
    getAccessToken: function (accessToken, callback) {
        console.log("Entering getAccessToken()");
        // accessToken is probably the JWT already, so maybe just return that.
        // Pull info out of the JWT and construct a token object.
        console.log("Leaving getAccessToken()");
        return JWT.verify(accessToken, JWT_SECRET_FOR_ACCESS_TOKEN, function (err, decoded) {
            console.log(decoded);
            if (err !== null) {
                callback(err, null);   // the err contains JWT error data
                //return err;
            }

            // other verifications could be performed here
            // eg. that the jti is valid

            // we could pass the payload straight out we use an object with the
            // mandatory keys expected by oauth2-server, plus any other private
            // claims that are useful
            callback(null, {
            //return {
                //expires: new Date(decoded.exp),
                accessToken: accessToken,
                accessTokenExpiresAt: new Date(decoded.exp),
                scope: decoded.scope,
                client: { id: decoded.aud },
                user: getUserById(decoded.id)
                });
        });
    },
    getRefreshToken: function (refreshToken, callback) {
        console.log("Entering getRefreshToken()");
        // refreshToken is probably the JWT already, so maybe just return that
        // Pull info out of the JWT and construct a token object.
        console.log("Leaving getRefreshToken()");
        return JWT.verify(refreshToken, JWT_SECRET_FOR_REFRESH_TOKEN, function (err, decoded) {

            if (err !== null) {
                return callback(err, null);   // the err contains JWT error data
                //return err;
            }

            // other verifications could be performed here
            // eg. that the jti is valid

            // we could pass the payload straight out we use an object with the
            // mandatory keys expected by oauth2-server, plus any other private
            // claims that are useful
            return callback(null, {
            //return {
                //expires: new Date(decoded.exp),
                refreshToken: refreshToken,
                refreshTokenExpiresAt: new Date(decoded.exp),
                scope: decoded.scope,
                client: { id: decoded.aud },
                user: getUserById(decoded.id)
                });
        });
    },
    getClient: function (clientId, clientSecret, callback) {
        console.log("Entering getClient()");
        // TODO: not sure how I want to handle this, just yet.
        // maybe keep a reference of clients in the DB?
        // For testing, just return a client object based on given id.
        let client = {
            id: clientId,
            grants: ['password', 'refresh_token']
        };
        console.log("Leaving getClient()");
        callback(null, client);
        //console.log("Leaving getClient()");
        //return client;
    },
    getUser: function (username, password, callback) {
        console.log("Entering getUser()");
        // this is definitely a DB call.
        // Also, retrieve the user's scope here
        let user = {
            id: 1,
            scope: 'everything'
        };
        console.log("Leaving getUser()");
        callback(null, user);
        //console.log("Leaving getUser()");
        //return user;
    },
    saveToken: function (token, client, user, callback) {
        console.log("Entering saveToken()");
        // Don't save the JWTs, just pass through the modified token object
        token.client = client;
        token.user = user;
        console.log("Leaving saveToken()");
        callback(null, token);
        //console.log("Leaving saveToken()");
        //return token;
    },
    revokeToken: function (token, callback) {
        // Probably should just return true
        token = null;
        callback(null, true);
        //return true;
    },
    validateScope: function (user, client, scope, callback) {
        console.log("Entering validateScope() with scope of " + scope);
        // Don't trust scopes sent in by the clients.  Make sure
        // it's always set by the backend.  Just pull from backend
        // and check against passed scope.  Error out if they don't match.
        // The user object should have id, so you can call getUserById for a 
        // fresh scope
        user = getUserById(user.id);
        let freshScope = user.scope;

        //if (!(scope === '' || scope === null) &&
        //    !scope.split(' ').every(s => freshScope.indexOf(s) >= 0)) {
        //return false;
        //    callback(null, null);
        //} else {
            console.log("leaving validateScope()");
            //callback(null, scope);
            callback(null, "everything");
        //return scope;
        //}
        //console.log("leaving validateScope()");
        //return "everything";
    },
    verifyScope: function (accessToken, scope, callback) {
        console.log("Entering verifyScope()");
        // Pull scope from backend and see if it matches the one
        // in the token.  The token argument is actually a token object.
        // Probably should be able to call validateScope().
        // If scope = '', then pass in accessToken.scope
        let scopeToCheck = (scope === null || scope === '') ? accessToken.scope : scope;
        console.log("Leaving verifyScope()");
        return validateScope(
            accessToken.user, accessToken.client, 
            scopeToCheck, function(err, validatedScope) { 
                if(err !== null) {
                    callback(err, null);
                } else if(validatedScope !== null) {
                    callback(null, true);
               } else {
                    callback(null, false);
                }
        });
        //let isScopeValid = validateScope(accessToken.user, accessToken.client, scopeToCheck);
        //console.log("Leaving verifyScope()");
        //if (isScopeValid === false) {
        //    return false;
        //} else {
        //    return true;
        //}
    }
};
model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS = JWT_ACCESS_TOKEN_EXPIRY_SECONDS;   // expiry time in seconds, consistent with JWT setting in model.js
model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS = JWT_REFRESH_TOKEN_EXPIRY_SECONDS;   // expiry time in seconds, consistent with JWT setting in model.js
module.exports = model;


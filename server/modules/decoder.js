var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
        "project_id": process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
        "token_uri": process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL
    }),
    databaseURL: "https://travelogger-66f9b.firebaseio.com"
});

// Pull id_token off of request and verify it against firebase service account private_key; then add decodedToken
var tokenDecoder = function(req, res, next) {

    if (req.headers.id_token) {
        // console.log('\n\n\nreq.headers.id_token', req.headers.id_token, '\n\n\n');
        admin.auth().verifyIdToken(req.headers.id_token)
            .then(function(decodedToken) {
                // Add decodedToken to the request so that downstream processes can use it
                req.decodedToken = decodedToken;
                // console.log('decoder decoded token:', req.decodedToken);
                next();
            })
            .catch(function(error) {
                // If id_token isn't right, return forbidden error
                console.log('User token could not be verified', error);
                res.sendStatus(403);
            });
    } else {

        // console.log('Coming from the decoder:', req);
        res.sendStatus(403);
        // next();
    }
};

module.exports = {
    token: tokenDecoder
};

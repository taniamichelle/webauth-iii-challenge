const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) { //bring in secret from secrets file below
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) { //token expired or is invalid
                res.status(401).json({ error: 'You shall not pass!' });
            } else { //token is good
                req.user = { username: decodedToken.username };     //can add the username to req object. optional
                next();
            }
        })
    } else {
        res.status(400).json({ error: "No credentials provided." });
    }
};

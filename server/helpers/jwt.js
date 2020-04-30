const jwt = require('jsonwebtoken');
const SECRET = "hello world";

const generateToken = (payload, cb) => {
    jwt.sign(payload, SECRET, (err, token) => {
        if (err) {
            cb(err, null)
        }else {
            cb(null, token)
        }
    })
};

const verifyToken = (token, cb) => {
    jwt.verify(token,  SECRET, function(err, decoded) {
        if (err) {
            cb(err, null)
        }else {
            cb(null, decoded);
        }
    });
};

module.exports = {
    generateToken, 
    verifyToken
}
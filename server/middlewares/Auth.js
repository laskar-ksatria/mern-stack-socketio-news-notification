const { verifyToken } = require('../helpers/jwt');

const Auth = (req,res,next) => {
    if (req.headers.usertoken) {
        let token = req.headers.usertoken;
        verifyToken(token, (err, decoded) => {
            if (err) {
                res.status(500).json({message: 'Uppss, something wrong, please try again'})
            }else {
                req.decoded = decoded;
                next();
            }
        })
    }else {
        res.status(500).json({message: 'You must login first as user'})
    }
};

module.exports = { Auth }
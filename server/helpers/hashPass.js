const bcr = require('bcryptjs');

const hashPassword = (pass) => {
    console.log(pass)
    let salt = bcr.genSaltSync(10);
    return bcr.hashSync(pass, salt)
};

const checkPass = (password, hashPass, cb) => {
    return bcr.compare(password, hashPass, (err, res) => {
        if (err) {
            cb(err, null)
        }else {
            cb(null, res);
        }
    })
};

module.exports = {
    hashPassword,
    checkPass
}
const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/hashPass')

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Username cannot be empty']
    },
    password: {
        type: String,
        require: [true, 'Password cannot be empty']
    }
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}});


userSchema.pre('save', function(next) {
    console.log(this.password, 'This is password')
    let pass = this.password;
    this.password = hashPassword(pass);
    next();
})


const user = mongoose.model('User', userSchema);

module.exports = user;
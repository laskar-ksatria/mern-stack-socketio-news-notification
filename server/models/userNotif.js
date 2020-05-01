const mongoose = require('mongoose');

const userNotifSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    read_status: {
        type: Boolean,
        default: false,
    }
}, {versionKey: false, timestamps: {createdAt: 'createdAt'}});

module.exports = mongoose.model('UserNotif', userNotifSchema);
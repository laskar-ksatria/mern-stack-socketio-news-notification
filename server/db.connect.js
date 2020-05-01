const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost/mern-stack-socket2', {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Welcome to mongoDB`);
    });
};

module.exports = dbConnect;
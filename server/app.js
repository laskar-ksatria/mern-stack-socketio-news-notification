if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const Io = require('socket.io')(server);
const cors = require('cors');
const PORT = 3010 || process.env.PORT;

//app use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Mongo Connect;
require('./db.connect')();

//Use Socket
app.use((req,res,next) => {
    req.Io = Io;
    next();
});

//Main route
app.use(require('./routes'));

Io.on('connection', socket => {
    console.log('Io connect');
    
    socket.on('disconnect', () => console.log('Io disconnect'));
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));

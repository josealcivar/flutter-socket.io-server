const express = require('express');
const path = require('path');
require('dotenv').config();


// DB Config
 require('./config/mongoose').dbConnection();


//App de Express
const app = express();


// lectura y parse de body
app.use(express.json() );

//Node Server
const server = require('http').createServer(app);

// module.exports.io = require('socket.io')(server);


// require('./sockets/socket');

module.exports.io = require('socket.io')(server);


require('./sockets/socket-chat');

// Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// Mis rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log(`server run on port: ${process.env.PORT}`);
});
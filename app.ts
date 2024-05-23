import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
require('dotenv').config();
// require('dotenv').config({ path: '.env.production' });

var logger = require('morgan');
var path = require('path');
// const express = require('express')
const app = express()
// import { Server } from "socket.io";
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var net = require('net');
var cors = require('cors')


app.engine('html', require('ejs').renderFile);
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('title', 'Thynne');
// app.use(express.static(path.join(__dirname, './src')));
app.use(cookieParser())


app.use(require('./src/controller'));



app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    // console.error(err)
    res.send(err)
    // res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("success");
});


const Service = require('./src/service/router');
// app.use('/service', cors({
//     "origin": '*',
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,

//     "optionsSuccessStatus": 204
// }), require('./src/service/index'))
app.use(cors({
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,

    "optionsSuccessStatus": 204
}))





app.use('/service', cors({
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,

    "optionsSuccessStatus": 204
}), Service)

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let server_status = false








// function serverStart(port: number) {
//     if (!server_status) {
//         const server = app.listen(port, () => {
//             console.log(`application is running on port ${port}`);
//         }).on('listening', () => {
//             console.log('Server is now listening...');
//             server_status = true

//         }).on('error', (err) => {
//             console.error(`Error occurred while starting server: ${port}`);
//             const new_port = port + 1
//             rl.question(`\nUnable to use port ${port}, the program will try changing to Port ${new_port}.\nPlease [enter] for correct`, () => {

//                 serverStart(new_port);
//                 rl.close();

//             });

//         });

//         return server;
//     }
// }


// serverStart(Port);
// }
// if (!server_status) {
//     console.log("Hi")
//     const server = serverStart(Port)
//     const io = new Server(server);

//     io.sockets.on('connection', function (socket: any) {

//         console.log(`listening on *:${port}`);s
//     });


// }

app.use(require('./bin/midleware/error'));
module.exports = app;
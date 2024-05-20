// import express, { Express, Request, Response, NextFunction } from 'express'
var logger = require('morgan');
var path = require('path');
const express = require('express')
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
app.use(express.static(path.join(__dirname, './src')));
app.use(cookieParser())


// app.use('/service', cors({
//     "origin": '*',
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,

//     "optionsSuccessStatus": 204
// }), require('./src/service/index'))

app.get('/', (req: any, res: any) => {
    res.send("success")
});

app.use('/service', cors({
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,

    "optionsSuccessStatus": 204
}), require('./src/service/index'))

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
module.exports = app;
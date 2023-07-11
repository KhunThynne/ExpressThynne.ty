import express, { Express, Request, Response, NextFunction } from 'express'
var logger = require('morgan');
var path = require('path');
const app: Express = express()
import { Server } from "socket.io";
var cookieParser = require('cookie-parser');
var ErrorThynne = require('./midleware/ErrorThynne/index')
var cookieSession = require('cookie-session')
var net = require('net');
const port: any = process.env.PORT
var cors = require('cors')
app.engine('html', require('ejs').renderFile);
app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('title', 'Thynne');
app.use(express.static(path.join(__dirname, '../..', 'FrontEnd')));
app.use(cookieParser())
console.log(window.location.host)
app.use('/service', cors({
    "origin": *,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,

    "optionsSuccessStatus": 204
}), require('./service/index'))
app.get('*', (req, res) => {
    //res.cookie('rememberme', 'yes', { maxAge: 900000, httpOnly: false});
    res.sendFile(path.resolve(__dirname, '../..', 'FrontEnd', 'index.html'));
});

var server = app.listen(port, () => console.log(`Application is running on port ${port}`))
const io = new Server(server);
io.sockets.on('connection', function (socket: any) {
    console.log(`listening on *:${port}`);
});

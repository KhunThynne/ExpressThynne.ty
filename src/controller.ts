import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

import sqlmanage_pool from './router/SQL/lib/pooling_sql';

const controller = express.Router()


controller.get('/', (req: Request, res: Response, next: NextFunction) => {
    next()
})

const Login_api = require('./router/Login/router')
controller.use('/login', Login_api);


const SQL_Router = require('./router/SQL/router');

controller.use('/:database', (req, res, next) => {
    if (req.headers['secret-key'] === process.env.SECRET_KEY) return next()
    res.status(401).send("Unauthorized")

}, sqlmanage_pool, SQL_Router);  //Router


const SQL_Mock_Router = require('./router/SQL/mock/router'); //Router
controller.use('/:database/m', SQL_Mock_Router);
module.exports = controller
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

const controller = express.Router()

const SQL_Router = require('./router/SQL/router')



controller.use('/', (req: Request, res: Response, next: NextFunction) => {
    next()
})


controller.use('/database', SQL_Router);

module.exports = controller
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'



const controller = express.Router()

controller.use(require('./Users'))


module.exports = controller
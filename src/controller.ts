import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'



const controller = express.Router()


// controller.get('/', (req: Request, res: Response, next: NextFunction) => {
//     next()
// })

// const Login_api = require('./router/Login/router')
// controller.use('/login', Login_api);


// const SQL_Mock_Router = require('./router/SQL/mock/router'); //Router
// controller.use('/mork', SQL_Mock_Router);



// const SQL_Router = require('./router/SQL/router');
// controller.use('/:database', (req, res, next) => {
//     if (req.headers['secret-key'] === process.env.SECRET_KEY) return next()
//     res.sendStatus(401)
// }, sqlmanage_pool, SQL_Router, (req: any, res) => {
//     console.log(req.database)
//     if (req.database) return res.status(500).send("Something wrong there can't fulfil the method")
// });  //Router


module.exports = controller
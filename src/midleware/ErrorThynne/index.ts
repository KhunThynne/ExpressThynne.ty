
import express, { Express, Request, Response, NextFunction } from 'express'

//var router = express.Router();


var path = require('path');
module.exports = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render(__dirname + "/views/error.html",{name:"sd"})
}


/*
module.exports = (options: any) => {
    return ErrorThynne
}
*/
import express, { Router, Request, Response } from 'express'
const router: Router = express.Router();



// con.connect()


router.get('/', (req: any, res: Response) => {
    console.log(req.database)
    res.json({ "test": "" })
})


module.exports = router
import express, { Router, Request, Response } from 'express'
const router: Router = express.Router();
import con_, { status_log } from "./lib/connect_sql"
import { queryDatabase } from './lib/pooling_sql';


// con.connect()


router.get('/', (req: any, res: Response) => {
    res.json({ "database": req.database })
})





router.get('/select/:table?', async (req: Request | any, res) => {
    let result: any;
    const query = `SELECT * FROM ${req.params.table} ${req.query.query}`

    try {
        const results = await queryDatabase(query, req.pool);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while querying the database.');
    }





    // res.send("HI")
    // res.json(result)
})



// router.post('/login', async (req: Request, res: Response) => {
//     const GenarateString = (Math.random() + 1).toString(36).substring(8) + Date.now()
//     let result: any
//     try {
//         result = new Promise(async (resolve: any) => {
//             req.body.user && req.body.password ?
//                 await con_.query(`SELECT id FROM users Where username="${req.body.user}" AND password="${req.body.password}"`, (err: any, result: any, fields: any) => {
//                     err && console.log(err);
//                     result.length > 0 ? con_.query('CREATE TABLE `loginAuth` ( `authtoken` varchar(255),`userid` varchar(255), PRIMARY KEY (`authtoken`) USING BTREE)',
//                         (err: any) => {
//                             err
//                             con_.query(`INSERT INTO loginAuth (authtoken,userid) VALUES ('${GenarateString}' ,'${result[0].id}')`,
//                                 (err: any, result: any, fields: any) => {
//                                     err && console.log(err);

//                                     resolve({ authtoken: GenarateString })
//                                 });
//                         }) : resolve({});

//                 }) : resolve({ 'status': 'error' });

//         });
//     } catch (err: any) {
//         console.log(err)
//     }
//     res.json(await result)
// })


// // con.end()

module.exports = router
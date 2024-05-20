import express, { Router, Request, Response } from 'express'
var mysql = require('mysql');
const service: Router = express.Router();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});

service.get('/test', async (req: Request, res: Response) => {
    
    res.json({"status":""})
})

service.get('/', async (req: Request, res: Response) => {
    let result: any
    try {
        result = new Promise(async (resolve: any) => {

            console.log("Connected!")
            await con.query("SELECT * FROM users", (err: any, result: any, fields: any) => {
                if (err) console.log(err);
                resolve(result)
            });
        });

    } catch (err: any) {
        console.log(err)
    }
    res.json(await result)
})



service.post('/login', async (req: Request, res: Response) => {
    const GenarateString = (Math.random() + 1).toString(36).substring(8) + Date.now()
    let result: any
    try {
        result = new Promise(async (resolve: any) => {
            req.body.user && req.body.password ?
                await con.query(`SELECT id FROM users Where username="${req.body.user}" AND password="${req.body.password}"`, (err: any, result: any, fields: any) => {
                    err && console.log(err);
                    result.length > 0 ? con.query('CREATE TABLE `loginAuth` ( `authtoken` varchar(255),`userid` varchar(255), PRIMARY KEY (`authtoken`) USING BTREE)',
                        (err: any) => {
                            err
                            con.query(`INSERT INTO loginAuth (authtoken,userid) VALUES ('${GenarateString}' ,'${result[0].id}')`,
                                (err: any, result: any, fields: any) => {
                                    err && console.log(err);

                                    resolve({ authtoken: GenarateString })
                                });
                        }) : resolve({});

                }) : resolve({ 'status': 'error' });

        });
    } catch (err: any) {
        console.log(err)
    }
    res.json(await result)
})




module.exports = service
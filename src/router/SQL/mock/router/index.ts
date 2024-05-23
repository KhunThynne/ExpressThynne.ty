import express, { Router, Request, Response } from 'express'
const router_mock: Router = express.Router();

router_mock.get('/', (req, res) => {
    res.send("Mock");
});


router_mock.get('/select/:table?', (req: Request | any, res) => {
    console.log("Test")
    let result: any[] = [];
    let count = req.query.size || 15
    for (let i = 0; i < count; i++) {

        result.push({
            "id": i,
            "email": `${i}-email.t`,
            "username": `${i}-Mock-${(i * 15) * 9841}`,
            "password": `${i}+i${i}155${(i * 7) * 65841}`,
            "created_at": new Date().toISOString()
        });
    }


    res.json(result)
})



module.exports = router_mock;
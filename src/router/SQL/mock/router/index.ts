import express, { Router, Request, Response } from 'express'
const router_mock: Router = express.Router();

router_mock.get('/', (req, res) => {
    res.send("Mock");
});

router_mock.post('/', (req, res) => {
    
    res.send("Mock");
});



module.exports = router_mock;
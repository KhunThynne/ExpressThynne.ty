
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import prisma from '../prisma';



const router = express.Router();


// router.get("/", (req, res, next) => {

// })


router.get('/users', async (req, res) => {

    try {
        const users = await prisma['users'].findUnique({
            where: {
                id: 1,
            },
        })
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});


module.exports = router;
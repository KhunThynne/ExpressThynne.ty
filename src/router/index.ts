
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import help_prisma, { prisma_Method } from '../prisma';
import { error } from 'console';



const router = express.Router();


// router.get("/", (req, res, next) => {

// })


router.get('/:model', async (req, res) => {
    const Model = req.params.model
    await prisma_Method(Model, help_prisma.Read.findUnique, { where: { id: 1 } }).then((result) => {
        res.json(result);
    }).catch(() => {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching users.' });

    })
});


module.exports = router;
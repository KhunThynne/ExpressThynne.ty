const express = require('express')
const app = express()
async function main(port: Number) {
    try {
        const result = await app.listen(port)
        console.log("outside result", result)
    } catch (error) {
        console.log("outside error");
        console.log(error);
    }
}



module.exports = main
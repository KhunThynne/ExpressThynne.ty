

function Test() {

    console.log("Test")
}


var mysql = require('mysql2');
// const process = require('node:process');

var con_ = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE_NAME
});
export { con_ } 
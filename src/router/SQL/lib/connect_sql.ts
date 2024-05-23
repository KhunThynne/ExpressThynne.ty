var mysql = require('mysql2');
// const process = require('node:process');

var con_ = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE_NAME
});
var status_log: string;
con_.connect((err: object | any) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    status_log = `<h1> Connected to the database name =  ${process.env.SQL_DATABASE_NAME}. <h1>`;
});



// Close the connection
process.on('SIGINT', () => {
    console.log("close")
    con_.end((err: object | any) => {
        if (err) {
            console.error('Error closing the connection:', err.message);
            return;
        }
        console.log('Connection closed.');
        process.exit();
    });
});


// process.exit();

export { con_ as default, status_log };
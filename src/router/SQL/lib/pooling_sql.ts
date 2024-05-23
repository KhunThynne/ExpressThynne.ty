import { create } from "domain";
import { createPool } from "mysql2";


// Middleware to parse JSON bodies (for POST and PUT requests)

const sqlmanage_pool = async (req, res, next) => {
    let database_name = req.params.database;

    const setting = set_database(database_name);
    await setting.connecting_status.then((status) => {
        req.pool = setting.pool
        req.database = setting.database
        // req.database_status = status

        if (!status.errno) return next();

        res.status(400).send(status)
    })

    // next()


}


const set_database = (database: string) => {
    const pool = createPool({
        connectionLimit: 10,
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: database || process.env.SQL_DATABASE_NAME,
    });

    // Handle server shutdown gracefully
    var connecting_status = new Promise<any>((resolve, reject) => {
        // "Producing Code" (May take some time)

        // when successful

        pool.getConnection((err, connection) => {
            if (err) {

                console.log(`Error connecting to the database: \u001b[31m${err}`);
                resolve(err);
                return
            }
            console.log("Success connect.");
            resolve(connection);
            connection.release();

        }
        );

        process.on('SIGINT', () => {
            if (pool) {
                pool.end((err) => {
                    if (err) {
                        console.error('Error closing the database connection pool: ', err.message);
                    }
                    console.log('Database connection pool closed');
                    process.exit(0);
                });
            } else {
                process.exit(0);
            }
        });
    });


    return {
        pool: pool,
        database: database,
        connecting_status: connecting_status,
    }
}


// endPR() {
//     process.on('SIGINT', () => {
//         if (this.pool) {
//             this.pool.end((err) => {
//                 if (err) {
//                     console.error('Error closing the database connection pool: ', err.message);
//                 }
//                 console.log('Database connection pool closed');
//                 process.exit(0);
//             });
//         } else {
//             process.exit(0);
//         }
//     });
// }
// Route to set database dynamically
// pool = mysql.createPool(dbConfig);

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.log('Error connecting to the database: ' + err.message);
//         return;
//     }
//     console.log('Database connection pool created successfully');
//     connection.release();
// });

// function createPool() {

// }


// Handle server shutdown gracefully


const queryDatabase = (query, pool) => {
    return new Promise<any>((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

export { sqlmanage_pool as default, queryDatabase }

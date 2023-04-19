import mysql from 'mysql2/promise';

export let connection: mysql.Connection;

/**
 * Makes a query using the mysql2 library and then processes the data to only return the result
 */
export async function query(str: String, arr?: any) {
    try {
        await init();
        let val;
        // Check if there are any parameters
        if (arr != null) {
            let field
            [val, field] = await connection.execute(`${str}`, arr);
        } else {
            let field
            [val, field] = await connection.execute(`${str}`)
        }
        // Parse result to json
        return JSON.parse(JSON.stringify(val));
    } catch (e) {
        throw e
    } finally {
        await connection.end()
    }
}

// Initiate the db connection
export const init = async () => {
    connection = await mysql.createConnection({
        host: process.env.MY_SQL_DB_HOST,
        user: process.env.MY_SQL_DB_USER,
        password: process.env.MY_SQL_DB_PASSWORD,
        port: +process.env.MY_SQL_DB_PORT,
        database: process.env.MY_SQL_DB_DATABASE,
    })
};

export const pool = mysql.createPool({
        host: process.env.MY_SQL_DB_HOST,
        user: "root",
        password: "AWTPassword",
        port: 6604,
        database: "posts",
});
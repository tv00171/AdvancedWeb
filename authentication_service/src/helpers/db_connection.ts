import mysql from 'mysql2/promise';
import BaseError from "../models/BaseError";

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
    } catch (e: any) {
        if (e instanceof BaseError) {
            console.log(e)
            throw e;
        }
        throw new BaseError({errno: 2, error: e.toString()});
    } finally {
        if(connection !=null){
            await connection.end()
        }

    }
}

// Initiate the db connection
export const init = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.MY_SQL_DB_HOST ,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            port: +process.env.MY_SQL_DB_PORT ?? 6603,
            database: process.env.MY_SQL_DB_DATABASE,
        })
    } catch (e: any) {
        throw new BaseError({errno: 1, error: e.toString()});
    }
};

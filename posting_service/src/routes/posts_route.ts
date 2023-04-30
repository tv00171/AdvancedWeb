import {Router} from "express";
import {query, pool} from "../helpers/db_connection";
import { OkPacket, ResultSetHeader } from "mysql2";

const routes = Router();

routes.get('/allPosts', async (req, res) => {
    // Get body of the request
    const name = req.body.name

    //Access the user info that made the request
    console.log(res.locals.user);

    // Make call to the db
    const result = await query("SElECT * FROM posts WHERE id = ? AND name =  ?", [1, 'test'])

    //Response off the call. By default it is 200, if you want it to be an error use the following line, with the status number being what you want
    // return res.status(400).json({message: result})
    return res.json({message: result})
})

routes.get('/userPosts', async (req, res) => {
    return res.json({message: "Hello"})
    await query("SElECT * FROM ")
})

routes.get('/posts', async (req, res) => {
    const query = 'SELECT * FROM posts';

    try {
        const result = await pool.query(query, []);
        res.json({ status: true, data: result[0] });
    } catch (error) {
        res.status(500).json({ message: 'SERVER ERROR', error });
    }
})

// products
routes.post('/products/create', async (req, res) => {
    const { name, user_id, description, price } = req.body;
    const query = 'INSERT INTO posts (name, user_id, description, price) VALUES (?, ?, ?, ?)';

    try {
        const result = await pool.query(query, [name, user_id, description, price]);
        console.log(result);
        res.status(201).json({ status: true});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

routes.post('/products/get', async (req, res) => {
    const { user_id } = req.body; 

    const query = 'SELECT * FROM posts WHERE user_id = ?';

    try {
        const result = await pool.query(query, [user_id]);
        res.json({ status: true, data: result[0] });
    } catch (error) {
        res.status(500).json({ message: 'SERVER ERROR', error });
    }
})

routes.post('/products/delete', async (req, res) => {
    const { user_id, product_id } = req.body; 

    const query = 'DELETE FROM posts WHERE id = ? AND user_id = ?';

    try {
        const result: unknown = await pool.query(query, [product_id, user_id]);

        if ((result as OkPacket).affectedRows === 0) {
            res.status(200).json({ message: `Product with ID ${product_id} not found` });
        } else {
            res.status(200).json({ status: true, message: `Deleted product with ID ${product_id}`});
        }
    } catch (error) {
        res.status(500).json({ message: 'SERVER ERROR', error });
    }
})

routes.post('/products/edit', async (req, res) => {
    const { user_id, product_id, name, description, price} = req.body; 

    const query = 'UPDATE posts SET name = ?, price = ?, description = ? WHERE id = ? AND user_id = ?';

    try {
        const result: unknown = await pool.query(query, [name, price, description, product_id, user_id]);

        if ((result as OkPacket).affectedRows === 0) {
            res.status(200).json({ message: `Product with ID ${product_id} not found` });
        } else {
            res.status(200).json({ status: true, message: `Product with ID: ${product_id} has been updated`});
        }
    } catch (error) {
        res.status(500).json({ message: 'SERVER ERROR', error });
    }
})

export default routes;

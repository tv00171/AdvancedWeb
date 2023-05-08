import {Router} from "express";
import query from "../helpers/db_connection";
import {OkPacket} from "mysql2";

const routes = Router();

/**
 Gets all the posts in the database
 */
routes.get('/posts', async (req, res) => {
    try {
        const result = await query("SELECT * FROM posts");
        res.json({status: true, data: result});
    } catch (error) {
        res.status(500).json({message: 'SERVER ERROR', error});
    }
})

/**
 * Create a post
 */
// products
routes.post('/products/create', async (req, res) => {
    const {description, price, name} = req.body;
    let user_id = res.locals.user.id
    const queryString: string = 'INSERT INTO posts (name, user_id, description, price) VALUES (?, ?, ?, ?)';

    try {
        const result = await query(queryString, [name, user_id, description, price]);
        res.status(201).json({status: true});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
});

/**
 * Gets all the products of a user
 */
routes.get('/products/get', async (req, res) => {
    const id = res.locals.user.id;
    const queryString = 'SELECT * FROM posts WHERE user_id = ?';

    try {
        const result = await query(queryString, [id]);
        res.json({status: true, data: result});
    } catch (error) {
        res.status(500).json({message: 'SERVER ERROR', error});
    }
})

/**
 * Gets a specific post
 */
routes.get('/products/getPost', async (req, res) => {
    const id = req.query.post_id;
    const queryString = 'SELECT * FROM posts WHERE id = ?';

    try {
        const result = await query(queryString, [id]);
        if (result.length == 0) {
            return res.json({status: false, data: []});
        }
        return res.json({status: true, data: result[0]});
    } catch (error) {
        return res.status(500).json({message: 'SERVER ERROR', error});
    }
})


routes.post('/products/delete', async (req, res) => {
    const {product_id} = req.body;
    const user_id = res.locals.user.id;

    const queryString = 'DELETE FROM posts WHERE id = ? AND user_id = ?';

    try {
        const result: unknown = await query(queryString, [product_id, user_id]);

        if ((result as OkPacket).affectedRows === 0) {
            res.status(200).json({message: `Product with ID ${product_id} not found`});
        } else {
            res.status(200).json({status: true, message: `Deleted product with ID ${product_id}`});
        }
    } catch (error) {
        res.status(500).json({message: 'SERVER ERROR', error});
    }
})

routes.post('/products/edit', async (req, res) => {
    const {product_id, name, description, price} = req.body;

    const queryString = 'UPDATE posts SET name = ?, price = ?, description = ? WHERE id = ?';

    try {
        const result = await query(queryString, [name, price, description, product_id]);
        return res.json({success: true, message: result});
    } catch (error) {
        res.status(500).json({message: 'SERVER ERROR', error});
    }
})

export default routes;

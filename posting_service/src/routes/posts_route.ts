import {Router} from "express";
import {query} from "../helpers/db_connection";

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
routes.delete('/post', async (req, res) => {
    return res.json({message: "Hello"})
    await query("SElECT * FROM ")
})


export default routes;

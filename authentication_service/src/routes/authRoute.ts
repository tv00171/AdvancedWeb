import {Router} from 'express';
import AuthService from "../services/authService";
import BaseError from "../models/BaseError";

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World this is the test'});
});

routes.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check the email and password are provided
        if (email == null || password == null) {
            throw new BaseError({error: 'Missing email or password', errno: 5, status: 400})
        }

        // Login the user
        const result = await AuthService.login(email, password);

        // Return the user information
        return res.json({success: true, payload: result});
    } catch (e) {
        if (e instanceof BaseError) {
            return res.status(e.status).json(e.toJSON())
        }
        return res.status(500).json({success: false, error: e.toString(), errno: 6})
    }
});
routes.post('/register', async (req, res) => {
    try {
        const {email, password, name} = req.body;
        if (email == null || password == null || name == null) {
            throw new BaseError({error: "Missing email, password or name", errno: 3, status: 400})
        }
        const result = await AuthService.register(email, password, name);
        return res.json({success: true, payload: result});
    } catch (e) {
        if (e instanceof BaseError) {
            return res.status(e.status).json(e.toJSON())
        }
        return res.status(500).json({success: false, error: e.toString(), errno: 0})
    }
});

routes.post('/validateToken', async (req, res) => {
    try {
        const {token} = req.body;
        if (token == null) {
            throw new BaseError({error: "Missing email, password or name", errno: 3, status: 400})
        }
        const result = await AuthService.isTokenValid(token);
        return res.json({success: true, isTokenValid: result});
    } catch (e) {
        if (e instanceof BaseError) {
            return res.status(e.status).json(e.toJSON())
        }
        return res.status(500).json({success: false, error: e.toString(), errno: 0})
    }
});

routes.get('/userInfo',async (req, res) => {
    try {
        const userId = req.query.id;
        if (userId == null) {
            throw new BaseError({error: "Missing userId", errno: 3, status: 400})
        }
        const result = await AuthService.getUser({id: +userId});
        return res.json({success: true, payload: result});
    } catch (e) {
        if (e instanceof BaseError) {
            return res.status(e.status).json(e.toJSON())
        }
        return res.status(500).json({success: false, error: e.toString(), errno: 0})
    }
});
export default routes;

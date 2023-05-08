import {NextFunction, Request, Response} from "express";
import axios from "axios";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    // // Check the token is not null
    if (token == null) {
        return res.status(400).json({success: false, error: 'No token'})
    }

    try {
        var userInfo = await axios.get(`http://auth_service:4444/userInfo`, {params: {token: token}})
    } catch (e) {
        console.log(e);
        return res.status(401).json({message: "Token not valid"})
    }
    // Check if the token is valid
    let user = userInfo.data.payload
    res.locals.user = user;
    next();
}

export = authMiddleware;

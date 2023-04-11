import {NextFunction, Request, Response} from "express";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // let token = req.headers.authorization
    // // Check the token is not null
    // if (token == null) {
    //     return res.status(400).json({success: false, error: 'No token'})
    // }

    // Check if the token is valid
    let user = {
        id: 1,
        name: "Paco",
        email: "paco@gmail.com",
    }
    res.locals.user = user;
    next();
}

export = authMiddleware;

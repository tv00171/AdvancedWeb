const axios = require("axios");

async function authMiddleware(req, res, next) {
    let token = req.headers.authorization;
    // // Check the token is not null
    if (token == null) {
        return res.status(400).json({success: false, error: 'No token'})
    }
    try {
        var userInfo = await axios.get(`http://auth_service:4444/userInfo`, {params: {token: token}})
    } catch (e) {
        return res.status(401).json({message: "Token not valid"})
    }
    // let user = {id: 5, name: "Test"}
    // Check if the token is valid
    let user = userInfo.data.payload
    res.locals.user = user;
    next();
}

module.exports = authMiddleware

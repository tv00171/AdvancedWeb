const axios = require("axios");
async function authMiddleware(req, res, next) {
    let token = req.headers.authorization;
    // // Check the token is not null
    // if (token == null) {
    //     return res.status(400).json({success: false, error: 'No token'})
    // }
    //
    // try{
    //     var userInfo = await axios.get(`http://127.0.0.1:4444/userInfo`, {params:{token: token}})
    // } catch (e) {
    //     return res.status(401).json({message: "Token not valid"})
    // }
    let user = {id: "64481c51b2c38c08980e063c", name: "Test"}
    // Check if the token is valid
    // let user = userInfo.data.payload
    res.locals.user = user;
    next();
}

module.exports = authMiddleware

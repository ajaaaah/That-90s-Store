//Protects our server so that only authenticated users can access certain routes & can not acess without a valid JWT token

const expressJwt = require('express-jwt');

function authenticateJwt() {
    const secret = process.env.JWT_SECRET;
    return expressJwt({ secret, algorithms: ['HS256'] })
}

module.exports = authenticateJwt;


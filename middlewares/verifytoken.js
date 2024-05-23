const jwt =require('jsonwebtoken');
const jsend = require('jsend');
const appError = require('../utilities/appError');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);
    if(!authHeader){
        const error = appError.create(401,'No token provided')
        return next(error)
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        const error = appError.create(401,'No token provided')
        return next(error)
    }
    try{
        const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next()
    }catch(err){
        const error = appError.create(401,'invalid token ')
        return next(error)
    }
}
module.exports = verifyToken;
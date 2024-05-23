const appError = require("../utilities/appError")

module.exports = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(currentUser.role)){
        return appError.create(401,"this roe=le is not authorized")
        next()
    }
    }

}
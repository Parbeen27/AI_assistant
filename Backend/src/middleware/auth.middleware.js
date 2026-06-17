import jwt from "jsonwebtoken"

export const isAuthenticated = async(req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            message:"not authorized"
        })
    }
    const token = authHeader.split(" ")[1]
    
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    
    req.user = decoded
    next()
}
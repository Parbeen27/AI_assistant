export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    if(process.env.NODE_ENV == "development"){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack
        })
    }
    if(err.isOperational){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })
    }
    return res.status(500).json({
        success: false,
        message: err.message
    })
}
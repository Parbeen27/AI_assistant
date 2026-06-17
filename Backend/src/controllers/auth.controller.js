import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import AppError from "../utils/error.utils.js"
import asyncHandler from "../middleware/async.middleware.js"

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "30h" }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

export const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name){
        throw new AppError("Please enter name",400)
    }
    if(!email){
        throw new AppError("Please enter email",400)
    }
    if(!password){
        throw new AppError("Please enter password",400)
    }
    if(!name || !email || !password){
        throw new AppError("Please enter name,email or password")
    }
    const isUserAlreadyExists = await User.findOne({
        $or: [{name},{email}]
    })
    if(isUserAlreadyExists){
        throw new AppError("User Already Exists",409)
    }
    if(password.length<6){
        throw new AppError("Password is too small",400)
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,email,password:hashPassword
    })
    const accessToken = await generateAccessToken(user)
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        secure:false,
        samesite:"strict"
    })
    return res.status(201).json({
        message: "user generated successfully"
    })
})

export const login = asyncHandler(async(req,res)=>{
    const {identifier,password} = req.body
    
    if(!identifier || !password){
        throw new AppError("enter name and password",400)
    }
    const user = await User.findOne({
    $or:[{name:identifier},{email:identifier}]
    })
    if(!user){
        throw new AppError("User not found",404)
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        throw new AppError("Invalid Credentials",401)
    }
    const accessToken = await generateAccessToken(user)
    const refreshToken = await generateRefreshToken(user)
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        secure:false,
        samesite:"strict"
    })
    return res.status(201).json({
        message: "user login successfully",
        accessToken,
        id:user._id,
    })
})
export const logout = asyncHandler(async(req,res) => {
    res.clearCookie('refreshToken', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});

res.status(200).json({
  message: 'Logged out successfully'
});
})

export const refreshToken = asyncHandler(async(req,res) => {
    const token = req.cookies.refreshToken

    if(!token){
        throw new AppError("Not logged In",401)
    }
    
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)

    const accessToken = await jwt.sign(
        {id: decoded.id},
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
    )

    res.json({ accessToken })
})


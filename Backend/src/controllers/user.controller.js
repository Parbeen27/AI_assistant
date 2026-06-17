
import {chatresponse} from "../config/gemini.js"
import asyncMiddleware from "../middleware/async.middleware.js"
import { Ask, getUserinfo } from "../services/user.service.js"
import AppError from "../utils/error.utils.js"

export const getUser = asyncMiddleware(async(req,res)=>{
    const user = await getUserinfo(req.user.id)
    res.json({
        user
    })
})

export const askassistant = asyncMiddleware(async(req,res)=>{
    const {message}=req.body
    const response = await Ask(message)
    res.json({
        response
    })
})
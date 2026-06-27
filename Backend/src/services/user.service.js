import User from "../models/user.model.js"
import AppError from "../utils/error.utils.js"
import { graph } from "../config/gemini.js"
import moment from "moment"
import { evaluate } from "mathjs"
import { skills } from "../skills/index.js"
export const getUserinfo = async(userId) => {
    const user = await User.findById(userId).select("-password")
    
    if(!user){
        throw new AppError("user not found",400)
    }
    return {
        user
    }
}

function route(command) {
    for (const skill of skills) {
        const params = skill.match(command)
        if(params){
            return skill.execute(params)
        }
    }
    return null
}

export const Ask = async(command) => {
    const localIntent = route(command);
    if(localIntent){
        return localIntent
    }
    const msg = await graph.invoke({messages:[
        {
            role:"user",
            content:command
        }
    ]},
{configurable:{thread_id:"user123"}})
    return { response: msg.messages[msg.messages.length-1].content}
}
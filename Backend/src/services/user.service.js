import User from "../models/user.model.js"
import AppError from "../utils/error.utils.js"
import { graph } from "../config/gemini.js"
import moment from "moment"
import { evaluate } from "mathjs"
export const getUserinfo = async(userId) => {
    const user = await User.findById(userId).select("-password")
    
    if(!user){
        throw new AppError("user not found",400)
    }
    return {
        user
    }
}

function detectIntent(command) {
    const input = command.toLowerCase().trim();

    if (input.includes("youtube")) {
        let query = input
        .replace("search", "")
        .replace("play", "")
        .replace("find", "")
        .replace("look up", "")
        .replace("youtube", "")
        .replace("on", "")
        .replace("in", "")
        .replace("for", "")
        .trim();
        return {
            type: "youtube_search",
            userinput: query
        };
    }

    if (input.includes("open instagram")) {
        return {
            type: "instagram_open",
            userinput: ""
        };
    }

    if (input.includes("open facebook")) {
        return {
            type: "facebook_open",
            userinput: ""
        };
    }

    if (input.startsWith("play ")) {
        return {
            type: "youtube_play",
            userinput: input.replace(/^play\s+/i, "")
        };
    }
    if (input.includes("+") || input.includes("-") || input.includes("*") || input.includes("/")) {
        const cal = input.split(" ")[1]
        console.log(cal);
        
        return {
            type: "calculation",
            userinput: "calculate",
            response: evaluate(cal)
        };
    }
    

    if (
        input.startsWith("search ") ||
        input.includes("google")
    ) {
        return {
            type: "google_search",
            userinput: input
                .replace("search", "")
                .replace("google", "")
                .trim()
        };
    }

    return null;
}

export const Ask = async(command) => {
    // const localIntent = detectIntent(command);
    // if(localIntent){
    //     return localIntent
    // }
    const msg = await graph.invoke({messages:[
        {
            role:"user",
            content:command
        }
    ]},
{configurable:{thread_id:"user123"}})
    return msg.messages[msg.messages.length-1].content
}
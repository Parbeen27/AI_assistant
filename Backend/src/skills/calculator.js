import { evaluate } from "mathjs"

export const calcSkill = {
    name: "calculator",

    match(command) {
        const match = command.toLowerCase().match(/^calculate\s+(.+)$/)
        console.log(match);
        
        if(!match) return null
        return {
            expression: match[1]
        }
    },
    execute({expression}){
        try {
            return {
                success: true,
                type: "Calculator",
                response: evaluate(expression)
            }
        } catch (error) {
            return {
                success: false,
                message: "Invalid mathematical expression"
            }
        }
    }
}

const websites = {
    github: "https://github.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    gmail: "https://mail.google.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
};

export const browserSkill = {
    name: "Browser",

    match(command) {
        const match = command.toLowerCase().match(/^open\s+(.+)$/)
        if(!match) return null
        return {
            site: match[1]
        }
    },

    execute({site}) {
        const url = websites[site]

        if(!url) {
            return {
                success: false,
                message: `I don't know how to open ${site}`
            }
        }

        return {
            success: true,
            type: "browser",
            response: url
        }
    }
}
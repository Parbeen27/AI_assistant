import Groq from "groq-sdk";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


export async function chatresponse(command) {
  const chatCompletion = await getGroqChatCompletion(command);

  const content = chatCompletion.choices[0].message.content;

const parsed = JSON.parse(content);

return parsed;
}

export async function getGroqChatCompletion(command) {
  return groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: `
You are Neo, a voice assistant.

Always return valid JSON:

{
  "type": "",
  "userinput": "",
  "response": ""
}
`
      },
      {
        role: "user",
        content: command
      }
    ],
    temperature: 0.2
  });
}

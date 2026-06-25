import  {ChatGroq} from "@langchain/groq"
import { Annotation, MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { TavilySearch } from "@langchain/tavily";

const checkPointer = new MemorySaver()

const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const tools = [tool]

const toolNode = new ToolNode(tools)

const llm = new ChatGroq({
  model:"llama-3.3-70b-versatile",
  temperature: 0.7,
  maxTokens: 30,
  maxRetries: 2
}).bindTools(tools)

const chatresponse = async(state)=>{
  
  const response = await llm.invoke([
    {
      role:"system",
      content:`You are an AI assistant 
      Use conversation memory first.
      only use tools when the answer requires
      external real-time information like:
      weather,news,web search,stock prices etc.
      
      Do not call tools for simple conversation,
      memory-based question, greetings, or personal context`
    },
    ...state.messages
  ])
  console.log(response);
  
  return {messages:[response]}
}




const shouldContinue = async(state) => { 
  
  const lastmsg = state.messages[state.messages.length-1]
  
  if(lastmsg.tool_calls.length>0){
    return "tools"
  }
  else{
    return "__end__"
  }
}

export const graph = new StateGraph(MessagesAnnotation)
.addNode("agent",chatresponse)
.addNode("tools",toolNode)
.addEdge("__start__","agent")
.addEdge("agent","tools")
.addConditionalEdges("agent",shouldContinue)
.compile({checkpointer:checkPointer})
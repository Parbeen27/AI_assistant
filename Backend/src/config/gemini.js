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
  maxTokens: 512,
  maxRetries: 2
}).bindTools(tools)

const chatresponse = async(state)=>{
  
  const response = await llm.invoke([
    {
      role:"system",
      content:`You are a helpful AI assistant.

Use the available tools whenever external or real-time information is required.
If you already know the answer or it comes from conversation history, answer directly.`
    },
    ...state.messages
  ])
  console.log(response);
  
  return {messages:[response]}
}




const shouldContinue = (state) => {
  const last = state.messages.at(-1);

  if (last.tool_calls?.length) {
    return "tools";
  }

  return "__end__";
};

export const graph = new StateGraph(MessagesAnnotation)
.addNode("agent",chatresponse)
.addNode("tools",toolNode)
.addEdge("__start__","agent")
.addConditionalEdges("agent",shouldContinue)
.addEdge("tools", "agent")
.compile({checkpointer:checkPointer})
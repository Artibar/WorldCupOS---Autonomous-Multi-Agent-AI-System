
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import mcpClient from "../mcp/client.js"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import mapTool from '../tools/mapTool.js'
import weatherTool from '../tools/weatherTool.js'
import crowdTool from '../tools/crowdTool.js'
import { HumanMessage } from "@langchain/core/messages"
import { ExecutionLog } from '../models/Fan.js'

const fanAgent = async(userInput)=>{
    try {
        const mcpTools = await mcpClient.getTools()
        const model = new ChatGoogleGenerativeAI({
            model: process.env.GOOGLE_MODEL,
            apiKey: process.env.GEMINI_API_KEY,
            temperature: 0,
        })

        const agent = createReactAgent({
            llm: model,
            tools:[weatherTool, crowdTool]
        })

        const response = await agent.invoke({ messages: [new HumanMessage(userInput)]})
        
        // Extract the text result from the response
        const result = response.messages[response.messages.length - 1].content

        // Log execution
        await ExecutionLog.create({
            agentName: 'fanAgent',
            action: 'agent_invoked',
            input: { userInput },
            output: { result },
            status: 'success'
        })

        return result
    } catch (error) {
        await ExecutionLog.create({
            agentName: 'fanAgent',
            action: 'agent_invoked',
            input: { userInput },
            status: 'failed',
            reason: error.message
        })
        throw error
    }
}
export default fanAgent
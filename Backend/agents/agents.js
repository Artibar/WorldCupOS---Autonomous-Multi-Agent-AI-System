
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { HumanMessage } from "@langchain/core/messages"
import { transitTool } from '../tools/transitTool.js'
import { medicalTool } from '../tools/medicalTool.js'
import { businessTool } from '../tools/businessTool.js'
import { ExecutionLog } from '../models/Fan.js'

// ─── SHARED MODEL ─────────────────────────────────────────
const getModel = () => new ChatGoogleGenerativeAI({
  model: process.env.GOOGLE_MODEL,
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0,
})

// ─── TRANSIT AGENT ────────────────────────────────────────
export const transitAgent = async (input) => {
  const agent = createReactAgent({
    llm: getModel(),
    tools: [transitTool],
    messageModifier: `You are the Transit Agent for WorldCupOS.
    Your job is to manage all transport routes to World Cup stadiums.
    When crowd surges or delays are detected, you MUST reroute automatically.
    Always call transitTool and return real execution results.
    Never just suggest — always execute.`
  })

  const response = await agent.invoke({
    messages: [new HumanMessage(input)]
  })

  const result = response.messages[response.messages.length - 1].content

  await ExecutionLog.create({
    agentName: 'transitAgent',
    action: 'agent_invoked',
    input: { userInput: input },
    output: { result },
    status: 'success'
  })

  return result
}

// ─── MEDICAL AGENT ────────────────────────────────────────
export const medicalAgent = async (input) => {
  const agent = createReactAgent({
    llm: getModel(),
    tools: [medicalTool],
    messageModifier: `You are the Medical Emergency Agent for WorldCupOS.
    Your job is to respond to ALL medical emergencies at World Cup stadiums immediately.
    When an emergency is reported, you MUST dispatch responders and find nearest hospital.
    Treat every incident as urgent. Always execute — never just respond with text.
    Severity levels: low (minor injury), medium (requires paramedic), 
    high (ambulance needed), critical (life threatening).`
  })

  const response = await agent.invoke({
    messages: [new HumanMessage(input)]
  })

  const result = response.messages[response.messages.length - 1].content

  await ExecutionLog.create({
    agentName: 'medicalAgent',
    action: 'agent_invoked',
    input: { userInput: input },
    output: { result },
    status: 'success'
  })

  return result
}

// ─── BUSINESS AGENT ───────────────────────────────────────
export const businessAgent = async (input) => {
  const agent = createReactAgent({
    llm: getModel(),
    tools: [businessTool],
    messageModifier: `You are the Business Operations Agent for WorldCupOS.
    Your job is to manage all business operations at World Cup stadiums.
    Monitor crowd levels and automatically adjust staffing and stock recommendations.
    When crowd is high or critical, send surge alerts immediately.
    Always execute businessTool — never just recommend without calling the tool.`
  })

  const response = await agent.invoke({
    messages: [new HumanMessage(input)]
  })

  const result = response.messages[response.messages.length - 1].content

  await ExecutionLog.create({
    agentName: 'businessAgent',
    action: 'agent_invoked',
    input: { userInput: input },
    output: { result },
    status: 'success'
  })

  return result
}
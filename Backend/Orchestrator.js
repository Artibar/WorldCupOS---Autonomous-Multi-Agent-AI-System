import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { HumanMessage } from "@langchain/core/messages"
import fanAgent from './agents/fanAgent.js'
import { transitAgent, medicalAgent, businessAgent } from './agents/agents.js'
import { Crowd, ExecutionLog } from './models/Fan.js'

// ─── ORCHESTRATOR ─────────────────────────────────────────
// Coordinates all agents based on events
// This is the brain of WorldCupOS

export const orchestrator = async (event) => {
  console.log(`🎯 Orchestrator received event: ${event.type}`)
  const results = {}

  try {
    switch (event.type) {

      // ── Fan requests trip planning
      case 'FAN_TRIP_REQUEST':
        results.fan = await fanAgent(
          `Plan trip for fan ${event.fanId} to ${event.stadium} 
           for match on ${event.matchDate}. 
           From: ${event.from}. Book flight and taxi.`
        )
        break

      // ── Crowd surge detected
      case 'CROWD_SURGE':
        console.log(`🚨 Crowd surge at ${event.stadium} — coordinating agents`)

        // Run transit + business in parallel
        const [transitResult, businessResult] = await Promise.all([
          transitAgent(
            `Crowd surge detected at ${event.stadium}. 
             Reroute all buses and shuttles due to congestion.`
          ),
          businessAgent(
            `Crowd surge at ${event.stadium}. 
             Check food and merchandise demand and send surge alerts.`
          )
        ])

        results.transit = transitResult
        results.business = businessResult

        // Update crowd level in MongoDB
        await Crowd.findOneAndUpdate(
          { stadiumName: event.stadium },
          {
            crowdLevel: 'critical',
            $push: {
              alerts: {
                message: `Crowd surge detected — agents coordinated response`,
                triggeredAt: new Date()
              }
            },
            updatedAt: new Date()
          },
          { upsert: true, new: true }
        )
        break

      // ── Medical emergency
      case 'MEDICAL_EMERGENCY':
        console.log(`🚑 Medical emergency at ${event.stadium}`)
        results.medical = await medicalAgent(
          `Medical emergency at ${event.stadium} Zone ${event.zone}. 
           Severity: ${event.severity}. 
           Incident: ${event.incidentType}. 
           Patients: ${event.patientCount}. 
           Dispatch responders and find nearest hospital immediately.`
        )
        break

      // ── Match day startup — run all agents
      case 'MATCH_DAY':
        console.log(`⚽ Match day at ${event.stadium} — initializing all agents`)

        const [transitCheck, businessCheck] = await Promise.all([
          transitAgent(
            `Match day at ${event.stadium} for ${event.match}. 
             Check and activate all transit routes.`
          ),
          businessAgent(
            `Match day at ${event.stadium}. 
             Check all business operations and prepare for high demand.`
          )
        ])

        results.transit = transitCheck
        results.business = businessCheck
        break

      // ── Transit delay
      case 'TRANSIT_DELAY':
        results.transit = await transitAgent(
          `${event.transportType} delay on route to ${event.stadium}. 
           Delay: ${event.delayMinutes} minutes. 
           Reroute and notify affected fans.`
        )
        break

      default:
        console.log(`Unknown event type: ${event.type}`)
    }

    // Log orchestrator execution
    await ExecutionLog.create({
      agentName: 'orchestrator',
      action: `handled_${event.type}`,
      input: event,
      output: results,
      status: 'success'
    })

    return {
      success: true,
      event: event.type,
      results
    }

  } catch (error) {
    await ExecutionLog.create({
      agentName: 'orchestrator',
      action: `failed_${event.type}`,
      input: event,
      status: 'failed',
      reason: error.message
    })

    return {
      success: false,
      event: event.type,
      error: error.message
    }
  }
}

// ─── MONGODB CHANGE STREAM ────────────────────────────────
// Watches crowd collection and auto-triggers orchestrator
// This makes the system truly autonomous

export const startChangeStream = (db) => {
  console.log('👁️ MongoDB Change Stream watching crowd levels...')

  const crowdCollection = db.collection('crowds')
  const changeStream = crowdCollection.watch()

  changeStream.on('change', async (change) => {
    if (change.operationType === 'update') {
      const updated = change.updateDescription.updatedFields

      // Auto-trigger on crowd level change to critical
      if (updated.crowdLevel === 'critical') {
        console.log(`⚡ Change Stream triggered — crowd critical at ${change.fullDocument?.stadiumName}`)

        await orchestrator({
          type: 'CROWD_SURGE',
          stadium: change.fullDocument?.stadiumName,
        })
      }
    }
  })

  return changeStream
}
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { orchestrator, startChangeStream } from './Orchestrator.js'
import fanAgent from './agents/fanAgent.js'
import { transitAgent, medicalAgent, businessAgent } from './agents/agents.js'
import { Fan, Crowd, Transit, Medical, Business, ExecutionLog } from './models/Fan.js'
import connectToDB from './config/Database.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`)
  next()
})

// ─────────────────────────────────────────────────────────
// MONGODB CONNECTION
// ─────────────────────────────────────────────────────────
await connectToDB()

// ─────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'WorldCupOS Running',
    agents: ['fanAgent', 'transitAgent', 'medicalAgent', 'businessAgent'],
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working', timestamp: new Date() })
})

// ─────────────────────────────────────────────────────────
// FAN AGENT ROUTES
// ─────────────────────────────────────────────────────────

// Plan fan trip — agent executes booking automatically
app.post('/api/fan/plan', async (req, res) => {
  try {
    const { fanId, stadium, matchDate, from } = req.body

    if (!fanId || !stadium || !matchDate || !from) {
      return res.status(400).json({ error: 'fanId, stadium, matchDate, from are required' })
    }

    const result = await fanAgent(
      `Plan complete trip for fan ${fanId} to ${stadium} 
       for match on ${matchDate}. 
       Flying from: ${from}. 
       Book flight and taxi automatically.`
    )

    res.json({ success: true, agent: 'fanAgent', result })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get fan itinerary
app.get('/api/fan/:fanId', async (req, res) => {
  try {
    const fan = await Fan.findOne({ fanId: req.params.fanId })
    if (!fan) return res.status(404).json({ error: 'Fan not found' })
    res.json({ success: true, fan })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// CROWD AGENT ROUTES
// ─────────────────────────────────────────────────────────

// Update crowd level — triggers Change Stream automatically
app.post('/api/crowd/update', async (req, res) => {
  try {
    const { stadium, currentCapacity, maxCapacity } = req.body

    if (!stadium || !currentCapacity || !maxCapacity) {
      return res.status(400).json({ error: 'stadium, currentCapacity, maxCapacity required' })
    }

    // Calculate crowd level automatically
    const percentage = (currentCapacity / maxCapacity) * 100
    let crowdLevel = 'low'
    if (percentage >= 90) crowdLevel = 'critical'
    else if (percentage >= 75) crowdLevel = 'high'
    else if (percentage >= 50) crowdLevel = 'moderate'

    // This update triggers MongoDB Change Stream
    // Change Stream auto-triggers orchestrator if critical
    const crowd = await Crowd.findOneAndUpdate(
      { stadiumName: stadium },
      {
        stadiumName: stadium,
        currentCapacity,
        maxCapacity,
        crowdLevel,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    )

    res.json({
      success: true,
      stadium,
      crowdLevel,
      percentage: Math.round(percentage),
      autoTriggered: crowdLevel === 'critical'
        ? 'Orchestrator triggered automatically'
        : 'No trigger needed',
      crowd
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get crowd status for all stadiums
app.get('/api/crowd', async (req, res) => {
  try {
    const crowds = await Crowd.find().sort({ updatedAt: -1 })
    res.json({ success: true, crowds })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// TRANSIT AGENT ROUTES
// ─────────────────────────────────────────────────────────

// Manage transit routes
app.post('/api/transit', async (req, res) => {
  try {
    const { stadium, transportType, issue } = req.body

    if (!stadium || !transportType) {
      return res.status(400).json({ error: 'stadium and transportType required' })
    }

    const result = await transitAgent(
      `${issue && issue !== 'none'
        ? `${issue} detected at ${stadium}.`
        : `Check transit routes for ${stadium}.`}
       Manage ${transportType} routes and update status.`
    )

    res.json({ success: true, agent: 'transitAgent', result })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all transit routes
app.get('/api/transit', async (req, res) => {
  try {
    const routes = await Transit.find().sort({ updatedAt: -1 })
    res.json({ success: true, routes })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// MEDICAL AGENT ROUTES
// ─────────────────────────────────────────────────────────

// Report medical emergency — agent dispatches immediately
app.post('/api/medical/emergency', async (req, res) => {
  try {
    const { stadium, severity, incidentType, zone, patientCount } = req.body

    if (!stadium || !severity || !incidentType || !zone) {
      return res.status(400).json({
        error: 'stadium, severity, incidentType, zone required'
      })
    }

    const result = await medicalAgent(
      `EMERGENCY at ${stadium} Zone ${zone}. 
       Severity: ${severity}. 
       Type: ${incidentType}. 
       Patients: ${patientCount || 1}. 
       Dispatch responders and find nearest hospital immediately.`
    )

    res.json({ success: true, agent: 'medicalAgent', result })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all medical emergencies
app.get('/api/medical', async (req, res) => {
  try {
    const emergencies = await Medical.find().sort({ createdAt: -1 })
    res.json({ success: true, emergencies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Resolve emergency
app.patch('/api/medical/:emergencyId/resolve', async (req, res) => {
  try {
    const emergency = await Medical.findOneAndUpdate(
      { emergencyId: req.params.emergencyId },
      { status: 'resolved', resolvedAt: new Date() },
      { new: true }
    )
    res.json({ success: true, emergency })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// BUSINESS AGENT ROUTES
// ─────────────────────────────────────────────────────────

// Check business operations
app.post('/api/business', async (req, res) => {
  try {
    const { stadium, businessType, action } = req.body

    if (!stadium || !businessType) {
      return res.status(400).json({ error: 'stadium and businessType required' })
    }

    const result = await businessAgent(
      `Check ${businessType} operations at ${stadium}. 
       Action: ${action || 'check_demand'}. 
       Adjust staffing and send alerts if needed.`
    )

    res.json({ success: true, agent: 'businessAgent', result })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get business status
app.get('/api/business', async (req, res) => {
  try {
    const businesses = await Business.find().sort({ updatedAt: -1 })
    res.json({ success: true, businesses })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// ORCHESTRATOR ROUTES
// ─────────────────────────────────────────────────────────

// Manually trigger orchestrator with any event
app.post('/api/orchestrate', async (req, res) => {
  try {
    const event = req.body

    if (!event.type) {
      return res.status(400).json({ error: 'event.type is required' })
    }

    const result = await orchestrator(event)
    res.json({ success: true, result })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// EXECUTION LOGS — PROOF OF AGENT ACTIONS
// ─────────────────────────────────────────────────────────

// Get all execution logs — shows judges agents are executing
app.get('/api/logs', async (req, res) => {
  try {
    const { agent, limit = 50 } = req.query
    const filter = agent ? { agentName: agent } : {}

    const logs = await ExecutionLog
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))

    res.json({
      success: true,
      total: logs.length,
      logs
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get stats — how many actions each agent executed
app.get('/api/logs/stats', async (req, res) => {
  try {
    const stats = await ExecutionLog.aggregate([
      {
        $group: {
          _id: '$agentName',
          totalActions: { $sum: 1 },
          successCount: {
            $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] }
          },
          failedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
          },
          lastAction: { $max: '$createdAt' }
        }
      },
      { $sort: { totalActions: -1 } }
    ])

    res.json({ success: true, stats })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ─────────────────────────────────────────────────────────
// UNIVERSAL AGENT TASK EXECUTION
// ─────────────────────────────────────────────────────────

app.post('/execute-task', async (req, res) => {
  try {
    console.log('=== EXECUTE-TASK ROUTE HIT ===')
    console.log('Body:', req.body)
    
    const { agent, task } = req.body

    if (!agent || !task) {
      return res.status(400).json({ error: 'agent and task are required' })
    }

    let result
    switch (agent) {
      case 'fanAgent':
        result = await fanAgent(task)
        break
      case 'transitAgent':
        result = await transitAgent(task)
        break
      case 'medicalAgent':
        result = await medicalAgent(task)
        break
      case 'businessAgent':
        result = await businessAgent(task)
        break
      default:
        return res.status(400).json({ error: 'Unknown agent: ' + agent })
    }

    res.json({ success: true, agent, task, result })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Error and 404 handlers
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.path} - Route not found`)
  res.status(404).json({ success: false, error: 'Route not found', path: req.path, method: req.method })
})

// ─────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
🌍 WorldCupOS Backend Running
📡 Port: ${PORT}
🤖 Agents: fanAgent, transitAgent, medicalAgent, businessAgent
👁️  Change Stream: Active
📊 MongoDB: Connected
    `)
  })
})

export default app
import { tool } from '@langchain/core/tools'
import axios from 'axios'
import * as z from 'zod'
import { Business, Crowd, ExecutionLog } from '../models/Fan.js'

const businessTool = tool(
  async ({ stadium, businessType, action }) => {
    const startTime = Date.now()

    try {
      // Step 1 — Get current crowd data for this stadium
      const crowdData = await Crowd.findOne({ stadiumName: stadium })
      const crowdLevel = crowdData?.crowdLevel || 'moderate'
      const capacity = crowdData?.currentCapacity || 50000

      // Step 2 — Calculate demand multiplier based on crowd
      const demandMultiplier = {
        low: 1.0,
        moderate: 1.5,
        high: 2.0,
        critical: 3.0
      }[crowdLevel]

      // Step 3 — Get World Cup match data for stadium
      const matchRes = await axios.get('https://worldcup26.ir/get/games')
      const matches = matchRes.data
      const todayMatch = matches.find(m =>
        m.stadium?.toLowerCase().includes(stadium.toLowerCase()) &&
        new Date(m.date).toDateString() === new Date().toDateString()
      )

      // Step 4 — Business logic per type
      const businessLogic = {
        food: {
          baseStaff: 20,
          recommendedStaff: Math.ceil(20 * demandMultiplier),
          stockAlert: capacity > 70000,
          surgeAlert: crowdLevel === 'critical',
          action: crowdLevel === 'high' || crowdLevel === 'critical'
            ? 'increase_staff_and_stock'
            : 'maintain_current'
        },
        merchandise: {
          baseStaff: 10,
          recommendedStaff: Math.ceil(10 * demandMultiplier),
          stockAlert: todayMatch !== undefined,
          surgeAlert: crowdLevel === 'critical',
          action: todayMatch
            ? 'prepare_match_day_stock'
            : 'maintain_current'
        },
        transport: {
          baseStaff: 15,
          recommendedStaff: Math.ceil(15 * demandMultiplier),
          stockAlert: false,
          surgeAlert: crowdLevel === 'high' || crowdLevel === 'critical',
          action: crowdLevel !== 'low'
            ? 'deploy_extra_vehicles'
            : 'maintain_current'
        },
        hotel: {
          baseStaff: 30,
          recommendedStaff: Math.ceil(30 * demandMultiplier),
          stockAlert: false,
          surgeAlert: false,
          action: todayMatch
            ? 'prepare_late_checkout_policy'
            : 'maintain_current'
        }
      }

      const logic = businessLogic[businessType]

      // Step 5 — Save to MongoDB
      await Business.findOneAndUpdate(
        { stadium, type: businessType },
        {
          stadium,
          type: businessType,
          demandLevel: crowdLevel === 'critical' ? 'surge' : crowdLevel,
          recommendedStaff: logic.recommendedStaff,
          surgeAlert: logic.surgeAlert,
          $push: {
            alerts: logic.surgeAlert ? {
              message: `Surge alert at ${stadium} — increase ${businessType} capacity immediately`,
              createdAt: new Date()
            } : undefined
          },
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      )

      // Step 6 — Log execution
      await ExecutionLog.create({
        agentName: 'businessAgent',
        toolUsed: 'businessTool',
        action: logic.action,
        input: { stadium, businessType, action },
        output: {
          crowdLevel,
          recommendedStaff: logic.recommendedStaff,
          surgeAlert: logic.surgeAlert
        },
        status: 'success',
        executionTime: Date.now() - startTime
      })

      return JSON.stringify({
        stadium,
        businessType,
        crowdLevel,
        currentCapacity: capacity,
        todayMatch: todayMatch
          ? `${todayMatch.home_team} vs ${todayMatch.away_team}`
          : 'No match today',
        recommendations: {
          action: logic.action,
          recommendedStaff: logic.recommendedStaff,
          surgeAlert: logic.surgeAlert,
          stockAlert: logic.stockAlert,
        },
        message: logic.surgeAlert
          ? `🔴 SURGE ALERT — ${businessType} at ${stadium} needs immediate attention. Deploy ${logic.recommendedStaff} staff now.`
          : `✅ ${businessType} at ${stadium} — recommended ${logic.recommendedStaff} staff based on ${crowdLevel} crowd level.`
      })

    } catch (error) {
      await ExecutionLog.create({
        agentName: 'businessAgent',
        toolUsed: 'businessTool',
        action: 'business_check_failed',
        input: { stadium, businessType, action },
        status: 'failed',
        reason: error.message,
        executionTime: Date.now() - startTime
      })
      throw new Error(`Business tool failed: ${error.message}`)
    }
  },
  {
    name: "business_manager",
    description: "Manages business operations at stadiums. Forecasts demand, adjusts staffing, sends surge alerts for food, merchandise, transport and hotels based on real crowd data.",
    schema: z.object({
      stadium: z.string().describe("Stadium name to check business operations"),
      businessType: z.enum(['food', 'merchandise', 'transport', 'hotel']).describe("Type of business to manage"),
      action: z.enum(['check_demand', 'adjust_staff', 'check_stock', 'send_alert']).describe("Action to perform")
    })
  }
)

export { businessTool }
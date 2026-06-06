import { tool } from '@langchain/core/tools'
import axios from 'axios'
import * as z from 'zod'
import { Transit, ExecutionLog } from '../models/Fan.js'

const transitTool = tool(
  async ({ stadium, transportType, issue }) => {
    const startTime = Date.now()
    try {
      // Step 1 — Get stadium coordinates from Google Maps
      const geoRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: `${stadium} stadium`,
            key: process.env.GOOGLE_MAP_API_KEY
          }
        }
      )

      const location = geoRes.data.results[0]?.geometry?.location
      if (!location) throw new Error('Stadium location not found')

      // Step 2 — Get nearby transit routes from Google Maps
      const transitRes = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        {
          params: {
            origin: `${location.lat},${location.lng}`,
            destination: stadium,
            mode: 'transit',
            key: process.env.GOOGLE_MAP_API_KEY
          }
        }
      )

      const routes = transitRes.data.routes
      const bestRoute = routes[0]

      // Step 3 — Check if rerouting needed
      let status = 'active'
      let rerouteReason = null
      let alternateRoute = null

      if (issue === 'congestion' || issue === 'delay') {
        status = 'rerouted'
        rerouteReason = `${issue} detected near ${stadium}`
        // Pick second best route if available
        alternateRoute = routes[1] || routes[0]
      }

      // Step 4 — Update MongoDB
      const transitRecord = await Transit.findOneAndUpdate(
        { stadium, transportType },
        {
          stadium,
          transportType,
          status,
          rerouted: status === 'rerouted',
          rerouteReason,
          estimatedArrival: new Date(Date.now() + (bestRoute?.legs[0]?.duration?.value || 1800) * 1000),
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      )

      // Step 5 — Log execution
      await ExecutionLog.create({
        agentName: 'transitAgent',
        toolUsed: 'transitTool',
        action: status === 'rerouted' ? 'route_rerouted' : 'route_checked',
        input: { stadium, transportType, issue },
        output: { status, rerouteReason },
        status: 'success',
        executionTime: Date.now() - startTime
      })

      return JSON.stringify({
        stadium,
        transportType,
        status,
        rerouteReason,
        estimatedArrival: transitRecord.estimatedArrival,
        route: bestRoute?.summary || 'Route calculated',
        alternateRoute: alternateRoute?.summary || null,
        message: status === 'rerouted'
          ? `⚠️ Route rerouted due to ${issue} near ${stadium}`
          : `✅ Transit route active for ${stadium}`
      })

    } catch (error) {
      await ExecutionLog.create({
        agentName: 'transitAgent',
        toolUsed: 'transitTool',
        action: 'route_check_failed',
        input: { stadium, transportType, issue },
        status: 'failed',
        reason: error.message,
        executionTime: Date.now() - startTime
      })
      throw new Error(`Transit tool failed: ${error.message}`)
    }
  },
  {
    name: "transit_manager",
    description: "Manages transit routes to stadiums. Reroutes buses, metro, shuttles when congestion or delays detected. Use when fan needs transport or crowd surge affects routes.",
    schema: z.object({
      stadium: z.string().describe("Stadium name e.g MetLife Stadium, SoFi Stadium"),
      transportType: z.enum(['bus', 'metro', 'shuttle', 'taxi']).describe("Type of transport"),
      issue: z.enum(['congestion', 'delay', 'none']).describe("Current issue affecting transit. Use 'none' if no issues")
    })
  }
)

export { transitTool }
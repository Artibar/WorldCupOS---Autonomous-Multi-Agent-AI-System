import { tool } from '@langchain/core/tools'
import axios from 'axios'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { Medical, ExecutionLog } from '../models/Fan.js'

const medicalTool = tool(
  async ({ stadium, severity, incidentType, zone, patientCount }) => {
    const startTime = Date.now()
    const emergencyId = uuidv4()

    try {
      // Step 1 — Get stadium coordinates
      const geoRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: `${stadium}`,
            key: process.env.GOOGLE_MAP_API_KEY
          }
        }
      )

      const location = geoRes.data.results[0]?.geometry?.location

      // Step 2 — Find nearest hospitals
      const hospitalsRes = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${location.lat},${location.lng}`,
            radius: 5000,
            type: 'hospital',
            key: process.env.GOOGLE_MAP_API_KEY
          }
        }
      )

      const nearestHospital = hospitalsRes.data.results[0]

      // Step 3 — Calculate ETA to hospital
      const distanceRes = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins: `${location.lat},${location.lng}`,
            destinations: `place_id:${nearestHospital.place_id}`,
            mode: 'driving',
            key: process.env.GOOGLE_MAP_API_KEY
          }
        }
      )

      const hospitalEta = Math.ceil(
        distanceRes.data.rows[0].elements[0].duration.value / 60
      )

      // Step 4 — Assign responders based on severity
      const responders = []
      if (severity === 'low' || severity === 'medium') {
        responders.push({ name: 'First Aid Team A', unit: 'first_aid', eta: 3 })
      }
      if (severity === 'high' || severity === 'critical') {
        responders.push(
          { name: 'Paramedic Unit 1', unit: 'paramedic', eta: 5 },
          { name: 'Emergency Response Team', unit: 'emergency', eta: 7 }
        )
      }
      if (severity === 'critical') {
        responders.push({ name: 'Ambulance Unit', unit: 'ambulance', eta: hospitalEta })
      }

      // Step 5 — Save to MongoDB
      const emergency = await Medical.create({
        emergencyId,
        stadiumName: stadium,
        location: { zone, coordinates: location },
        severity,
        patientCount,
        incidentType,
        status: 'responding',
        responders,
        hospitalName: nearestHospital.name,
        hospitalEta,
      })

      // Step 6 — Log execution
      await ExecutionLog.create({
        agentName: 'medicalAgent',
        toolUsed: 'medicalTool',
        action: 'emergency_dispatched',
        input: { stadium, severity, incidentType, zone, patientCount },
        output: {
          emergencyId,
          responders: responders.length,
          hospitalName: nearestHospital.name,
          hospitalEta
        },
        status: 'success',
        executionTime: Date.now() - startTime
      })

      return JSON.stringify({
        emergencyId,
        status: 'responding',
        stadium,
        zone,
        severity,
        incidentType,
        patientCount,
        responders,
        nearestHospital: {
          name: nearestHospital.name,
          etaMinutes: hospitalEta
        },
        message: `🚨 Emergency ${emergencyId} — ${severity.toUpperCase()} incident at ${stadium} Zone ${zone}. ${responders.length} responders dispatched. Nearest hospital: ${nearestHospital.name} (${hospitalEta} mins)`
      })

    } catch (error) {
      await ExecutionLog.create({
        agentName: 'medicalAgent',
        toolUsed: 'medicalTool',
        action: 'emergency_failed',
        input: { stadium, severity, incidentType },
        status: 'failed',
        reason: error.message,
        executionTime: Date.now() - startTime
      })
      throw new Error(`Medical tool failed: ${error.message}`)
    }
  },
  {
    name: "medical_emergency",
    description: "Handles medical emergencies at stadiums. Dispatches responders, finds nearest hospitals, calculates ETA. Use immediately when any medical incident is reported.",
    schema: z.object({
      stadium: z.string().describe("Stadium name where emergency occurred"),
      severity: z.enum(['low', 'medium', 'high', 'critical']).describe("Severity of the medical emergency"),
      incidentType: z.enum(['injury', 'cardiac', 'heatstroke', 'stampede', 'other']).describe("Type of medical incident"),
      zone: z.string().describe("Zone or gate number where incident occurred e.g Gate A, Zone 3"),
      patientCount: z.number().describe("Number of patients involved")
    })
  }
)

export { medicalTool }
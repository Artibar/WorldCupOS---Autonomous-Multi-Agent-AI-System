
import { tool } from '@langchain/core/tools';
import axios from 'axios';
import * as z from 'zod'

const mapTool = tool(
    async ({origin, destination}) => {
       try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json",
            {
                params: {
                    origin,
                    destination,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                },

            },
        )
        // no routes found
        if(!response.data.routes|| response.data.routes.length === 0){
            return JSON.stringify({
                success: false,
                message: "No route found", 
            });
        }
        const route = response.data.routes[0];
        const leg = route.legs[0];

        return JSON.stringify({
           success: true,
           routeSummary: route.summary,
           startAddress: leg.start_address,
           endAddress: leg.end_address,
           distance: leg.distance.text,
           duration: leg.duration.text,
           steps: leg.steps.map((step)=>({
            instruction: step.html_instructions,
            distance: step.distance.text,
            duration: step.duration.text,
           })),
        });

       } catch (error) {
         return JSON.stringify({
            success: false,
            message: "map tool failed",
            error: error.message
         })
       }
    },
    {
        name: "Get route direction",
        description: " get real-time travel directions, route distance, and ETA between two locations",
        schema: z.object({
           origin: z.string().describe("Starting location for travel"),
           destination: z.string().describe("Destination location")
        }),
    }
);
export default mapTool;
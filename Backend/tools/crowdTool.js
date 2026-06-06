
import {tool} from '@langchain/core/tools'
import axios from 'axios';

import  *as z from 'zod';

const crowdTool = tool(
    async({location})=>{
       const response = await axios.get(`https://worldcup26.ir/get/stadium`)
       return {crowdLeved: "high", location}
    },
    {
        name: "Predict crowd density at a stadium location",
        description: "",
        schema: z.object({
           location: z.string().describe("Stadium or  city name to check crowd levels")
        })
    }
)

export default crowdTool;
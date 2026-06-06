import axios from 'axios'
import {tool} from "@langchain/core/tools"
import * as z from 'zod'

const weatherTool = tool(
    async({city})=>{
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
       return{
        weather: response.data.weather[0].main,
        temperature: response.data.main.temp,
       };
    },
    {
    name: "get Weather",
    description :"Get current weather of a city",
    schema : z.object({city: z.string().describe("Get current weather of a city")})
    }
)
export default weatherTool
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import "dotenv/config";

const mcpClient = new MultiServerMCPClient({
    mongo: {
        transport: 'stdio',
        command: 'npx',
        args: ["mongodb-mcp-server"],
        env: {
            MDB_MCP_CONNECTION_STRING: process.env.MONGODB_URI
        }
    },
    //World cup Live Data

    worldcup:{
        transport: 'http',
        url: 'https://worldcup26.ir',
    },

    //map - for stadium routing
    maps:{
        transport: 'stdio',
        command: 'npx',
        args:["-y", "@modelcontextprotocol/server-google-maps"],
        env:{
            GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
        }
    }

})

export default mcpClient;


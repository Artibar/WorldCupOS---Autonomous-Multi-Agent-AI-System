import mongoose from "mongoose"

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connection successful")
    } catch (error) {
        console.log("MongoDb connection failed", error)
        process.exit(1)
    }
}
export default connectToDB;
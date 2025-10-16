import mongoose from "mongoose";



const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB Connected")
    } catch (error) {
        console.error("Connection Error")
    }
}

export default ConnectDB
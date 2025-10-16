import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Config/db.js'
import UserRouter from './routes/Userrouter.js'


const app = express();
dotenv.config();
app.use(cors())
ConnectDB();
app.use(express.json())
app.use('/api/User', UserRouter)
app.get('/', (req,res)=>{
    res.send("Api is Running...")
})

const PORT= process.env.PORT || 3500
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
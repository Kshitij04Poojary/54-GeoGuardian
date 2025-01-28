const express=require('express')
const helmet=require('helmet')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')

const app=express()
require('dotenv').config();


app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err)
})

const authRouter=require('./routers/authRouter')
app.use('/api/auth',authRouter)


app.get('/',(req,res)=>{
    res.json({message:"Hello from the server"})
})
// console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log('listening....');
})
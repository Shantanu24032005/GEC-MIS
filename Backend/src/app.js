import express from "express"
import cors from "cors"

const app=express()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('api/auth')


export default app;
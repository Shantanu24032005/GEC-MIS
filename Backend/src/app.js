import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

import authRoutes from './routes/auth.routes.js'
import detailsRoutes from './routes/details.routes.js'

const app=express()

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieparser)

//routes
app.use('/api/auth',authRoutes)
app.use('/api/details',detailsRoutes)

export default app;
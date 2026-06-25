import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import errormiddleware from "./middleware/error.middleware.js"
import Authroutes from "./routes/auth.routes.js"
import Userroutes from "./routes/user.routes.js"
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use("/api/auth",Authroutes)
app.use("/api/user",Userroutes)

app.use(errormiddleware)

export default app
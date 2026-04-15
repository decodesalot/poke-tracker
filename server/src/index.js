import "dotenv/config"
import express from "express"
import cors from "cors"
import chatRouter from "./routes/chat.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

app.use("/chat", chatRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

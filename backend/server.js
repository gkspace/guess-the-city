import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";

import authRoutes from "./routes/auth.js"; // Add `.js`
import gameRoutes from "./routes/game.js"; // Add `.js`


config()

const app = express()

// Middleware
app.use(cors())
app.use(json())

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/game", gameRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
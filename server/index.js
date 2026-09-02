import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import schemeRoutes from "./routes/schemes.js";
import recommendationRoutes from "./routes/recommendations.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ ok: true, service: "saarthi-api" }));
app.use("/api/schemes", schemeRoutes);
app.use("/api/recommendations", recommendationRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err.message));
} else {
  console.log("MONGODB_URI not set — running API without database connection.");
}

app.listen(PORT, () => console.log(`SAARTHI API running on ${PORT}`));
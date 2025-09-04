import express from "express";
import cors from "cors";
import activitiesRouter from "./routes/activities";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
    res.json({status: "Backend is running 🚀"});
});

//Activities routes
app.use("/api/activities", activitiesRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8080/api/health');
});
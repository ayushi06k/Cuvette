import express from "express";
import cors from "cors";
import pkg from "pg";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg; 

const jobsPool = new Pool({
    connectionString: process.env.DATABASE_URL_JOBS,
});

const otherJobsPool = new Pool({
    connectionString: process.env.DATABASE_URL_OTHERJOBS,
});

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API to fetch full-time jobs
app.get("/api/jobs", async (req, res) => {
    try {
        console.log("Received request for /api/jobs");
        const result = await jobsPool.query("SELECT * FROM jobs");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// API to fetch only LinkedIn URLs from other_jobs
app.get("/api/other_jobs/links", async (req, res) => {
    try {
        console.log("Received request for /api/other_jobs/links");
        const result = await otherJobsPool.query("SELECT linkedin_url FROM other_jobs WHERE linkedin_url IS NOT NULL");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching LinkedIn URLs:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

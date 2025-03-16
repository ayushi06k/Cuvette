require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT 
  });
  

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

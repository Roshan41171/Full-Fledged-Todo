import express from "express";
import dotnev from "dotenv";
dotnev.config();
import cors from "cors";

const CORS_ORIGIN1 = String(process.env.CORS_ORIGIN1);
const CORS_ORIGIN2 = String(process.env.CORS_ORIGIN2);

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Backend is healthy and running.",
  });
});

app.use(
  cors({
    origin: [CORS_ORIGIN1, CORS_ORIGIN2],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

import todoRouter from "./routes/todo.route";
app.use("/api", todoRouter);

app.use("/", (req, res) => {
  res.json("Hello from backend ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running in the port ${PORT}`);
});

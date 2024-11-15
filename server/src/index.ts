import express from "express";
import dotnev from "dotenv";
dotnev.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "Backend is healthy and running.",
  });
});

import todoRouter from "./routes/todo.route";
app.use("/api", todoRouter);

app.use("/", (req, res) => {
  res.json("Hello from backend ");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running in the port ${PORT}`);
});

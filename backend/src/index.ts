// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import { MongoClient } from "mongodb";
import { connectToDatabase, connectWithMongoose } from "./utils/database.js";
import User from "./models/user.js";


dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB connection string (MONGODB_URI) is not defined");
}

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

connectToDatabase(); // MongoClient connection
connectWithMongoose(); // Mongoose connection
// Connect to MongoDB using Mongoose

app.use("/api/auth", authRoutes);
const client = new MongoClient(uri);
app.get("/users", async () => {
  await client.connect();
  console.log("tjsi is run");
  const result = await User.find({});
  console.log("result", result);
});

app.get("/", (req: Request, res: Response) => {
  res.send("my dserver + your server Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

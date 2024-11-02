import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
// Import route modules
import authRoutes from "./routes/authRoutes.js";
// Import MongoDB connection utility

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MongoDB connection string (MONGO_URI) is not defined");
}

const client = new MongoClient(uri);
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

// const createUser = async () => {
//   const user = new User({
//     name: "Easd",
//     email: "asdWasd@sda.com",
//     password: "123qweASD",
//     role: "USER",
//   });
//   const result = await user.save();
//   console.log("result", result);
// };
// createUser();
// Home route
app.get("/", (req, res) => {
  res.send("Hello, this is the backend server!");
});

// Test route
app.get("/test", (req, res) => {
  res.send("Hello, this is the backend server test!");
});

// Export the app
export default app;

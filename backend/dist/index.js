var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/index.ts
import express from "express";
import dotenv from "dotenv";
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
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
connectToDatabase(); // MongoClient connection
connectWithMongoose(); // Mongoose connection
// Connect to MongoDB using Mongoose
app.use("/api/auth", authRoutes);
const client = new MongoClient(uri);
app.get("/users", () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("tjsi is run");
    const result = yield User.find({});
    console.log("result", result);
}));
app.get("/", (req, res) => {
    res.send("my dserver + your server Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

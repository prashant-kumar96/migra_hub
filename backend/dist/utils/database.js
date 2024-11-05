// src/utils/database.ts
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MongoDB connection string (MONGODB_URI) is not defined");
}
const client = new MongoClient(uri);
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB using MongoClient");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
// Connect to MongoDB with Mongoose
async function connectWithMongoose() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB using Mongoose");
    }
    catch (error) {
        console.error("Error connecting to MongoDB with Mongoose:", error);
        process.exit(1);
    }
}
export { client, connectToDatabase, connectWithMongoose };

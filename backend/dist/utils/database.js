var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB using MongoClient");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    });
}
// Connect to MongoDB with Mongoose
function connectWithMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(uri);
            console.log("Connected to MongoDB using Mongoose");
        }
        catch (error) {
            console.error("Error connecting to MongoDB with Mongoose:", error);
            process.exit(1);
        }
    });
}
export { client, connectToDatabase, connectWithMongoose };

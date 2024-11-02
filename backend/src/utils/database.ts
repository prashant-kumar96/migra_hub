import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection setup
const uri: any = process.env.MONGODB_URI;
console.log("uri", uri);
const client = new MongoClient(uri);

let db: any;

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to remote MongoDB");
    db = client.db(process.env.DB_DATABASE);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export { db }; // Explicitly export db

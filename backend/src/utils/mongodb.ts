import mongoose from "mongoose";

const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/whatsapp-orders";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      useNewUrlParser: true,
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose.connection;
      });
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;

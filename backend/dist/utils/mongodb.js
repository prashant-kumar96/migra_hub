var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/whatsapp-orders";
console.log("mongo_Db", MONGODB_URI);
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
global.mongoose = global.mongoose || { conn: null, promise: null };
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
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
        global.mongoose.conn = yield global.mongoose.promise;
        return global.mongoose.conn;
    });
}
export default dbConnect;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const user_js_1 = __importDefault(require("./models/user.js"));
const mongodb_1 = require("mongodb");
const database_js_1 = require("./utils/database.js");
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
console.log(uri);
if (!uri) {
    throw new Error("MongoDB connection string (MONGODB_URI) is not defined");
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 3000;
(0, database_js_1.connectToDatabase)(); // MongoClient connection
(0, database_js_1.connectWithMongoose)(); // Mongoose connection
// Connect to MongoDB using Mongoose
app.use("/api/auth", authRoutes_js_1.default);
const client = new mongodb_1.MongoClient(uri);
app.get("/users", () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("tjsi is run");
    const result = yield user_js_1.default.find({});
    console.log("result", result);
}));
app.get("/", (req, res) => {
    res.send("my dserver + your server Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

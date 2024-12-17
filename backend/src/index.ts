//@ts-nocheck

// src/index.ts

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import visaDataRoutes from "./routes/visaDataRoutes.js";
import personalDataRoutes from "./routes/personalDataRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import caseManagerRoutes from "./routes/caseManagerRoutes.js";
import { MongoClient } from "mongodb";
import { connectToDatabase, connectWithMongoose } from "./utils/database.js";
import User from "./models/User.js";
import Stripe from "stripe";
import serveStaticFiles from "./staticfiles";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB connection string (MONGODB_URI) is not defined");
}

const app: Express = express();
serveStaticFiles(app);
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert dollars to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    console.log("session", session);
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/retrieve-session", async (req, res) => {
  const { sessionId, userId } = req.body;

  console.log("retrieve-session is run ");
  console.log("session Id : ", sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    if (session) {
      const result = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            stripePaymentSessionId: sessionId,
            isStripePaymentDone: true,
          },
        },
        { new: true }
      );

      console.log(result);
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("Error retrieving session:", error.message);
    res.status(500).json({ error: "Unable to retrieve session details" });
  }
});

connectToDatabase(); // MongoClient connection
connectWithMongoose(); // Mongoose connection
// Connect to MongoDB using Mongoose

app.use("/api/auth", authRoutes);
app.use("/api/visaData", visaDataRoutes);
app.use("/api/personalData", personalDataRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/caseManager", caseManagerRoutes);

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

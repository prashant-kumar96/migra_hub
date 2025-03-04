import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import visaDataRoutes from "./routes/visaDataRoutes.js";
import personalDataRoutes from "./routes/personalDataRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import caseManagerRoutes from "./routes/caseManagerRoutes.js";
import familyMemberRoutes from "./routes/famillyMemberRoutes.js";
import applicationStatusRoutes from "./routes/applicationStatusRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import { MongoClient } from "mongodb";
import { connectToDatabase, connectWithMongoose } from "./utils/database.js";
import User from "./models/User.js";
import Stripe from "stripe";
import ApplicationStatus from "./models/applicationStatus.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB connection string (MONGODB_URI) is not defined");
}

const app: Express = express();

// Serve static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;
  console.log("req body", req.body);
  console.log("items", items);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item?.name ? item?.name : "Primary",
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
  console.log('user id',userId)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    if (session) {
      const result = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            stripePaymentSessionId: sessionId,
            isStripePaymentDone: true,
            payment: true,
          },
        },
        { new: true }
      );

      if (result && result.applicationId) {
        const applicationStatus = await ApplicationStatus.findOne({
          applicationId: result.applicationId,
        });
        if (applicationStatus) {
          await ApplicationStatus.updateOne(
            { _id: applicationStatus._id },
            { $set: { payment: "completed" } }
          );
        }

        // Update payment status for all linked family members
        const familyMembers = await User.find({
          primaryApplicationId: result.applicationId,
          _id: { $ne: userId },
        });
        for (const familyMember of familyMembers) {
          await User.updateOne(
            { _id: familyMember._id },
            { $set: { payment: true, isStripePaymentDone: true } }
          );
        }
      }

      console.log(result, "result");
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
app.use("/api/family-member", familyMemberRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/application-status", applicationStatusRoutes);

const client = new MongoClient(uri);
app.get("/users", async (req: Request, res: Response) => {
  try {
    await client.connect();
    console.log("tjsi is run");
    const result = await User.find({});
    console.log("result", result);

    // Construct a more styled HTML response
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>MigraHub Users</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h1 {
                    color: #007bff;
                    text-align: center;
                    margin-bottom: 20px;
                }
                 .user-card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px; /* Spacing between cards */
                  }
                  .user-card {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    width: 300px; /* Fixed card width */
                    display: flex;
                    flex-direction: column;
                   
                  }
                .user-card h2{
                    margin-bottom: 15px;
                    color:#333;
                    font-weight: 600;
                  }
                  .user-card h4 {
                     margin-bottom: 10px;
                     color: #555;
                  }

                
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <h1>MigraHub Users</h1>
            <div class="user-card-container">
            ${result
              .map(
                (user) => `
                     <div class="user-card">
                        <h2>${user.name}</h2>
                        <h4>Email: ${user.email}</h4>
                        <h4>ID: ${user._id}</h4>
                        <!-- Add more user details here -->
                     </div>
                   `
              )
              .join("")}
             </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} MigraHub API</p>
            </div>
        </body>
        </html>
    `;

    res.status(200).send(htmlResponse);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("<h1>Error Fetching Users</h1>");
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MigraHub API</title>
         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <style>
             body {
                font-family: 'Roboto', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                 text-align: center;
            }
             h1{
                color: #007bff;
                margin-bottom: 20px;

             }
             p {
                 font-size: 1.1em;
                 color: #555;
             }

             .footer{
                 margin-top: 30px;
                text-align: center;
                font-size: 0.9em;
                color: #777;
             }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to MigraHub API</h1>
            <p>This API provides services for user authentication, visa data management, document handling, and more.</p>
            <div class="footer">
                <p>© ${new Date().getFullYear()} MigraHub API</p>
            </div>
            </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

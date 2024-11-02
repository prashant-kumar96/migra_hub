// authenticate
// Import the 'dotenv' package
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// Configure dotenv to load environment variables from the .env file
dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET; // Make sure to set this in your environment variables

const verifyToken = (req: any, res: any, next: any) => {
  console.log("verifyToken is run");
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("Token is required");
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to the request object
    console.log(decoded, "decoded");
    next();
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;

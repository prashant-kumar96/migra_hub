//@ts-ignore
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import VisaData from "../models/visadata.js";
import ObjectId from "mongoose";
import axios from 'axios';



async function login(req: any, res: any) {
  console.log("login is run");
  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      token,
      user: { username: user.username, id: user._id, role: user.role },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function register(req: any, res: any) {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  console.log("req body", req.body);
  // return;
  const { email, password, name, role, data } = req.body;
  if (!data) {
    res.status(400).json({
      message:
        "Please fill all the steps from the index page before registering",
      extraInfo: "Info Incomplete",
    });
  } else {
    console.log("/register is run");
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const visadata = new VisaData(data);
      const resultVisadata = await visadata.save();
      console.log("resultVisaData", resultVisadata);

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        role,
        name,
        visaDataId: resultVisadata._id,
      });
      const result = await user.save();
      console.log(result, "result");

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({
        token,
        user: {
          email: user.email,
          id: user._id,
          message: "User registered successfully",
          role: user.role,
        },
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

// google login
async function googleLogin(req: any, res: any) {
  try {
      const { accessToken, email, name, googleId } = req.body;

      if (!accessToken || !email || !name || !googleId) {
          return res.status(400).json({ message: 'Missing required fields' });
      }
      // Verify the Google access token
        const googleApiUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`;
        try{
           const googleRes = await axios.get(googleApiUrl);
           if(googleRes.data.email!==email) {
               return res.status(401).json({ message: 'Invalid Google token' });
           }
        }
        catch(err){
          console.log(err,"google error")
          return res.status(401).json({ message: 'Invalid Google token' });

        }


  
    let user = await User.findOne({ email: email });
    
    console.log('google user',user)
    if (!user) {
        // User doesn't exist, create a new user
        user = new User({
            email: email,
            name: name,
            googleId: googleId,
            // set a default password or don't set one
        });
      await user.save();
    }

      // Generate JWT for your application
    const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({
          token,
          user: {
              username: user.name,
              id: user._id,
              role: user.role, // Assuming you might store roles 
          },
      });

  } catch (error) {
      console.log('Error during Google login', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

const isValidObjectId = (id: any) => {
  return mongoose.Types.ObjectId.isValid(id);
};

async function editUser(req: any, res: any) {
  // console.log("id", req.query.id);
  console.log(req.body);
  console.log("editUser is run");
  const { id, name, username } = req.body.userDetails;
  try {
    if (!id) {
      res.status(400).json({ message: "Please provide id in query" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }
    const result = await User.findByIdAndUpdate(id, { name, username });
    console.log(result);
    if (!result) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User Edited Successfully" });
    }
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req: any, res: any) {
  console.log("id", req.query.id);
  console.log("deleteUser is run");

  try {
    if (!req.query.id) {
      res.status(400).json({ message: "Please provide id in query" });
    }
    if (!isValidObjectId(req.query.id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }
    const result = await User.findByIdAndDelete(req.query.id);
    console.log(result);
    if (!result) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted Successfully" });
    }
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message });
  }
}

async function changePassword(req: any, res: any) {
  console.log("id", req.query.id);
  console.log("changePassword is run");
  console.log(req.body);
  const { userID, oldPassword, newPassword } = req.body;
  try {
    const user: any = await User.findOne({ _id: userID });
    console.log(user);
    // return;
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Old password is incorrect", status: 400 });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password changed successfully", status: 200 });
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message, status: 400 });
  }
}

async function getUsersWhoHaveDonePayment(req: any, res: any) {
  try {
    // Assuming the token payload contains the user ID
    const user = await User.find({ isStripePaymentDone: true })
      .select("-password")
      .populate("assignedCaseManagerId");

    console.log("user", user);

    // const caseManagerData = await User.findById({
    //   _id: user[0].assignedCaseManagerId,
    // });

    // console.log("caseManagerData", caseManagerData);
    // const user = await User.aggregate([
    //   {
    //     $match: {
    //       isStripePaymentDone: true,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "User",
    //       localField: "assignedCaseManagerId",
    //       foreignField: "_id",
    //       as: "caseManagerData",
    //     },
    //   },
    //   {
    //     $match: {
    //       _id: Mongoose0.Types.ObjectId("yourOriginalDocumentId"), // Filter for the specific original document
    //     },
    //   },
    // ]);

    // console.log("user getUsersWhoHaveDonePayment", user);
    // return;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "Users fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCaseManagers(req: any, res: any) {
  try {
    // Assuming the token payload contains the user ID
    const user = await User.find({ role: "CASE_MANAGER" }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Case Managers not found" });
    }
    res.json({
      message: "Case Managers fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createCaseManager(req: any, res: any) {
  console.log("req body", req.body);
  // return;
  const { email, password, name, role } = req.body;

  console.log("/register is run");
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Case Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
    });

    const result = await user.save();
    console.log(result, "result");

    res.status(200).json({
      user: {
        email: user.email,
        id: user._id,
        message: "Case Manager Created successfully",
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function me(req: Request, res: Response) {
  try {
      console.log(req.user, "req.user");
  const decoded = req.user;
  if (!decoded || !decoded.id) {
    console.warn("Unauthorized: No valid user in request.");
    return res.status(200).json({ status: false, message: "Unauthorized: No valid user in request." , user: null });
  }

  const userId = decoded.id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
      console.warn(`User not found for ID: ${userId}`)
      return res.status(200).json({ status: false, message: "User not found", user: null });
  }

  res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      user: user,
  });
} catch (error: any) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ status: false, message: "Internal server error", user: null });
}
}

async function checkifPaymentIsDone(req: any, res: any) {
  try {
    console.log("Checking if payment is done is run");
    // Assuming the token payload contains the user ID
    const user = await User.findOne({ _id: req.query?.userId }).select(
      "-password"
    );
    if (user?.isStripePaymentDone === true) {
      res.status(200).json({
        message: "Stripe payment done",
        status: true,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Stripe payment Not done", status: false });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  login,
  googleLogin,
  register,
  deleteUser,
  editUser,
  changePassword,
  me,
  getUsersWhoHaveDonePayment,
  createCaseManager,
  getCaseManagers,
  checkifPaymentIsDone,
};

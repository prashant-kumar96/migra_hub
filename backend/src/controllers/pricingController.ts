// seedPricing.ts
import mongoose from "mongoose";
import Pricing from "../models/pricing.js"; // Adjust the path as needed
import User from "../models/User.js";



export const getPricingData = async (req: any, res: any) => {
    try {
      const pricing = await Pricing.findOne({});
      if (pricing) {
        res.status(200).json({
          message: "Pricing data fetched successfully",
          pricing,
        });
      } else {
        res.status(404).json({ message: "Pricing data not found" });
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      res.status(500).json({ message: "Internal server error", error: error });
    }
  };


  export const getApplicationCharges = async (req: any, res: any) => {
    try {
        const primaryApplicantId = req.params.userId; // Get from params
        console.log("primaryApplicantId::", primaryApplicantId);

        // Check if the primary applicant exists
        const primaryApplicant = await User.findById(primaryApplicantId);
        if (!primaryApplicant) {
            return res.status(404).json({ message: "Primary applicant not found" });
        }
        if(!primaryApplicant.applicationId){
            return res.status(400).json({ message: "Primary application id is missing" });
        }

        const familyMembers = await User.find({
            primaryApplicationId: primaryApplicant.applicationId,
            _id: { $ne: primaryApplicantId } // Exclude primary applicant
        });

        const pricing = await Pricing.findOne({});
        if (!pricing) {
            return res.status(404).json({ message: "Pricing data not found" });
        }

        const primaryApplicantPrice = pricing.primaryApplicantPrice;
        const familyMemberPrice = pricing.familyMemberPrice;
        const numberOfFamilyMembers = familyMembers.length;
        const totalAmount = primaryApplicantPrice + (numberOfFamilyMembers * familyMemberPrice);

        const applicationCharges = {
            primaryApplicant: {
                name: primaryApplicant.name,
                price: primaryApplicantPrice,
                quantity: 1,
                payment: primaryApplicant.payment
            },
            familyMembers: familyMembers.map((member) => ({
                name: member.name,
               price: familyMemberPrice,
                 quantity: 1,
                 payment: member.payment,
                  relationship: member.relationship
             })),
        };

        res.status(200).json({
            message: "Application charges calculated successfully",
            totalAmount: totalAmount,
            numberOfApplications: numberOfFamilyMembers + 1,
            applicationCharges: applicationCharges,
        });
    } catch (error) {
        console.error("Error calculating application charges:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};


// const seedPricing = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string); // Replace with your MongoDB connection string

//     const existingPricing = await Pricing.findOne({});
//     if (!existingPricing) {
//       const newPricing = new Pricing({
//         primaryApplicantPrice: 145,
//         familyMemberPrice: 45,
//       });
//       await newPricing.save();
//       console.log("Pricing data seeded successfully.");
//     } else {
//       console.log("Pricing data already exists.");
//     }
//   } catch (error) {
//     console.error("Error seeding pricing data:", error);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

// seedPricing();
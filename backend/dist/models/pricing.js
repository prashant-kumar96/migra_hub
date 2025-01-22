// pricing.model.ts
import mongoose, { Schema } from "mongoose";
const pricingSchema = new Schema({
    primaryApplicantPrice: { type: Number, required: true },
    familyMemberPrice: { type: Number, required: true },
});
const Pricing = mongoose.model("Pricing", pricingSchema);
export default Pricing;

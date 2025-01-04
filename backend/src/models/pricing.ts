// pricing.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IPricing extends Document {
  primaryApplicantPrice: number;
  familyMemberPrice: number;
}

const pricingSchema: Schema<IPricing> = new Schema({
  primaryApplicantPrice: { type: Number, required: true },
  familyMemberPrice: { type: Number, required: true },
});

const Pricing = mongoose.model<IPricing>("Pricing", pricingSchema);

export default Pricing;
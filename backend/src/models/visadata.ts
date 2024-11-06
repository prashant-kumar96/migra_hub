import mongoose, { Document, Schema } from "mongoose";

export interface IVisaData extends Document {
  areYouApplyingFromPassportCountry: Boolean;
  citizenshipCountry: String;
  deniedVisaToUs: Boolean;
  destinationCountry: String;
  haveSpouseOrProperty: Boolean;
  passportCountry: String;
  travelledInternationallyAndReturnedHome: Boolean;
  whereWillYouApplyForYourVisa: String;
  createdAt: Date;
  updatedAt: Date;
}

const visaDataSchema: Schema<IVisaData> = new Schema({
  areYouApplyingFromPassportCountry: {
    type: String,
  },
  citizenshipCountry: {
    type: String,
    required: [true, "Citizenship Country is required"],
  },
  deniedVisaToUs: {
    type: Boolean,
    required: [true, "Denied Visa To Us is required"],
  },
  destinationCountry: {
    type: String,
    required: [true, "Destination Country is required"],
  },
  haveSpouseOrProperty: {
    type: String,
    required: [true, "Have Spouse Or Property is required"],
  },
  passportCountry: {
    type: String,
  },
  travelledInternationallyAndReturnedHome: {
    type: String,
    required: [true, "Travelled Internationally And Returned Home is required"],
  },
  whereWillYouApplyForYourVisa: {
    type: String,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VisaData = mongoose.model<IVisaData>("VisaData", visaDataSchema);

export default VisaData;

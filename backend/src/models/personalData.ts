import mongoose, { Document, ObjectId, Schema } from "mongoose";


// Define an interface for the profile data
interface IPersonalData extends Document {
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  gender: "Male" | "Female" | "Other";
  terms: boolean;
  first_name: string;
  last_name: string;
  passport_number: string;
  passport_expiry: Date;
  zipCode: string;
  email: string;
  phoneNumber: string;
  addressLine: string;
  addressData: {
    city: string;
    country: string;
    state: string;
  };
  citizenshipCountry: {
    value: string;
    label: string;
  };
  userId: ObjectId;
}


// Define the schema with validation
const PersonalDataSchema: Schema<IPersonalData> = new Schema({
  marital_status: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
    validate: {
      validator: (value: boolean) => value === true,
      message: "Terms must be accepted",
    },
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  passport_number: {
    type: String,
    required: [true, "Passport number is required"],
    unique: true,
    trim: true,
    minlength: [3, "Passport number must be at least 3 characters long"],
  },
  passport_expiry: {
    type: Date,
    required: [true, "Passport expiry date is required"],
    validate: {
      validator: (value: Date) => value > new Date(),
      message: "Passport expiry date must be in the future",
    },
  },
  zipCode: {
    type: String,
    required: [true, "Zip code is required"],
    match: [/^\d{5,6}$/, "Zip code must be 5-6 digits"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    // match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  addressLine: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    minlength: [5, "Address must be at least 5 characters long"],
  },
  addressData: {
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
  },
  citizenshipCountry: {
    value: {
      type: String,
      required: [true, "Citizenship country value is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Citizenship country label is required"],
      trim: true,
    },
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});


// Export the model
const PersonalData = mongoose.model<IPersonalData>(
  "PersonalData",
  PersonalDataSchema
);


export default PersonalData;

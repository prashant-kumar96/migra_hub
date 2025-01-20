import mongoose, { Document, ObjectId, Schema } from "mongoose";


// Define an interface for the profile data
interface IPersonalData extends Document {
  marital_status: "Single" | "Married" | "Divorced" | "Widowed";
  gender: "Male" | "Female" | "Other";
  terms: boolean;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: Date;
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
    required: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: false,
  },
  terms: {
    type: Boolean,
    required: false,
    validate: {
      validator: (value: boolean) => value === true,
      message: "Terms must be accepted",
    },
  },
  first_name: {
    type: String,
    required: [false, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  middle_name: {
    type: String,
    required: [false, "Middle name is required"],
    trim: true,
    minlength: [2, "Middle name must be at least 2 characters long"],
  },
  last_name: {
    type: String,
    required: [false, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  dob: {
    type: Date,
    required: [false, "DOB is required"],
    trim: true,
     validate: {
      validator: (value: Date) => value > new Date(),
      message: "Passport expiry date must be in the future",
    },
  },

  passport_number: {
    type: String,
    required: [false, "Passport number is required"],
    unique: true,
    trim: true,
    minlength: [3, "Passport number must be at least 3 characters long"],
  },
  passport_expiry: {
    type: Date,
    required: [false, "Passport expiry date is required"],
    validate: {
      validator: (value: Date) => value > new Date(),
      message: "Passport expiry date must be in the future",
    },
  },
  zipCode: {
    type: String,
    required: [false, "Zip code is required"],
    match: [/^[a-zA-Z0-9]{5,6}$/, "Zip code must be 5-6 digits"],
  },
  email: {
    type: String,
    required: [false, "Email is required"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: false,
    sparse: true,
    unique: true,
    // default: undefined, // This is important - use undefined instead of null
    // match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  addressLine: {
    type: String,
    required: [false, "Address is required"],
    trim: true,
    // minlength: [5, "Address must be at least 5 characters long"],
  },
  addressData: {
    city: {
      type: String,
      required: [false, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [false, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [false, "State is required"],
      trim: true,
    },
  },
  citizenshipCountry: {
    value: {
      type: String,
      required: [false, "Citizenship country value is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [false, "Citizenship country label is required"],
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

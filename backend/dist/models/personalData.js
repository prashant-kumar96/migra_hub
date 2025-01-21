import mongoose from "mongoose";
import moment from "moment";

const { Schema } = mongoose;

// Define the schema with validation
const PersonalDataSchema = new Schema({
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
        default: false,
        validate: {
            validator: (value) => value === true,
            message: "Terms must be accepted",
        },
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "First name must be at least 2 characters long"],
    },
    middle_name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Middle name must be at least 2 characters long"],
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Last name must be at least 2 characters long"],
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const age = moment().diff(moment(value), "years");
                return age >= 18;
            },
            message: "User must be at least 18 years old",
        },
    },
    passport_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, "Passport number must be at least 3 characters long"],
    },
    passport_expiry: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value > new Date(),
            message: "Passport expiry date must be in the future",
        },
    },
    zipCode: {
        type: String,
        required: true,
        match: [/^\d{5,6}$/, "Zip code must be 5-6 digits"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    addressLine: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Address must be at least 5 characters long"],
    },
    addressData: {
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
    },
    citizenshipCountry: {
        value: {
            type: String,
            required: true,
            trim: true,
        },
        label: {
            type: String,
            required: true,
            trim: true,
        },
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

// Export the model
const PersonalData = mongoose.model("PersonalData", PersonalDataSchema);

export default PersonalData;

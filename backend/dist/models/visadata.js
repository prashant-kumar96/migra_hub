import mongoose, { Schema } from "mongoose";
const visaDataSchema = new Schema({
    areYouApplyingFromPassportCountry: {
        type: String,
    },
    citizenshipCountry: {
        type: {},
        required: [false, "Citizenship Country is required"],
    },
    deniedVisaToAnyCountry: {
        type: Boolean,
        required: [false, "Denied Visa In Last 90 Days is required"],
    },
    destinationCountry: {
        type: {},
        required: [false, "Destination Country is required"],
    },
    haveSpouseOrProperty: {
        type: String,
        required: [false, "Have Spouse Or Property is required"],
    },
    passportCountry: {
        type: {},
    },
    travelledInternationallyAndReturnedHome: {
        type: String,
        required: [false, "Travelled Internationally And Returned Home is required"],
    },
    whereWillYouApplyForYourVisa: {
        type: {},
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const VisaData = mongoose.model("VisaData", visaDataSchema);
export default VisaData;

import mongoose, { Schema } from "mongoose";
const userDocumentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    passportImages: { type: [] },
    proofOfFundsImages: { type: [] },
    proofOfTiesImages: { type: [] },
    additionalDocuments: { type: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
const UserDocument = mongoose.model("Document", userDocumentSchema);
export default UserDocument;

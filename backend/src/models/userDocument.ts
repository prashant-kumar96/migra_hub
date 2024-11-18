import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUserDocument extends Document {
  userId: ObjectId;
  passportImages: [];
  proofOfFundsImages: [];
  proofOfTiesImages: [];
  additionalDocuments: [];
  createdAt: Date;
  updatedAt: Date;
}

const userDocumentSchema: Schema<IUserDocument> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  passportImages: { type: [] },
  proofOfFundsImages: { type: [] },
  proofOfTiesImages: { type: [] },
  additionalDocuments: { type: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserDocument = mongoose.model<IUserDocument>(
  "Document",
  userDocumentSchema
);

export default UserDocument;

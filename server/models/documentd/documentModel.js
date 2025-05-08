import mongoose from "mongoose";
import { DOCUMENT_STATUS } from "../../utils/constants.js";

const documentSchema = new mongoose.Schema(
  {
    documentName: {
      type: String,
      required: true,
      trim: true,
    },
    documentID:{
      type:String,
      required:true,
      trim:true
    },
    avatar: {
      type: String,
    },
    avatarPublicId: {
      type: String,
    },
    status: {
      type: String,
      enum: [DOCUMENT_STATUS.PENDING, DOCUMENT_STATUS.APPROVED, DOCUMENT_STATUS.REJECTED],
      default: DOCUMENT_STATUS.PENDING,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;

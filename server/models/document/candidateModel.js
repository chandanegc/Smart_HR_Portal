import mongoose from "mongoose";
import { DOCUMENT_STATUS } from "../../utils/constants.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: String,
  employeeId: {
    type: String,
  },
  location: {
    type: String,
    default: "my city",
  },
  companyName: {
    type: String,
  },
  role: {
    type: String,
    enum: ["candidate", "hr", "admin"],
    default: "candidate",
  },
  avatar: String,
  avatarPublicId: String,
  status: {
    type: String,
    enum: [
      DOCUMENT_STATUS.PENDING,
      DOCUMENT_STATUS.APPROVED,
      DOCUMENT_STATUS.REJECTED,
    ],
    default: DOCUMENT_STATUS.PENDING,
  },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  registeredBy:{
    type:String,
    required:true
  }
});

// remove password (select)
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const candidate  = mongoose.model("Candidate", UserSchema);
export default candidate;

import mongoose from "mongoose";

const hrSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  companyName: String,
  email:{
    type: String,
    unique: true,
  },
  password: String,
  location: String,
  role: {
    type: String,
    enum: ["candidate", "hr", "admin"],
    default: "hr",
  },
  avatar: String,
  avatarPublicId: String,
  emailSecret: String,
});

// remove password (select)
hrSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Hr", hrSchema);

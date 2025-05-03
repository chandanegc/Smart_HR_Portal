import mongoose from "mongoose";

const saveTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
}, {
  timestamps: true,
});


const SaveTemplateModel = mongoose.model("SaveTemplate", saveTemplateSchema);

export default SaveTemplateModel;

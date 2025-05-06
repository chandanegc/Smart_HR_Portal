import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  pdfUrl: {
    type: String,
    required: true,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hr",
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);
export default Calendar;

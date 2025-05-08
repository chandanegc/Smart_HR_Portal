import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    leaveType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    leaveReason: {
      type: String,
      required: true,
    },
    selectedDates: {
      type: [Date],
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Candidate",
    },
    hrName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;

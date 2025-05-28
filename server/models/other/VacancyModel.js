import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    benefits: String,
    aboutCompany: { type: String, required: true },
    contactEmail: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Vacancy = mongoose.model("Vacancy", jobSchema);
export default Vacancy;

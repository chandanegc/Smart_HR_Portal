import cloudinary from "cloudinary";
import fs from "fs";
import Calendar from "../../models/other/calendarModel.js";

const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // Treat the file as a raw file (PDF)
      folder: "pdfs", // Optional: Organize files in a 'pdfs' folder
      public_id: req.file.filename, // Optional: Use the original filename as public ID
      access_mode: "public", //file is publicly accessible
    });

    fs.unlinkSync(req.file.path); // Delete the local file after upload
    const isAvaiable = await Calendar.findOne({ createdBy: req.user.userId });
    if (isAvaiable) {
      await Calendar.findOneAndUpdate(
        { createdBy: req.user.userId },
        { pdfUrl: result.secure_url },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "PDF updated successfully", data: isAvaiable });
    }

    const calendar = new Calendar({
      pdfUrl: result.secure_url,
      createdBy: req.user.userId,
    });

    try {
      await calendar.save();
      return res
        .status(201)
        .json({ msg: "PDF uploaded successfully", data: calendar });
    } catch (error) {
      console.error("Database error:", error);
      return res
        .status(500)
        .json({ msg: "Failed to save PDF URL to database" });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Failed to upload PDF" });
  }
};

export const getPdf = async (req, res) => {
  let calendar;
  try {
    if (req.user.role === "hr") {
      calendar = await Calendar.findOne({ createdBy: req.user.userId });
    } else if (req.user.role === "candidate") {
      calendar = await Calendar.findOne({ createdBy: req.user.hrName });
    }
    if (!calendar) {
      return res.status(404).json({ msg: "No PDF found" });
    }
    return res.status(200).json({ data: calendar });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return res.status(500).json({ msg: error });
  }
};

export { uploadPdf };

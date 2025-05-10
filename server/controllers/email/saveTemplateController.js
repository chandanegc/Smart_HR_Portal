import mongoose from "mongoose";
import SaveTemplateModel from "../../models/email/saveTemplateModel.js";

export const createTemplate = async (req, res) => {
  const { subject, message, name } = req.body;

  if (!subject || !message ) {
    return res.status(400).json({ error: "Subject and message are required." });
  }
  try {
    const newTemplate = await SaveTemplateModel.create({
      subject,
      message,
      name,
      createdBy: req.user.userId,
    });
    res.status(201).json({
      msg: "Template created successfully",
      data: newTemplate,
    });
  } catch (error) {
    res.status(500).json({ msg:error });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, msg: "Invalid user ID." });
    }

    const templates = await SaveTemplateModel.find({ createdBy: userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error("Get Templates Error:", error.message);
    return res.status(500).json({ success: false, msg: "Error fetching templates." });
  }
};

export const deleteTemplate = async (req, res) => {
  const { id } = req.params;

  try {
    const template = await SaveTemplateModel.findById(id);

    if (!template) {
      return res.status(404).json({ error: "Template not found." });
    }

    if (template.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized to delete this template." });
    }

    await template.deleteOne();
    res.status(200).json({
      success: true,
      msg: "Template deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting template." });
  }
};

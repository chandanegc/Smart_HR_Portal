import SaveTemplateModel from "../../models/Email/saveTemplateModel.js";

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
      createdBy: req.user._id,
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
    const templates = await SaveTemplateModel.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching templates." });
  }
};

export const deleteTemplate = async (req, res) => {
  const { id } = req.params;

  try {
    const template = await SaveTemplateModel.findById(id);

    if (!template) {
      return res.status(404).json({ error: "Template not found." });
    }

    if (template.createdBy.toString() !== req.user._id) {
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

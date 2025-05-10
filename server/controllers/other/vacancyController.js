import Job from "../../models/other/VacancyModel.js";

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "hr")
      return res.status(404).json({ msg: "unauthorized access" });
    const job = new Job({ ...req.body, createdBy: req.user.userId });
    const update = await job.save();
    res.status(201).json({ msg: " Job update successfully. ", update });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.role === "hr" ? req.user.userId : req.user.hrName,
    });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Job.findOne({
      _id: id,
      createdBy: req.user.role === "hr" ? req.user.userId : req.user.hrName,
    });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

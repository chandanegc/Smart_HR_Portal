import Document from "../../models/document/documentModel.js";
import StatusCodes from "http-status-codes";
import { NotFoundError } from "../../customError/customError.js";
import mongoose from "mongoose";
import dayjs from "dayjs";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import candidateModel from "../../models/document/candidateModel.js";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Document.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const createDocument = async (req, res) => {
  try {
    const newUser = {
      documentName: req.body.name,
      documentID: req.body.documentID,
      createdBy: req.user.userId,
    };

    if (req.file) {
      const userFolder = `user_photos/${req.user.userId}`;
      const response = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: userFolder,
      });
      
      await fs.unlink(req.file.path);
      if (!newUser.photos) newUser.photos = [];
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await Document.create(newUser);
    const save = await candidateModel.findByIdAndUpdate(
      req.user.userId,
      { $push: { documents: updatedUser._id } },
      { new: true } // Return the updated user
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error updating user", error });
  }
};
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Document.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Document.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Document.findById(id);
  if (!job) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job });
};

export const getUserDocuments = async (req, res) => {
  const { id } = req.params;
  const job = await Document.find({ createdBy: id });
  if (!job) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ job });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Document.findByIdAndDelete(id);

  if (!id) throw new NotFoundError(`no job with id : ${id}`);
  res.status(StatusCodes.OK).json({ removedJob });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await Document.findById(id);
    if (!updatedJob) {
      throw new NotFoundError(`No job with id: ${id}`);
    }
    const owner = await candidateModel.findById(updatedJob.createdBy);

    updatedJob.status = req.body.jobStatus;
    const savedJob = await updatedJob.save();
    res.status(StatusCodes.OK).json({ job: savedJob });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const showStats = async (req, res) => {
  let stats = await Document.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Document.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

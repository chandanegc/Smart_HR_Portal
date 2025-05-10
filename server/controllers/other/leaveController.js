import Leave from "../../models/other/leave.js";

// Create a new leave
export const createLeave = async (req, res) => {
  try {
    const {
      leaveType,
      startDate,
      endDate,
      leaveReason,
      selectedDates,
      totalDays,
    } = req.body;
    if (
      !leaveType ||
      !startDate ||
      !endDate ||
      !leaveReason ||
      !selectedDates ||
      !totalDays
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return res
        .status(400)
        .json({ msg: "Start date cannot be after end date" });
    }
    if (totalDays <= 0) {
      return res
        .status(400)
        .json({ msg: "Total days must be greater than zero" });
    }
    // Check if leave already exists for the same dates
    const existingLeave = await Leave.findOne({
      startDate: { $lte: end }, // Start date is before or on the end date of existing leave
      endDate: { $gte: start }, // End date is after or on the start date of existing leave
      createdBy: req.user.userId, // Assuming req.user contains the ID of the user creating the leave
    });
    if (existingLeave) {
      return res
        .status(400)
        .json({ msg: "Leave already exists for the selected dates" });
    }
    // Create new leave
    const leaveData = {
      leaveType,
      startDate,
      endDate,
      leaveReason,
      selectedDates,
      totalDays,
      createdBy: req.user.userId,
      hrName: req.user.hrName,
    };
    const leave = new Leave(leaveData);
    await leave.save();
    res.status(201).json({ msg: "Leave created successfully", data: leave });
  } catch (error) {
    console.error("Error creating leave:", error);
    res.status(500).json({ msg: "Error creating leave", error: error.message });
  }
};

// Get all leaves
export const getLeaves = async (req, res) => {
  try {
    let leaves;

    if (req.user.role === "hr") {
      leaves = await Leave.find({ hrName: req.user.userId })
        .sort({ createdAt: -1 })
        .populate("createdBy");
    } else {
      leaves = await Leave.find({ createdBy: req.user.userId })
        .sort({ createdAt: -1 })
        .populate("createdBy");
    }

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ msg: "No leaves found" });
    }

    res.status(200).json({ msg: "Leaves fetched successfully", data: leaves });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching leaves", error: error.message });
  }
};

export const updateStatusByHr = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // Find the leave by ID and update its status
    const updateLeave = await Leave.findOne({
      _id: id,
      hrName: req.user.userId,
    });
    if (!updateLeave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    updateLeave.status = status;
    const data = await updateLeave.save();

    res.status(200).json({
      msg: "Leave status updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating leave", error: error.message });
  }
};
// Delete leave by ID
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeave = await Leave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    res
      .status(200)
      .json({ msg: "Leave deleted successfully", data: deletedLeave });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting leave", error: error.message });
  }
};

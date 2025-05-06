import React, { useState } from "react";
import { Wrapper } from "../Styles/applyLeaveStyle";
import customFetch from "../../DOCUMENT/utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    leaveReason: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Maternity Leave",
    "Paternity Leave",
  ];
  const navigate = useNavigate();
  const handleDateSelection = (date) => {
    if (!formData.startDate) {
      setFormData({ ...formData, startDate: date });
    } else if (!formData.endDate && date > formData.startDate) {
      setFormData({ ...formData, endDate: date });
      calculateLeaveDays(formData.startDate, date);
    } else {
      setFormData({ ...formData, startDate: date, endDate: "" });
    }
  };

  const calculateLeaveDays = (start, end) => {
    const days = [];
    const current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    const details = days.map((day) => ({
      date: day.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      dayName: day.toLocaleDateString("en-US", { weekday: "short" }),
      type: [0, 6].includes(day.getDay()) ? "Non Working day" : "Full day",
    }));
    setLeaveDetails(details);
    setSelectedDates(days.map((d) => d.toISOString().split("T")[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      selectedDates,
      totalDays: leaveDetails.filter((d) => d.type === "Full day").length,
    };
    try {
      setLoading(true);
      const res = await customFetch.post("/leave/create", data);
      toast.success(res.data.msg);
      setFormData({ leaveType: "", startDate: "", endDate: "", leaveReason: "" });
      navigate("/leave");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error submitting leave");
    }
    setLoading(false);
  };

  const generateCalendarDays = () => {
    const days = [], year = 2025, month = 4;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysFromPrevMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i < 42; i++) {
      let day;
      if (i < firstDay) {
        day = daysFromPrevMonth - firstDay + i + 1;
        days.push({ day, currentMonth: false });
      } else if (i < firstDay + daysInMonth) {
        day = i - firstDay + 1;
        days.push({
          day,
          currentMonth: true,
          date: new Date(year, month, day).toISOString().split("T")[0],
        });
      } else {
        day = i - firstDay - daysInMonth + 1;
        days.push({ day, currentMonth: false });
      }
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <Wrapper>
      <div className="leave-application">
        <h3>Apply Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Leave Type</h2>
            <div className="form-group">
              <select
                value={formData.leaveType}
                onChange={(e) =>
                  setFormData({ ...formData, leaveType: e.target.value })
                }
                required
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>Leave Dates</h2>
            <div className="form-group">
              <button
                type="button"
                className="date-selector"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {formData.startDate && formData.endDate
                  ? `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}`
                  : "Select Dates"}
              </button>
              {showCalendar && (
                <div className="calendar">
                  <div className="calendar-header"><h3>May 2025</h3></div>
                  <div className="calendar-grid">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="day-header">{d}</div>
                    ))}
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`calendar-day ${day.currentMonth ? "" : "other-month"} ${
                          [formData.startDate, formData.endDate].includes(day.date)
                            ? "selected"
                            : ""
                        } ${selectedDates.includes(day.date) ? "in-range" : ""}`}
                        onClick={() =>
                          day.currentMonth && handleDateSelection(day.date)
                        }
                      >
                        {day.day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Leave Reason</h2>
            <div className="form-group">
              <textarea
                value={formData.leaveReason}
                onChange={(e) =>
                  setFormData({ ...formData, leaveReason: e.target.value })
                }
                placeholder="Enter leave reason"
                required
              />
            </div>
          </div>

          {leaveDetails.length > 0 && (
            <div className="leave-details">
              <h2>Your Leave Details</h2>
              <ul>
                {leaveDetails.map((detail, index) => (
                  <li key={index}>
                    <strong>{detail.date} ({detail.dayName})</strong> - {detail.type}
                  </li>
                ))}
              </ul>
              <div className="total-leave">
                <strong>Total Leave:</strong>{" "}
                {leaveDetails.filter((d) => d.type === "Full day").length} days
              </div>
            </div>
          )}

          <button className="btn btn-block form-btn"
          style={{ marginTop: "20px" }}
          type="submit">
           {loading?"Loading...":" Apply Leave"}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default ApplyLeave;

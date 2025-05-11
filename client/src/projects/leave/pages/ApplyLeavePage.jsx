import React, { useState } from "react";
import { Wrapper } from "../styles/applyLeaveStyle";
import customFetch from "../../document/utils/customFetch";
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
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Maternity Leave",
    "Paternity Leave",
  ];

  const navigate = useNavigate();

  const handleDateSelection = (date) => {
    if (!formData.startDate || (formData.startDate && formData.endDate)) {
      setFormData({ ...formData, startDate: date, endDate: "" });
      calculateLeaveDays(date, date);
    } else if (!formData.endDate && new Date(date) >= new Date(formData.startDate)) {
      setFormData({ ...formData, endDate: date });
      calculateLeaveDays(formData.startDate, date);
    } else {
      setFormData({ ...formData, startDate: date, endDate: "" });
      calculateLeaveDays(date, date);
    }
  };

  const calculateLeaveDays = (start, end) => {
    const days = [];
    let current = new Date(start);
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
      setLeaveDetails([]);
      setSelectedDates([]);
      navigate("/leave");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error submitting leave");
    }
    setLoading(false);
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();

    for (let i = 0; i < 42; i++) {
      let day;
      if (i < firstDay) {
        day = prevMonthDays - firstDay + i + 1;
        days.push({ day, currentMonth: false });
      } else if (i < firstDay + daysInMonth) {
        day = i - firstDay + 1;
        const dateObj = new Date(calendarYear, calendarMonth, day);
        days.push({
          day,
          currentMonth: true,
          date: dateObj.toISOString().split("T")[0],
        });
      } else {
        day = i - firstDay - daysInMonth + 1;
        days.push({ day, currentMonth: false });
      }
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const prevMonth = () => {
    const today = new Date();
    const current = new Date(calendarYear, calendarMonth);
    if (current > new Date(today.getFullYear(), today.getMonth())) {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(calendarYear - 1);
      } else {
        setCalendarMonth(calendarMonth - 1);
      }
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <Wrapper>
      <div className="leave-application">
        <h4>Apply Leave</h4> <br/> <br/>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <p>Leave Type</p>
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
            <p>Leave Dates</p>
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
                  <div className="calendar-header">
                    <button onClick={prevMonth} type="button">←</button>
                    <h5>{monthNames[calendarMonth]} {calendarYear}</h5>
                    <button onClick={nextMonth} type="button">→</button>
                  </div>
                  <div className="calendar-grid">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="day-header">{d}</div>
                    ))}
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`calendar-day ${day.currentMonth ? "" : "other-month"} 
                          ${[formData.startDate, formData.endDate].includes(day.date) ? "selected" : ""} 
                          ${selectedDates.includes(day.date) ? "in-range" : ""}`}
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
            <p>Leave Reason</p>
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
              <h4>Your Leave Details</h4>
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

          <button
            className="btn btn-block form-btn"
            style={{ marginTop: "20px" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Apply Leave"}
          </button>
        </form>
      </div>
    </Wrapper>
  ); 
};

export default ApplyLeave;

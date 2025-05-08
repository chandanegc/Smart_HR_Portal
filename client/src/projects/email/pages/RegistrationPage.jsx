import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => ({ ...data, [name]: value }));
    setPasswordError("");
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.password !== "" &&
      data.name !== "" &&
      data.email !== "" &&
      data.confirmPassword !== "" &&
      data.password !== data.confirmPassword
    )
      setPasswordError("Password does not match..");
    else {
      try {
        const res = await axios.post("/api/v1/auth/email/register", data);
        toast.success(res?.data?.msg);
        navigate("/bulk-sms/email-secret");
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    }
  };
  return (
    <div>
      <div className="form">
        <h3 className="text-center">Registration</h3>
        <Input
          type="text"
          required={true}
          onChange={handleChange}
          name="name"
        />
        <Input
          type="email"
          required={true}
          onChange={handleChange}
          name="email"
        />
        <Input
          type="text"
          required={true}
          onChange={handleChange}
          name="email_secret"
          labelText="Email Secret Key"
        />
        <Input
          type="password"
          required={true}
          onChange={handleChange}
          name="password"
        />
        <Input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          required={true}
          labelText="confirm password"
        />
        <p className="error">{passwordError}</p>
        <br />
        <p>
          Already register? <Link to={"/"}>Login</Link>
        </p>
        <br />
        <button className="btn btn-block form-btn" onClick={handleSubmit} type="submit">
          Reister
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;

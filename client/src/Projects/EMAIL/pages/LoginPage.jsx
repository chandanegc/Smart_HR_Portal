import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [data, setData] = useState({
    email: "chandanegc@gmail.com",
    password: "1234",
  });
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post("/api/v1/auth/email/login", data);
      navigate("/bulk-sms/template");
      localStorage.setItem("credential", JSON.stringify(res.data.data));
      window.location.reload();
    } catch (error) {
      alert("Invalid Credentials");
      console.log(error);
    }
    setLoader(false);
  };
  return (
    <div>
      <div className="form">
        <h3 className="text-center">Login</h3>
        <Input
          type="email"
          required={true}
          onChange={handleChange}
          name="email"
          defaultValue='chandanegc@gmail.com'
        />
        <Input
          type="password"
          required={true}
          onChange={handleChange}
          defaultValue='1234'
          name="password"
        />
        <p>
          Not register? <Link to={"/bulk-sms/register"}>Register</Link>
        </p>
        <br />
        <button
          onClick={handleSubmit}
          className="btn btn-block form-btn"
          type="submit"
        >
          {loader ? "Login..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

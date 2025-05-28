import { FormRow } from "../../../projects/document/components";
import Wrapper from "../../../projects/document/assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../../projects/document/utils/customFetch";
import { toast } from "react-toastify";
import { SmallLogo } from "../../../components/Logo";
import { useState } from "react";

const Register = () => {
  const [loader, setLoader] = useState({
    sendOTP: false,
    verifyOTP: false,
    submit: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    repassword: "",
  });
  const [disable, setDisable] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader((pre) => ({ ...pre, submit: true }));
    try {
      const res = await customFetch.post(`/auth/reset-password`, formData);
      setLoader(false);
      toast.success(res.data.msg);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.msg);
    } finally {
      setLoader((pre) => ({ ...pre, submit: false }));
    }
  };

  const handleOTPsend = async (e) => {
    e.preventDefault();
    setLoader((pre) => ({ ...pre, sendOTP: true }));
    try {
      const res = await customFetch.get(`/auth/send-otp/${formData.email}`);
      setLoader((pre) => ({ ...pre, sendOTP: false }));
      setDisable(1);
      toast.success(res.data.msg);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.msg);
    }
  };
  const handleOTPverify = async (e) => {
    e.preventDefault();
    setLoader((pre) => ({ ...pre, verifyOTP: true }));
    try {
      const res = await customFetch.post(`/auth/verify-otp`, formData);
      setDisable(2);
      toast.success(res.data.msg);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.msg);
    } finally {
      setLoader((pre) => ({ ...pre, verifyOTP: false }));
    }
  };

  return (
    <Wrapper>
      (
      <form onSubmit={handleSubmit} className="form">
        <SmallLogo />
        <h4 style={{ textAlign: "center" }}>Reset Password</h4>
        <span className="form-text">
          <FormRow
            type="email"
            name="email"
            onChange={handleChange}
            readOnly={disable > 0}
          />
          {!(disable > 0) && (
            <span
              onClick={handleOTPsend}
              style={{ marginTop: "0" }}
              className="btn"
            >
              {loader.sendOTP ? "Sending..." : "Send OTP"}
            </span>
          )}
          <FormRow
            type="password"
            name="otp"
            labelText={"OTP (one time password) "}
            onChange={handleChange}
            readOnly={disable > 1}
          />
          {!(disable > 1) && (
            <span
              onClick={handleOTPverify}
              style={{ marginTop: "0" }}
              className="btn"
            >
              {loader.verifyOTP ? "verifying..." : " Verify OTP"}
            </span>
          )}
          <FormRow type="password" name="password" onChange={handleChange} />
          <FormRow
            type="repassword"
            name="repassword"
            labelText={"Re-Password"}
            onChange={handleChange}
          />
        </span>
        {disable == 2 && (
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={loader.submit}
          >
            {loader.submit ? "Submitting.." : "Submit"}
          </button>
        )}
      </form>
      )
    </Wrapper>
  );
};
export default Register;

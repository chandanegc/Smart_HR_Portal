import { FormRow } from "../../projects/document/components";
import Wrapper from "../../projects/document/assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../projects/document/utils/customFetch";
import { toast } from "react-toastify";
import { SmallLogo } from "../../components/Logo";
import OTPverification from "../../projects/document/pages/OTPverification";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    companyName: "",
    location: "",
    password: "",
    repassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await customFetch.get(`/auth/send-otp/${formData.email}`);
      setStep(2);
      setLoader(false);
      toast.success(res.data.msg);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Wrapper>
      {step === 1 && (
        <form onSubmit={handleSubmit} className="form">
          <SmallLogo />
          <h4 style={{ textAlign: "center" }}>HR Registration</h4>
          <FormRow type="text" name="name" onChange={handleChange} />
          <FormRow
            type="text"
            name="employeeId"
            labelText="Employee Id"
            onChange={handleChange}
          />
          <FormRow type="email" name="email" onChange={handleChange} />
          <FormRow type="text" name="companyName" onChange={handleChange} />
          <FormRow type="text" name="location" onChange={handleChange} />
          <FormRow type="password" name="password" onChange={handleChange} />
          <FormRow type="password" name="repassword" onChange={handleChange} />
          <button type="submit" className="btn btn-block form-btn">
            {loader ? "Submitting.." : "Submit"}
          </button>
        </form>
      )}
      {step === 2 && <OTPverification data={formData} setStep={setStep} />}
    </Wrapper>
  );
};
export default Register;

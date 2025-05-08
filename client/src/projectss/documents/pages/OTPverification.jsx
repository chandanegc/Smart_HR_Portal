import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState } from "react";
import { SmallLogo } from "../../../components/Logo";
import { IoIosArrowBack } from "react-icons/io";

const Register = ({ data, setStep }) => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await customFetch.post(`/auth/verify-otp`, {
        email: data.email,
        otp: otp,
      });
      const res2 = await customFetch.post("/auth/hr/register", data);
      setLoader(false);
      toast.success(res2.data.msg);
      navigate("/hr-login");
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoader(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <IoIosArrowBack onClick={() => setStep(1)} />
        <SmallLogo />
        <h4 style={{ textAlign: "center" }}>OTP Verification</h4>
        <FormRow
          type="otp"
          name="name"
          labelText="Enter OTP"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-block form-btn">
          {loader ? "Submitting.." : "Submit"}
        </button>
      </form>
    </Wrapper>
  );
};
export default Register;

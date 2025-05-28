import { FormRow } from "../../projects/document/components";
import Wrapper from "../../projects/document/assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../projects/document/utils/customFetch";
import { SmallLogo } from "../../components/Logo";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.post("/auth/hr/login", data);
    toast.success(res.data.msg);
    localStorage.setItem("credential", JSON.stringify(res.data.user));
    return res.data.role === "hr" ? redirect("/") : redirect("/");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const HRlogin = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <SmallLogo />
        <h4>Login</h4>
        <FormRow
          type="text"
          name="email"
          labelText="Email/Employee ID"
          defaultValue="hiringrecruiteregc@gmail.com"
        />
        <FormRow type="password" name="password" defaultValue="1234@@@@" />
        <button
          className="btn btn-block form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </button>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            <Link to="/hr-register" className="member-btn">
              New Register
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="member-btn">
              Forgot Password
            </Link>
          </p>
        </span>
      </Form>
    </Wrapper>
  );
};
export default HRlogin;

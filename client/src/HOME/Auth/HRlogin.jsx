import { FormRow } from "../../DOCUMENT/components";
import Wrapper from "../../DOCUMENT/assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../DOCUMENT/utils/customFetch";
import { SmallLogo } from "../../DOCUMENT/components/Logo";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await customFetch.post("/auth/hr/login", data);
    toast.success(res.data.msg);
    localStorage.setItem("credential", JSON.stringify(res.data));
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("id", res.data._id);
    return res.data.role === "hr"
      ? redirect("/")
      : redirect("/");
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
          defaultValue="chandanegc@gmail.com"
        />
        <FormRow type="password" name="password" defaultValue="1234" />
        <button
          className="btn btn-block form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </button>
        {/* <button type='button' className='btn btn-block'>
          explore the app
        </button> */}
        <p>
          Not a member yet?
          <Link to="/hr-register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default HRlogin;

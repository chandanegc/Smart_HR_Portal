import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { SmallLogo } from "../components/Logo";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post("/auth/candidate/login", data);
    const { msg, role, _id } = res.data;
    console.log(res.data);

    toast.success(msg);

    if (!role || !_id) {
      toast.error("Invalid response from server. Please try again.");
      return redirect("/truedocs/login");
    }

    localStorage.setItem("role", role);
    localStorage.setItem("id", _id);

    if (role === "hr" || role === "admin") {
      return redirect("/truedocs/dashboard/all-users-docs");
    } else if (role === "candidate") {
      return redirect("/truedocs/dashboard/all-docs");
    } else {
      toast.error("Unknown role. Please contact support.");
      return redirect("/truedocs/login");
    }
  } catch (error) {
    toast.error(error.response?.data?.msg || "Login failed. Try again.");
    return null; // Stay on the login page
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SmallLogo />
        <h4>Login</h4>
        <FormRow type="text" name="email" labelText="Email/Employee ID" defaultValue='chandanegc@gmail.com' />
        <FormRow type="password" name="password" defaultValue='00000000' />
        <button
          className="btn btn-block form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;

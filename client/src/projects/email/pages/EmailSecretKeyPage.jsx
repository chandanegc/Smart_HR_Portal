import { FormRow } from "../../document/components";
import Wrapper from "../../document/assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../document/utils/customFetch";
import { SmallLogo } from "../../../components/Logo";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post("/auth/email/login", data);
    toast.success(res?.data?.msg || "Email Secret saved");
    localStorage.removeItem("credential");
    localStorage.setItem("credential", JSON.stringify(res.data?.data) || {});
    return redirect("/bulk-sms/email-secret");
    return redirect("/bulk-sms/menu");
  } catch (error) {
    toast.error(error.response?.data?.msg || "Login failed. Try again.");
    return null;
  }
};

const EmailSecretKey = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <SmallLogo />
        <p>Enter Email Secret Key</p>
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue="hiringrecruiteregc@gmail.com"
        />
        <FormRow
          type="password"
          name="emailSecret"
          labelText="Email Secret Key"
          defaultValue="oelo edoc vwij ggel"
        />
        <button
          className="btn btn-block form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default EmailSecretKey;

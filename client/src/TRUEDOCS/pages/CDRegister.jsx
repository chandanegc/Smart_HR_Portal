import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { SmallLogo } from "../components/Logo";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const id = localStorage.getItem('id');
  try {
    const res = await customFetch.post(`/auth/candidate/register/${id}`, data);
    toast.success(res.data.msg);
    return null;
  } catch (error) {
    console.log(error.response)
    toast.error(error.response.data.msg);
    return error;
  }
};

const CDRegister = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <SmallLogo />
        <h4>CD Registration</h4>
        <FormRow type="text" name="employeeId" labelText="Employee ID" />
        <FormRow type="text" name="email" labelText="email ID" />
        <FormRow type="password" name="password" />
        <FormRow type="password" name="repassword" labelText="Re-Enter Password" />
        <button
          className="btn btn-block form-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </button>
      </Form>
    </Wrapper>
  );
};
export default CDRegister;

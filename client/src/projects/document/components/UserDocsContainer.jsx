import Job from "./Document";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const {data} = await customFetch.get(`jobs/user-documents/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const UserDocsContainer = () => {
  const {job} = useLoaderData();
  if (job.length === 0) {
    return (
      <Wrapper>
        <h2>No Documents to display...</h2>
      </Wrapper>
    );
  }

  const {id} = useParams();
  return (
    <Wrapper>
      <div className="jobs">
        {job.map((job) => {
          return <Job key={job._id} {...job} id={id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default UserDocsContainer;

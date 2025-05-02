import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:5100",
  withCredentials: true,  // Allow cookies if needed
});

export default customFetch;

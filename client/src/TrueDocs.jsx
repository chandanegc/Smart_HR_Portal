import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Page Imports
import {
  HomeLayout,
  Landing,
  Register,
  CandidateLogin,
  DashboardLayout,
  Error,
  Admin,
  Profile,
} from "./DOCUMENT/pages";
import { action as LoginAction } from "./HOME/Auth/Login";
import { loader as DashboardLoader } from "./DOCUMENT/pages/DashboardLayout";
import AddDocs, { action as AddDocsAction } from "./DOCUMENT/pages/AddDocs";
import AllDocs, { loader as allDocsLoader } from "./DOCUMENT/pages/AllDocs";
import { action as deleteJobAction } from "./DOCUMENT/pages/DeleteDocs";
import { loader as adminLoader } from "./DOCUMENT/pages/Admin";
import { action as profileAction } from "./DOCUMENT/pages/Profile";
import HRlogin from "./HOME/Auth/HRlogin";
import { action as HRloginAction } from "./HOME/Auth/HRlogin";
import AllDocuments, {
  loader as allUserDocLoader,
} from "./DOCUMENT/pages/TableCandidates";
import UserDocsContainer, {
  loader as UserDocLoader,
} from "./DOCUMENT/components/UserDocsContainer";
import CDRegister, { action as CDaction } from "./DOCUMENT/pages/CDRegister";
import OTPverification from "./DOCUMENT/pages/OTPverification";

// Bulk SMS imports
import "./EMAIL/global.css";
import RegistrationPage from "./EMAIL/pages/RegistrationPage";
import TamplatePage from "./EMAIL/pages/TemplatePage";
import CSVReaderPage from "./EMAIL/pages/CSVReaderPage";
import ChooseTemplate from "./EMAIL/pages/ChooseTemplate";
import CreateTemplatePage from "./EMAIL/pages/CreateTemplatePage";
import AllTemplatesPage from "./EMAIL/pages/AllTemplatesPage";
import LoginPage from "./EMAIL/pages/LoginPage";

// Main imports
import MainPage from "./HOME/MainPage";
import Certificate from "./CERTIFICATE/Certificate";
import ProtectedRoute from "./HOME/Auth/ProtectedRoutes";
import WelcomeCard from "./CERTIFICATE/WelcomeCard/WelcomeCard";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "guest");
  const [local, setLocal] = useState(false);

  useEffect(() => {
    setLocal(localStorage.getItem("credential"));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role") || "guest");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const router = createBrowserRouter([
    { 
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainPage />,
          errorElement: <Error />,
        },
        {
          path: "/truedocs",
          element: <HomeLayout />,
          errorElement: <Error />,
          children: [
            { index: true, element: <Landing /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <CandidateLogin />, action: LoginAction },
            { path: "hr-login", element: <HRlogin />, action: HRloginAction },
            {
              path: "otp-verify",
              element: <OTPverification />,
              action: LoginAction,
            },
            {
              path: "dashboard",
              element: <DashboardLayout />,
              loader: DashboardLoader,
              errorElement: <Error />,
              children: [
                { index: true, action: AddDocsAction, element: <AddDocs /> },
                {
                  path: "all-docs",
                  element: <AllDocs />,
                  loader: allDocsLoader,
                },
                {
                  path: "all-users-docs",
                  element: <AllDocuments />,
                  loader: allUserDocLoader,
                },
                {
                  path: "cd-register",
                  element: <CDRegister />,
                  action: CDaction,
                },
                {
                  path: "profile",
                  element: <Profile />,
                  action: profileAction,
                },
                { path: "admin", element: <Admin />, loader: adminLoader },
                {
                  path: "user-docs/:id",
                  element: <UserDocsContainer />,
                  loader: UserDocLoader,
                },
                { path: "delete-job/:id", action: deleteJobAction },
                { path: "*", element: <Error /> },
              ],
            },
            { path: "*", element: <Error /> },
          ],
        },
        {
          path: "/bulk-sms",
          element: <HomeLayout />,
          errorElement: <Error />,
          children: [
            { index: true, element: local ? <CSVReaderPage /> : <LoginPage /> },
            { path: "register", element: <RegistrationPage /> },
            { path: "template", element: <ChooseTemplate /> },
            { path: "create-template", element: <CreateTemplatePage /> },
            { path: "all-template", element: <AllTemplatesPage /> },
            {
              path: "template",
              element: local ? <TamplatePage /> : <LoginPage />,
            },
            {
              path: "file-upload",
              element: local ? <CSVReaderPage /> : <LoginPage />,
            },
            { path: "login", element: <LoginPage /> },
            { path: "*", element: <Error /> }, // Catch-all for /bulk-sms
          ],
        },
        {
          path: "certificate",
          element: <Certificate />,
          errorElement: <Error />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
    {
      element:<Landing/>,
      path: "/home",
      errorElement: <Error />,
    },
    {
      element:<HRlogin/>,
      path: "/hr-login",
      action: HRloginAction,
      errorElement: <Error />,
    },
    {
      element:<CandidateLogin/>,
      path: "/candidate-login",
      action: LoginAction,
      errorElement: <Error />,
    },
    {
      element:<Register/>,
      path: "/hr-register",
      action: LoginAction,
      errorElement: <Error />,
    },
  
    {
      path:"*",
      element:<Error/>,
      errorElement: <Error />,
    },
    {
      path:"/welcome-card",
      element:<WelcomeCard/>,
      errorElement: <Error />,
    }
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};

export default App;

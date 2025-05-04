import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// TrueDocs Page Imports
import {
  HomeLayout,
  Landing,
  Register,
  CandidateLogin,
  DashboardLayout,
  Error,
  Admin,
  Profile,
} from "./Projects/DOCUMENT/pages";
import { action as LoginAction } from "./Pages/Auth/CDLogin";
import { loader as DashboardLoader } from "./Projects/DOCUMENT/pages/DashboardLayout";
import AddDocs, {
  action as AddDocsAction,
} from "./Projects/DOCUMENT/pages/AddDocs";
import AllDocs, {
  loader as allDocsLoader,
} from "./Projects/DOCUMENT/pages/AllDocs";
import { action as deleteJobAction } from "./Projects/DOCUMENT/pages/DeleteDocs";
import { loader as adminLoader } from "./Projects/DOCUMENT/pages/Admin";
import { action as profileAction } from "./Projects/DOCUMENT/pages/Profile";
import HRlogin from "./Pages/Auth/HRlogin";
import { action as HRloginAction } from "./Pages/Auth/HRlogin";
import AllDocuments, {
  loader as allUserDocLoader,
} from "./Projects/DOCUMENT/pages/TableCandidates";
import UserDocsContainer, {
  loader as UserDocLoader,
} from "./Projects/DOCUMENT/components/UserDocsContainer";
import CDRegister, {
  action as CDaction,
} from "./Projects/DOCUMENT/pages/CDRegister";
import OTPverification from "./Projects/DOCUMENT/pages/OTPverification";

// Bulk SMS imports
import RegistrationPage from "./Projects/EMAIL/pages/RegistrationPage";
import TamplatePage from "./Projects/EMAIL/pages/TemplatePage";
import CSVReaderPage from "./Projects/EMAIL/pages/CSVReaderPage";
import ChooseTemplate from "./Projects/EMAIL/pages/ChooseTemplate";
import CreateTemplatePage from "./Projects/EMAIL/pages/CreateTemplatePage";
import AllTemplatesPage from "./Projects/EMAIL/pages/AllTemplatesPage";
import LoginPage from "./Projects/EMAIL/pages/LoginPage";

// Others imports
import MainPage from "./Pages/MainPage";
import Certificate from "./Projects/CERTIFICATE/Certificate";
import ProtectedRoute from "./Pages/Auth/ProtectedRoutes";
import WelcomeCard from "./Projects/CERTIFICATE/WelcomeCard/WelcomeCard";
import HeaderLayout from "./components/HeaderLayout";

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
          path: "*",
          element: <Error />,
        },
      ],
    },
    {
      element: <HeaderLayout />,
      children: [
        {
          element: <MainPage />,
          path: "/",
          errorElement: <Error />,
        },
        {
          path: "/home",
          element: <Landing />,
          errorElement: <Error />,
        },
        {
          element: <HRlogin />,
          path: "/hr-login",
          action: HRloginAction,
          errorElement: <Error />,
        },
        {
          element: <CandidateLogin />,
          path: "/candidate-login",
          action: LoginAction,
          errorElement: <Error />,
        },
        {
          element: <Register />,
          path: "/hr-register",
          action: LoginAction,
          errorElement: <Error />,
        },
        {
          path: "/welcome-card",
          element: <WelcomeCard />,
          errorElement: <Error />,
        },
        {
          path: "certificate",
          element: <Certificate />,
          errorElement: <Error />,
        },

        //Bulk SMS routes
        {
          path: "/bulk-sms",
          element:<div style={{marginTop:"80px"}}><Outlet/></div>,
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

        //Error catch-all route
        {
          path: "*",
          element: <Error />,
          errorElement: <Error />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};

export default App;

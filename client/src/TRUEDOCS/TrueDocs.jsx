import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Page Imports
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Admin,
  Profile,
} from "./pages";
import { action as LoginAction } from "./pages/Login";
import { loader as DashboardLoader } from "./pages/DashboardLayout";
import AddDocs, { action as AddDocsAction } from "./pages/AddDocs";
import AllDocs, { loader as allDocsLoader } from "./pages/AllDocs";
import { action as deleteJobAction } from "./pages/DeleteDocs";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import HRlogin from "./pages/HRlogin";
import { action as HRloginAction } from "./pages/HRlogin";
import AllDocuments, { loader as allUserDocLoader } from "./pages/TableCandidates";
import UserDocsContainer, { loader as UserDocLoader } from "./components/UserDocsContainer";
import CDRegister, { action as CDaction } from "./pages/CDRegister";
import OTPverification from "./pages/OTPverification";

// Bulk SMS imports
import "../BULK_SMS/global.css";
import RegistrationPage from "../BULK_SMS/pages/RegistrationPage";
import TamplatePage from "../BULK_SMS/pages/TemplatePage";
import CSVReaderPage from "../BULK_SMS/pages/CSVReaderPage";
import ChooseTemplate from "../BULK_SMS/pages/ChooseTemplate";
import CreateTemplatePage from "../BULK_SMS/pages/CreateTemplatePage";
import AllTemplatesPage from "../BULK_SMS/pages/AllTemplatesPage";
import LoginPage from "../BULK_SMS/pages/LoginPage";
//
import MainPage from "../MainPage";
import Certificate from "../AWARD/Certificate"

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
        { path: "login", element: <Login />, action: LoginAction },
        { path: "hr-login", element: <HRlogin />, action: HRloginAction },
        { path: "otp-verify", element: <OTPverification />, action: LoginAction },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: DashboardLoader,
          errorElement: <Error />,
          children: [
            { index: true, action: AddDocsAction, element: <AddDocs /> },
            { path: "all-docs", element: <AllDocs />, loader: allDocsLoader },
            { path: "all-users-docs", element: <AllDocuments />, loader: allUserDocLoader },
            { path: "cd-register", element: <CDRegister />, action: CDaction },
            { path: "profile", element: <Profile />, action: profileAction },
            { path: "admin", element: <Admin />, loader: adminLoader },
            { path: "user-docs/:id", element: <UserDocsContainer />, loader: UserDocLoader },
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
        { path: "choose-template", element: <ChooseTemplate /> },
        { path: "create-template", element: <CreateTemplatePage /> },
        { path: "all-template", element: <AllTemplatesPage /> },
        { path: "template", element: local ? <TamplatePage /> : <LoginPage /> },
        { path: "file-upload", element: local ? <CSVReaderPage /> : <LoginPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "*", element: <Error /> }, // Catch-all for /bulk-sms
      ],
    },
    {
      path:"certificate",
      element: <Certificate />,
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  

  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
};

export default App;

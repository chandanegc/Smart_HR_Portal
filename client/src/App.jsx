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
} from "./projects/document/pages";
import { action as LoginAction } from "./pages/auth/CDLogin";
import { loader as DashboardLoader } from "./projects/document/pages/DashboardLayout";
import AddDocs, {
  action as AddDocsAction,
} from "./projects/document/pages/AddDocs";
import AllDocs, {
  loader as allDocsLoader,
} from "./projects/document/pages/AllDocs";
import { action as deleteJobAction } from "./projects/document/pages/DeleteDocs";
import { loader as adminLoader } from "./projects/document/pages/Admin";
import { action as profileAction } from "./projects/document/pages/Profile";
import HRlogin from "./pages/auth/HRlogin";
import { action as HRloginAction } from "./pages/auth/HRlogin";
import AllDocuments, {
  loader as allUserDocLoader,
} from "./projects/document/pages/TableCandidates";
import UserDocsContainer, {
  loader as UserDocLoader,
} from "./projects/document/components/UserDocsContainer";
import CDRegister, {
  action as CDaction,
} from "./projects/document/pages/CDRegister";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import OTPverification from "./projects/document/pages/OTPverification";

// Bulk SMS imports
import RegistrationPage from "./projects/email/pages/RegistrationPage";
import TamplatePage from "./projects/email/pages/TemplatePage";
import CSVReaderPage from "./projects/email/pages/CSVReaderPage";
import ChooseTemplate from "./projects/email/pages/ChooseTemplate";
import CreateTemplatePage from "./projects/email/pages/CreateTemplatePage";
import AllTemplatesPage from "./projects/email/pages/AllTemplatesPage";
import EmailSecretKey from "./projects/email/pages/EmailSecretKeyPage";

// Others imports
import MainPage from "./pages/MainPage";
import Certificate from "./projects/certificate/Certificate";
import ProtectedRoute from "./pages/auth/ProtectedRoutes";
import WelcomeCard from "./projects/certificate/welcomeCard/WelcomeCard";
import HeaderLayout from "./components/HeaderLayout";
import { action as EmailSecretKeyAction } from "./projects/email/pages/EmailSecretKeyPage";
import LeaveList from "./projects/leave/pages/LeaveList";
import ApplyLeave from "./projects/leave/pages/ApplyLeavePage";
import CalendarUploadPage from "./projects/calendar/UploadCalendarPage";
import LoaderComponent from "./components/LoaderComponent";

import JobVacancyUpload from "./projects/vacancy/page/JobVacancyUploadPage";
import VacancyDetails from "./projects/vacancy/page/VacancyDetails";
import VacancyList from "./projects/vacancy/page/VacancyListPage";
import AIchat from "./pages/AIchat";
import PdfParser from "./projects/others/PdfParser";
import OTPverify, { action as OTPverifyAction } from "./pages/auth/ForgotPassword/OTPverify";

const App = () => {
  const credential = JSON.parse(localStorage.getItem("credential") ?? "{}");

  const [local, setLocal] = useState(false);
  useEffect(() => {
    setLocal(credential);
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
        // Add Header for  routes
        {
          element: <HeaderLayout />,
          children: [
            {
              element: <MainPage />,
              path: "/",
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
            {
              path: "calendar",
              element: <CalendarUploadPage />,
              errorElement: <Error />,
            },
            {
              path: "/upload-job",
              element: <JobVacancyUpload />,
              errorElement: <Error />,
            },
            {
              path: "/vacancies/:id",
              element: <VacancyDetails />,
              errorElement: <Error />,
            },
            {
              path: "/vacancies",
              element: <VacancyList />,
              errorElement: <Error />,
            },

            //Bulk SMS routes
            {
              path: "/bulk-sms",
              element: (
                <div style={{ marginTop: "80px" }}>
                  <Outlet />
                </div>
              ),
              errorElement: <Error />,
              children: [
                {
                  index: true,
                  element: local ? <CSVReaderPage /> : <EmailSecretKey />,
                },
                { path: "register", element: <RegistrationPage /> },
                { path: "menu", element: <ChooseTemplate /> },
                { path: "create-template", element: <CreateTemplatePage /> },
                { path: "all-template", element: <AllTemplatesPage /> },
                {
                  path: "template",
                  element: local ? <TamplatePage /> : <EmailSecretKey />,
                },
                {
                  path: "file-upload",
                  element: local ? <CSVReaderPage /> : <EmailSecretKey />,
                },
                {
                  path: "email-secret",
                  element: <EmailSecretKey />,
                  action: EmailSecretKeyAction,
                },
                { path: "*", element: <Error /> },
              ],
            },
            {
              path: "/leave",
              element: (
                <div style={{ marginTop: "80px" }}>
                  <Outlet />
                </div>
              ),
              errorElement: <Error />,
              children: [
                {
                  index: true,
                  element: <LeaveList />,
                  errorElement: <Error />,
                },
                {
                  path: "apply",
                  element: <ApplyLeave />,
                  errorElement: <Error />,
                },
              ],
            },
          ],
        },
      ],
    },

    // Protect free routes
    {
      element: <HeaderLayout />,
      children: [
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
          path: "*",
          element: <Error />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: "/ai-chat",
      element: <AIchat />,
      errorElement: <Error />,
    },
    {
      path: "/pdf-parser",
      element: < PdfParser/>,
      errorElement: <Error />,
    },
    {
      path: "/forgot-password",
      element: < ForgotPassword/>,
      errorElement: <Error />,
      // action: forgotPasswordAction,
    },
    {
      path: "/otp-verify",
      element: < OTPverify/>,
      errorElement: <Error />,
      action: OTPverifyAction,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
    </>
  );
};

export default App;

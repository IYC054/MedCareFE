import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./page/Home";
import About from "./page/About";
import New from "./page/New";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./page/RootLayout";
import RootLayoutAdmin from "./page/RootLayoutAdmin";
import Dashboard from "./Admin/page/Dashboard";
import AuthPage from "./page/AuthPage";
import AccountUser from "./Admin/page/AccountUser";
import AccountDoctor from "./Admin/page/AccountDoctor";
import Appointment from "./Admin/page/Appointment";

import Hopsital from './components/Hospital'
import CreateApp from './Admin/page/createPage/CreateApp'
import Booking from './components/Hospital/Booking'
import AppProvider from './components/Context/AppProvider'
import AddProfile from './components/PatientProfile/AddProfile'
import PatientProfile from './components/PatientProfile/Profile'
import CreateAccountDoctor from './Admin/page/createPage/createAccountDoctor'
import Feedback from './Admin/page/Feedback'
import ConfirmInfo from "./components/Hospital/Confirm_information";
import ProfileChoose from "./components/Hospital/ProfileChoose";
import ChoosePayment from "./components/Hospital/ChoosePayment";
import CheckPhone from "./components/Authentication/Register/CheckPhone";
import CreatEmail from "./Admin/page/createPage/CreatEmail";
import ResponseBackFeedback from "./Admin/page/createPage/ResponseBackFeedback";
import ConfirmPayment from "./components/Hospital/ChoosePayment/ConfirmPayment";
import ProfileAdmin from "./Admin/page/ProfileAdmin";
import UserDetail from "./Admin/page/subPage/UserDetail";
import Transactions from "./Admin/page/Transactions";
import DoctorDetail from "./Admin/page/subPage/DoctorDetail";



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/new", element: <New /> },
      { path: "/hospital", element: <Hopsital /> },
      { path: "/hospital/booking", element: <Booking /> },
      { path: "/profile/add", element: <AddProfile /> },
      { path: "/profile", element: <PatientProfile /> },
      { path: "/choose-profile", element: <ProfileChoose /> },
      { path: "/confirm-information", element: <ConfirmInfo /> },
      { path: "/choose-payment", element: <ChoosePayment /> },
      { path: "/confirm-payment", element: <ConfirmPayment /> },
    ],
  },
  {
    element: <RootLayoutAdmin />, // cấu hình các component chung
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/user",
        element: <AccountUser />,
      },
      {
        path: "/admin/user/userDetail",
        element: <UserDetail />,
      },
      {
        path: "/admin/transaction",
        element: <Transactions />,
      },
      {
        path: "/admin/doctor",
        element: <AccountDoctor />,
      },
      {
        path: "/admin/doctor/doctorDetail",
        element: <DoctorDetail />,
      },
      {
        path: "/admin/doctor/CreateDoctor",
        element: <CreateAccountDoctor/>
      },
      {
        path: "/admin/appointment",
        element: <Appointment />,
      },
      {
        path: "/admin/appointment/createApp",
        element: <CreateApp />,
      },
      {
        path: "/admin/feedback",
        element: <Feedback />,
      },
      {
        path: "/admin/feedback/sendfeedback",
        element: <CreatEmail />,
      },
      {
        path: "/admin/feedback/responsefeedback",
        element: <ResponseBackFeedback />,
      },
      {
        path: "/admin/profileadmin",
        element: <ProfileAdmin />,
      },
    ],
  },
  {
    element: <AuthPage/>,
    children: [
      {
        path: "/auth/check-phone",
        element: <CheckPhone/>,
      },
      // {
      //   path: "/auth/check-otp",
      //   element: <CheckOTP/>,
      // },
      // {
      //   path: "/auth/register",
      //   element: <Resgister/>,
      // },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
);

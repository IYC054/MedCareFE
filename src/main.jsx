import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./page/Home";
import About from "./page/About";
import New from "./page/New";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./page/RootLayout";
import RootLayoutAdmin from "./page/RootLayoutAdmin";
import Dashboard from "./Admin/page/Dashboard";
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
import CreatEmail from "./Admin/page/createPage/CreatEmail";

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
        path: "/admin/doctor",
        element: <AccountDoctor />,
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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
);

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

import Booking from './components/Hospital/Booking'
import AppProvider from './components/Context/AppProvider'
import AddProfile from './components/PatientProfile/AddProfile'
import PatientProfile from './components/PatientProfile/Profile'
import CreateAccountDoctor from './Admin/page/createPage/createAccountDoctor'
import Feedback from './Admin/page/Feedback'
import ConfirmInfo from "./components/Hospital/Confirm_information";
import ProfileChoose from "./components/Hospital/ProfileChoose";
import ChoosePayment from "./components/Hospital/ChoosePayment";
import CheckEmail from "./components/Authentication/CheckEmail";
import CreatEmail from "./Admin/page/createPage/CreatEmail";
import ResponseBackFeedback from "./Admin/page/createPage/ResponseBackFeedback";
import ConfirmPayment from "./components/Hospital/ChoosePayment/ConfirmPayment";
import ProfileAdmin from "./Admin/page/ProfileAdmin";
import UserDetail from "./Admin/page/subPage/UserDetail";
import Transactions from "./Admin/page/Transactions";
import DoctorDetail from "./Admin/page/subPage/DoctorDetail";
import TransactionDetail from "./Admin/page/subPage/TransactionDetail";
import PaymentSuccess from "./components/Hospital/PaymentSuccess";
import Specialty from "./Admin/page/Specialty";
import CreateSpecialty from "./Admin/page/createPage/CreateSpecialty";
import LoginAdmin from "./Admin/page/LoginAdmin";
import AppointmentDetail from "./Admin/page/subPage/AppointmentDetail";
import Invoice from "./sendmail/Invoice";
import Notfound from "./404/notfound";
import FormAppointment from "./components/Hospital/Formappointment";
import News from "./Admin/page/News";
import CreateNews from "./Admin/page/createPage/CreateNews";
import NewDetail from "./Admin/page/subPage/NewDetail";
import NewDetails from "./page/NewDetails";
// import Chat from "./Admin/page/Chat";
import FeedbackDetail from "./Admin/page/subPage/FeedbackDetail";
import FeedbackReponse from "./Admin/page/subPage/FeedbackReponse";
import Chat from "./Admin/page/Chat";




const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/new", element: <New /> },
      { path: "/new/detail/:id", element: <NewDetails /> },
      { path: "/hospital", element: <Hopsital /> },
      { path: "/hospital/booking", element: <Booking /> },
      { path: "/profile/add", element: <AddProfile /> },
      { path: "/profile", element: <PatientProfile /> },
      { path: "/choose-profile", element: <ProfileChoose /> },
      { path: "/confirm-information", element: <ConfirmInfo /> },
      { path: "/choose-payment", element: <ChoosePayment /> },
      { path: "/confirm-payment", element: <ConfirmPayment /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/hospital/form-appointment", element: <FormAppointment /> },
      { path: "*", element: <Notfound /> },
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
        path: "/admin/chat",
        element: <Chat/>,
      },
      {
        path: "/admin/user",
        element: <AccountUser />,
      },
      {
        path: "/admin/user/userDetail/:id",
        element: <UserDetail />,
      },
      {
        path: "/admin/transaction",
        element: <Transactions />,
      },
      {
        path: "/admin/transaction/Detail/:id",
        element: <TransactionDetail />,
      },
      {
        path: "/admin/doctor",
        element: <AccountDoctor />,
      },
      {
        path: "/admin/doctor/doctorDetail/:id",
        element: <DoctorDetail />,
      },
      {
        path: "/admin/doctor/CreateDoctor",
        element: <CreateAccountDoctor />
      },
      {
        path: "/admin/appointment",
        element: <Appointment />,
      },
      {
        path: "/admin/appointment/detail",
        element: <AppointmentDetail />,
      },

      {
        path: "/admin/feedback",
        element: <Feedback />,
      },
      {
        path: "/admin/feedback/reponse/:id",
        element: <FeedbackDetail />,
      },
      {
        path: "/admin/feedback/wasReponse/:id",
        element: <FeedbackReponse />,
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
      {
        path: "/admin/specialty",
        element: <Specialty />,
      },

      {
        path: "/admin/specialty/createSpecialty",
        element: <CreateSpecialty />,
      },
      {
        path: "/admin/news",
        element: <News />,
      },
      {
        path: "/admin/news/createnews",
        element: <CreateNews />,
      },
      {
        path: "/admin/news/detail/:id",
        element: <NewDetail />,
      },
    ],
  },
  {
    path: "/loginAdmin",
    element: <LoginAdmin />,
  }
]);
window.global = window;

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);

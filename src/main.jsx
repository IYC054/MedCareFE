
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './page/Home'
import About from './page/About'
import New from './page/New'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './page/RootLayout'
import RootLayoutAdmin from './page/RootLayoutAdmin'
import Dashboard from './Admin/page/Dashboard'
import AccountUser from './Admin/page/AccountUser'
import AccountDoctor from './Admin/page/AccountDoctor'
import Appointment from './Admin/page/Appointment'
import Feedback from './Admin/page/FeedBack'


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/new",
        element: <New />
      }
    ]
  },
  {
    element: <RootLayoutAdmin />, // cấu hình các component chung
    children: [
      {
        path: "/admin",
        element: <Dashboard/>
      },
      {
        path: "/admin/user",
        element: <AccountUser/>
      },
      {
        path: "/admin/doctor",
        element: <AccountDoctor/>
      },
      {
        path: "/admin/appointment",
        element: <Appointment/>
      },
      {
        path: "/admin/feedback",
        element: <Feedback/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

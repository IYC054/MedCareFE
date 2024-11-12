import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './page/Home';
import About from './page/About';
import New from './page/New';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './page/RootLayout';
import RootLayoutAdmin from './Admin/RootLayoutAdmin';
import Dashboard from './Admin/page/Dashboard';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
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
    element: <RootLayoutAdmin />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

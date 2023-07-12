import { createBrowserRouter } from "react-router-dom";

import UnautentifiedLayout from "./layouts/unautentified";
import AuthentifiedLayout from "./layouts/authentified";

import Login from "./pages/login";
import RegisterForm from "./pages/register";

import Dashboard from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: UnautentifiedLayout,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      }
    ],
  },
  {
    path: "/dashboard",
    Component: AuthentifiedLayout,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  }
]);

export default router;

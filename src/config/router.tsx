import { lazy } from "react";
const Home = lazy(() => import("@myPages/home"));
const Login = lazy(() => import("@myPages/login"));
const Admin = lazy(() => import("@myPages/admin"));

import { useRoutes } from "react-router-dom";

export const RouterBase = () =>
  useRoutes([
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      path: "home/:id",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "admin",
      element: <Admin />, 
    },
    {
      path: "*",
      element: <div>404~</div>,
    },
  ]);

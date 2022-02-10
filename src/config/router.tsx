import { lazy } from "react";
const Home = lazy(() => import('@myPages/home'));
const Login = lazy(() => import("@myPages/login"));
import { useRoutes } from "react-router-dom";

export const RouterBase = () =>
  useRoutes([
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <div>404~</div>,
    },
  ]);
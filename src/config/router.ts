import { lazy } from 'react';
const Home = lazy(() => import('@myPages/home'));
const Login = lazy(() => import('@myPages/login'));


export const RouterBase = [
    {
        path: "/home",
        name: "Home",
        exact: true,
        childer: Home,
    },
    {
        path: "/login",
        name: "Login",
        exact: true,
        childer: Login,
        index: true
    }
]

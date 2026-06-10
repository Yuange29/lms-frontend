import AuthLayout from "../components/layout/AuthLayout";
import CourseCreatePage from "../pages/CourseCreatePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout.jsx";
import RegisterPage from "../pages/RegisterPage";
import SettingPage from "../pages/SettingPage";
import { paths } from "./paths";

export const routes = [
    {
        path: paths.home,
        component: HomePage,
        layout: MainLayout,
    },
    {
        path: paths.homeAlias,
        component: HomePage,
        layout: MainLayout,
    },
    {
        path: paths.setting,
        component: SettingPage,
        layout: MainLayout,
    },
    {
        path: paths.signin,
        component: LoginPage,
        layout: AuthLayout,
    },
    {
        path: paths.courseCreate,
        component: CourseCreatePage,
        layout: MainLayout,
    },
    {
        path: paths.register,
        component: RegisterPage,
        layout: AuthLayout,
    },
];

export function getRoute(pathname) {
    return routes.find((route) => route.path === pathname) || routes[0];
}

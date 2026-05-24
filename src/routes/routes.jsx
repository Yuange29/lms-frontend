import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
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
];

export function getRoute(pathname) {
    return routes.find((route) => route.path === pathname) || routes[0];
}

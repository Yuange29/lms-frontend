import AuthLayout from "../components/layout/AuthLayout";
import Course from "./../pages/Course";
import CourseCreatePage from "../pages/CourseCreatePage";
import CourseDetailPage from "../pages/CourseDetailPage.jsx";
import CreateQuizPage from "../pages/CreateQuizPage";
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
        path: paths.course,
        component: Course,
        layout: MainLayout,
    },
    {
        path: paths.courseCreate,
        component: CourseCreatePage,
        layout: MainLayout,
    },
    {
        path: paths.courseDetail,
        component: CourseDetailPage,
        layout: MainLayout,
    },
    // CreateQuizPage is a nested route under course detail: /course-info/:id/quiz
    {
        path: paths.register,
        component: RegisterPage,
        layout: AuthLayout,
    },
];

export function getRoute(pathname) {
    const exactRoute = routes.find((route) => route.path === pathname);
    if (exactRoute) {
        return exactRoute;
    }

    // If path is /course-info/:id/quiz -> render CreateQuizPage
    if (
        pathname.startsWith(`${paths.courseDetail}/`) &&
        pathname.endsWith("/quiz")
    ) {
        return {
            path: pathname,
            component: CreateQuizPage,
            layout: MainLayout,
        };
    }

    const detailRoute = routes.find(
        (route) =>
            route.path === paths.courseDetail &&
            pathname.startsWith(`${paths.courseDetail}/`),
    );

    return detailRoute || routes[0];
}

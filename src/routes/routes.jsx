import AuthLayout from "../components/layout/AuthLayout";
import CourseCreatePage from "../pages/course/CourseCreatePage.jsx";
import CourseDetailPage from "../pages/course/CourseDetailPage.jsx";
import CoursesPage from "../pages/course/CoursesPage.jsx";
import CreateQuizPage from "../pages/quiz/CreateQuizPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout.jsx";
import QuizResultPage from "../pages/quiz/QuizResultPage.jsx";
import QuizShowPage from "../pages/quiz/QuizShowPage.jsx";
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
        component: CoursesPage,
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

    // If path is /quiz/:id/submission -> render CreateQuizPage
    if (
        pathname.startsWith(`${paths.courseDetail}/`) &&
        pathname.endsWith("/submission")
    ) {
        return {
            path: pathname,
            component: QuizResultPage,
            layout: MainLayout,
        };
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

    if (
        pathname.startsWith(`${paths.courseBase}/`) &&
        pathname.includes("quiz") &&
        pathname.endsWith("/show")
    ) {
        return {
            path: pathname,
            component: QuizShowPage,
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

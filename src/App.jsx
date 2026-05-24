import { useEffect, useState } from "react";
import { getRoute } from "./routes/routes";

function App() {
    const [pathname, setPathname] = useState(window.location.pathname);
    const route = getRoute(pathname);
    const Page = route.component;
    const Layout = route.layout;

    useEffect(() => {
        const handleRouteChange = () => {
            setPathname(window.location.pathname);
        };

        window.addEventListener("popstate", handleRouteChange);
        window.addEventListener("app:navigate", handleRouteChange);

        return () => {
            window.removeEventListener("popstate", handleRouteChange);
            window.removeEventListener("app:navigate", handleRouteChange);
        };
    }, []);

    return (
        <Layout>
            <Page />
        </Layout>
    );
}

export default App;

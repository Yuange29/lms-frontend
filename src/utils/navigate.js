export const navigate = (path) => {
    const url = new URL(path, window.location.href);

    window.history.pushState(null, "", url.pathname);
    window.dispatchEvent(new Event("app:navigate"));
};

// navigate("quiz/123");
// -> /course-info/quiz/123

// navigate("/quiz/123");
// -> /quiz/123

// navigate("../");
// -> quay lên một cấp

export const navigateBack = () => {
    window.history.back();
};

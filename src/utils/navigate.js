export const navigate = (path) => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new Event("app:navigate"));
};

export const navigateBack = () => {
    window.history.back();
};

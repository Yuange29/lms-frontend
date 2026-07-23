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

export function getIdsFromPath(...idsName) {
    const pathArr = window.location.pathname.split("/").filter(Boolean);

    return idsName.reduce((result, idName) => {
        const idx = pathArr.indexOf(idName);

        if (idx === -1 || pathArr[idx + 1] === undefined)
            throw new Error(`${idName} not found in path`);

        result[idName] = pathArr[idx + 1];

        return result;
    }, {});
}
// const ids = getIdsFromPath(path, "course", "quiz")
// ==> {course: "sdfhsjkdh", quiz: "kjgdsaf"}

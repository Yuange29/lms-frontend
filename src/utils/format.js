// "2026-06-10T02:15:30.308Z" timestamp
export const getDay = (date) => {
    const day = new Date(date).getDate();
    return day < 10 ? `0${day}` : day;
};

export const formatPrice = (price) => {
    if (!price && price !== 0) return "0 VND";
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    }).format(price);
};

export const formatPriceSimple = (price) => {
    if (!price && price !== 0) return "0 VND";
    return `${price?.toLocaleString("vi-VN")} VND`;
};

export const formatDate = (iso) => {
    if (!iso) return "-";
    try {
        return new Date(iso).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch {
        return iso;
    }
};

export const formatTimeLeft = (seconds) => {
    if (seconds === null || seconds === undefined || Number.isNaN(seconds)) {
        return "00:00";
    }

    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60)
        .toString()
        .padStart(2, "0");
    const remainingSeconds = (safeSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
};

export const formatFirstLetter = (str) => {
    str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function shuffleArray(arr) {
    if (!Array.isArray(arr)) return [];

    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function normalizeQuestions(questions) {
    if (Array.isArray(questions)) return questions;
    if (questions && Array.isArray(questions.questions))
        return questions.questions;
    return [];
}

export function shuffleQuiz(questions, options = {}) {
    const { shuffleAnswers = true, updateOrderIndex = true } = options;

    const safeQuestions = normalizeQuestions(questions);

    let shuffledQuestions = shuffleArray(safeQuestions);

    shuffledQuestions = shuffledQuestions.map((q) => ({
        ...q,
        answers: shuffleAnswers ? shuffleArray(q?.answers) : (q?.answers ?? []),
    }));

    if (updateOrderIndex) {
        shuffledQuestions = shuffledQuestions.map((q, index) => ({
            ...q,
            order_index: index,
        }));
    }

    return shuffledQuestions;
}

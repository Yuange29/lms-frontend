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

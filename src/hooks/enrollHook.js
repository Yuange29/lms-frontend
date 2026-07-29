import { EnrollContext } from "../contexts/EnrollContext";
import { useContext } from "react";

export function useEnroll() {
    const context = useContext(EnrollContext);

    if (!context) throw new Error("useEnroll must be use within Provider");

    return context;
}

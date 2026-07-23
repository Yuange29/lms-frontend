import { memo, useEffect, useRef, useState } from "react";

import { TimerBox } from "../quiz.style";
import { formatTimeLeft } from "../../../utils/format";

const QuizTimer = memo(function QuizTimer({ initialSeconds, onExpire }) {
    const [timeLeft, setTimeLeft] = useState(() => initialSeconds);
    const [isExpired, setIsExpired] = useState(false);
    const autoSubmitAttemptedRef = useRef(false);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (!isExpired || autoSubmitAttemptedRef.current) return;

        autoSubmitAttemptedRef.current = true;
        onExpire?.();
    }, [isExpired, onExpire]);

    return (
        <TimerBox>
            <div className="timer-value">{formatTimeLeft(timeLeft)}</div>
        </TimerBox>
    );
});

export { QuizTimer };

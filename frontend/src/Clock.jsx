import React, { useState, useEffect } from "react";

function Clock({ isRunning, onEnd }) {
    const [time, setTime] = useState(6 * 60);

    useEffect(() => {
        if (!isRunning) return;

        const start = performance.now();
        const duration = 5 * 60 * 1000;
        const virtTime = 6 * 60;

        const interval = setInterval(() => {
            const elapsed = performance.now() - start;

            if (elapsed >= duration) {
                setTime(12 * 60);
                clearInterval(interval);
                onEnd();
                return;
            }

            const minutes = Math.floor((elapsed / duration) * virtTime);

            setTime(6 * 60 + minutes);

        }, 100);

        return () => clearInterval(interval);
    }, [isRunning, onEnd]);

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return (
        <span>
            TIME: {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")} AM
        </span>
    );
}

export default Clock;

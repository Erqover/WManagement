import React, { useState, useEffect} from "react";
import Summary from "./Summary";

function Clock() {
    const [time, setTime] = useState(6*60);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        const start = performance.now();
        const duration = 5 * 60 * 1000;
        const virtTime = 18 * 60;

        const interval = setInterval(() => {
            const elapsed = performance.now() - start;

            if(elapsed >= duration) {
                setTime(24 * 60);
                setEnd(true);
                clearInterval(interval);
                return;
            }

            const minutes = Math.floor((elapsed / duration) * virtTime);

            setTime(6 * 60 + minutes);

        }, 100);

        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if(end) {
        return <Summary/>;
    }

    return (
        <div>
            <h1>
                {String(hours).padStart(2, "0")}:
                {String(minutes).padStart(2, "0")}
            </h1>
        </div>
    );
}

export default Clock;

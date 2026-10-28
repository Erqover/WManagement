import React, { useState, useEffect } from "react";
import Podsumowanie from "./Podsumowanie";

function Zegar() {
    const [czas, setCzas] = useState(6 * 60);
    const [koniec, setKoniec] = useState(false);

    useEffect(() => {
        const start = performance.now();
        const czasTrawnia = 5 * 60 * 1000;
        const czasWirtualny = 6 * 60;

        const interval = setInterval(() => {
            const uplynelo = performance.now() - start;

            if (uplynelo >= czasTrawnia) {
                setCzas(12 * 60);
                setKoniec(true);
                clearInterval(interval);
                return;
            }

            const minuty = Math.floor((uplynelo / czasTrawnia) * czasWirtualny);

            setCzas(6 * 60 + minuty);

        }, 100);

        return () => clearInterval(interval);
    }, []);

    const godziny = Math.floor(czas / 60);
    const minuty = czas % 60;

    if (koniec) {
        return <Podsumowanie />;
    }

    return (
        <span>
            TIME: {String(godziny).padStart(2, "0")}:{String(minuty).padStart(2, "0")} AM
        </span>
    );
}

export default Zegar;
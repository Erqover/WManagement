import React, { useState, useRef, useCallback, useEffect } from 'react';
import './GameScreen.css';
import Clock from './Clock';
import Summary from './Summary';

const getGameDateObj = (dayNumber) => {
    const date = new Date(2026, 10, 12);
    date.setDate(date.getDate() + (dayNumber - 1));
    return date;
};

const formatDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
};

const MANIFEST_TEMPLATES = [
    {
        carrier: 'CHEM-TRANS',
        items: '20x Acid, 10x Solvents',
        declaredQty: 30,
        actualQty: 30,
        expDate: new Date(2026, 9, 24),
        hasSignature: false,
    },
    {
        carrier: 'BIO-LOGISTIC',
        items: '15x Chlorine Drums',
        declaredQty: 15,
        actualQty: 15,
        expDate: new Date(2027, 2, 15),
        hasSignature: true,
    },
    {
        carrier: 'NORD-CHEM',
        items: '12x Mercury Vials',
        declaredQty: 12,
        actualQty: 9,
        expDate: new Date(2027, 5, 1),
        hasSignature: true,
    },
    {
        carrier: 'ALFA-CARGO',
        items: '40x Neutralizer',
        declaredQty: 40,
        actualQty: 40,
        expDate: new Date(2027, 0, 10),
        hasSignature: true,
    },
];

const getManifestByIndex = (index) => {
    const template = MANIFEST_TEMPLATES[index % MANIFEST_TEMPLATES.length];
    return {
        ...template,
        id: `#${903 + index}-CH`,
    };
};

const validateManifest = (manifest, currentGameDate) => {
    const errors = [];

    if (manifest.expDate < currentGameDate) {
        errors.push('PRZETERMINOWANY TOWAR');
    }
    if (manifest.declaredQty !== manifest.actualQty) {
        errors.push(`NIEZGODNA ILOŚĆ (${manifest.actualQty}/${manifest.declaredQty})`);
    }
    if (!manifest.hasSignature) {
        errors.push('BRAK PODPISU');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export default function GameScreen({ saveData, onBackToMenu }) {
    //Do obslugi Summary po zakonczeniu dnia
    const [dayEnded, setDayEnded] = useState(false);
    const handleDayEnd = useCallback(() => {
        setDayEnded(true);
    }, []);

    //Numeracja dni i stan zmiany
    const [currentDay, setCurrentDay] = useState(saveData?.save_data?.day ?? 1);
    const [money, setMoney] = useState(saveData?.save_data?.money ?? 0);

    //Czy gracz kliknął "NASTĘPNA DOSTAWA" i uruchomił zegar
    const [shiftStarted, setShiftStarted] = useState(false);
    const [noteSlidingOut, setNoteSlidingOut] = useState(false);

    //const currentDay = saveData?.save_data?.day ?? 1;
    const gameDateObj = getGameDateObj(currentDay);
    const formattedDate = formatDate(gameDateObj);

    const [manifestIndex, setManifestIndex] = useState(0);
    const [manifest, setManifest] = useState(() => getManifestByIndex(0));

    // Stan przeciągania i odcisku pieczęci
    const [draggedStamp, setDraggedStamp] = useState(null); // 'ACCEPTED' | 'REJECTED' | null
    const [isDragOver, setIsDragOver] = useState(false);
    const [stampMark, setStampMark] = useState(null); // { type, x, y, angle }
    const [feedback, setFeedback] = useState(null);

    const manifestRef = useRef(null);

    const [dayInfo, setDayInfo] = useState({
        title: `DZIEŃ ${String(currentDay).padStart(2, '0')}`,
        briefing: 'Ładowanie wytycznych...',
        rules: [
            { id: 'CHECK_EXPIRATION', label: 'SPRAWDŹ DATĘ WAŻNOŚCI' },
            { id: 'CHECK_QUANTITY', label: 'PORÓWNAJ ILOŚĆ Z RAMPĄ' },
            { id: 'CHECK_SIGNATURE', label: 'WYMAGANY PODPIS KIEROWCY' },
        ],
    })

    useEffect(() => {
        fetch(`http://localhost:5000/api/days/${currentDay}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.briefing) {
                    setDayInfo(data);
                }
            })
            .catch((err) => console.error('Błąd pobierania danych', err));
    }, [currentDay]);

    const handleStartNextDay = async () => {
        const nextDay = currentDay + 1;

        if (saveData?.slot_id) {
            try {
                await fetch('http://localhost:5000/api/saves/new', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slot_id: saveData.slot_id,
                        save_data: {
                            day: nextDay,
                            money: money,
                            unlocked_tools: saveData?.save_data?.unlocked_tools ?? [],
                        },
                    }),
                });
            } catch (err) {
                console.error('Błąd zapisu postępu kolejnego dnia: ', err);
            }
        }

        setCurrentDay(nextDay);
        setShiftStarted(false);
        setNoteSlidingOut(false);
        setStampMark(null);
        setFeedback(null);
        setDayEnded(false);
    }

    // rozpoczęcie pierwszej dostawy (animacja kartki)
    const handleStartFirstDelivery = () => {
        setNoteSlidingOut(true);
        setTimeout(() => {
            setShiftStarted(true);
        }, 550);
    }


    // Rozpoczęcie przeciągania stempla z tacki
    const handleDragStart = (e, stampType) => {
        if (stampMark) {
            e.preventDefault();
            return;
        }
        setDraggedStamp(stampType);
        e.dataTransfer.setData('text/plain', stampType);
        e.dataTransfer.effectAllowed = 'move';
    };

    // Zakończenie przeciągania
    const handleDragEnd = () => {
        setDraggedStamp(null);
        setIsDragOver(false);
    };

    // Stempel znajduje się nad kartką manifestu
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (!isDragOver) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    // Upuszczenie stempla na kartkę manifestu
    const handleDropOnManifest = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const chosenDecision =
            draggedStamp || e.dataTransfer.getData('text/plain');
        setDraggedStamp(null);

        if (!chosenDecision || stampMark) return;

        // Obliczenie pozycji odbicia pieczęci wewnątrz kartki
        const rect = manifestRef.current.getBoundingClientRect();
        const stampWidth = 150;
        const stampHeight = 56;
        const rawX = e.clientX - rect.left - stampWidth / 2;
        const rawY = e.clientY - rect.top - stampHeight / 2;

        const clampedX = Math.max(12, Math.min(rawX, rect.width - stampWidth - 12));
        const clampedY = Math.max(44, Math.min(rawY, rect.height - stampHeight - 12));
        const randomAngle = Math.floor(Math.random() * 11) - 8; // kąt od -8° do +2°

        setStampMark({
            type: chosenDecision,
            x: clampedX,
            y: clampedY,
            angle: randomAngle,
        });

        // Weryfikacja decyzji z zasadami
        const { isValid, errors } = validateManifest(manifest, gameDateObj);
        const playerAccepted = chosenDecision === 'ACCEPTED';
        const isCorrect = playerAccepted === isValid;

        if (isCorrect) {
            setMoney((prev) => prev + 50);
            setFeedback({
                type: 'success',
                message: isValid
                    ? 'DECYZJA POPRAWNA (+50 $) — DOSTAWA ZGODNA Z PROCEDURĄ'
                    : `DECYZJA POPRAWNA (+50 $) — ODRZUCONO: ${errors.join(', ')}`,
            });
        } else {
            setMoney((prev) => prev - 30);
            setFeedback({
                type: 'error',
                message: isValid
                    ? 'BŁĄD INSPEKTORA (-30 $) — ODRZUCONO PRAWIDŁOWY TRANSPORT'
                    : `NARUSZENIE PROCEDURY (-30 $) — POWÓD: ${errors.join(', ')}`,
            });
        }
    };

    const handleStampClickHint = () => {
        if (!shiftStarted) {
            setFeedback({
                type: 'hint',
                message: 'NAJPIERW KLIKNIJ "NASTĘPNA DOSTAWA", ABY ROZPOCZĄĆ ZMIANĘ',
            });
            return;
        }
        if (stampMark) return;
        setFeedback({
            type: 'hint',
            message: 'PRZYTRZYMAJ I PRZECIĄGNIJ STEMPEL NA KARTKĘ MANIFESTU',
        });
    };

    const handleNextDelivery = () => {
        const nextIndex = manifestIndex + 1;
        setManifestIndex(nextIndex);
        setManifest(getManifestByIndex(nextIndex));
        setStampMark(null);
        setFeedback(null);
    };

    //Wyswietlenie summary po zakonczeniu dnia
    if (dayEnded) {
        return (
            <Summary
                day={currentDay}
                money={money}
                onNextDay={handleStartNextDay}
            />
        );
    }

    //przycisk dostawy aktywny tylko gdy podbilismy dostawe
    const canTriggerNextDelivery = !shiftStarted || Boolean(stampMark);

    return (
        <div className="game-screen">
            <div className="window-view">
                <div>
                    {shiftStarted
                        ? `[WIDOK NA RAMPĘ — WYKRYTO ${manifest.actualQty} SZT. ŁADUNKU]`
                        : '[RAMPA PUSTA — ZAPOZNaj SIĘ Z WYTYCZNYMI DNIA]'}
                </div>

                {feedback && (
                    <div className={`hud-feedback ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}

                <div className="hud-top-bar">
                    <div className="hud-date">
                        DATE: {formattedDate} | SALDO: {money} $
                    </div>

                    <div className="hud-right-group">
                        <button className="hud-btn-back" onClick={onBackToMenu}>
                            ← MENU
                        </button>

                        <div className="hud-clock">
                            <Clock
                                key={currentDay}
                                isRunning={shiftStarted}
                                onEnd={handleDayEnd}
                            />{' '}
                            | DAY {String(currentDay).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="desk-view">
                {/* 1. PORANNA KARTKA LUB DOKUMENT MANIFESTU */}
                {!shiftStarted ? (
                    <div
                        className={`briefing-note ${noteSlidingOut ? 'slide-down-exit' : ''
                            }`}
                    >
                        <div className="briefing-header">{dayInfo.title}</div>
                        <p className="briefing-text">{dayInfo.briefing}</p>
                        <div className="briefing-footer">
                            — KIEROWNICTWO ZMIANY CHEMZERO
                        </div>
                    </div>
                ) : (
                    <div
                        ref={manifestRef}
                        className={`manifest-document ${isDragOver ? 'manifest-drop-active' : ''
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDropOnManifest}
                    >
                        <div className="manifest-title">
                            DELIVERY MANIFEST {manifest.id}
                        </div>
                        <div className="manifest-row">
                            <strong>CARRIER:</strong> {manifest.carrier}
                        </div>
                        <div className="manifest-row">
                            <strong>ITEMS:</strong> {manifest.items}
                        </div>
                        <div className="manifest-row">
                            <strong>DECLARED QTY:</strong> {manifest.declaredQty} pcs
                        </div>
                        <div className="manifest-row">
                            <strong>EXP:</strong> {formatDate(manifest.expDate)}
                        </div>
                        <div className="manifest-row">
                            <strong>SIGNATURE:</strong>{' '}
                            {manifest.hasSignature ? 'J. Kowalski' : '[brak]'}
                        </div>

                        {/* ODCISK PIECZĘCI W MIEJSCU UPUSZCZENIA NA KARTCE */}
                        {stampMark && (
                            <div
                                className={`manifest-stamp-placed ${stampMark.type === 'ACCEPTED'
                                    ? 'stamp-approved'
                                    : 'stamp-rejected'
                                    }`}
                                style={{
                                    left: `${stampMark.x}px`,
                                    top: `${stampMark.y}px`,
                                    transform: `rotate(${stampMark.angle}deg)`,
                                }}
                            >
                                {stampMark.type === 'ACCEPTED' ? (
                                    <>
                                        PRZYJĘTO
                                        <br />
                                        APPROVED
                                    </>
                                ) : (
                                    <>
                                        ODRZUCONO
                                        <br />
                                        REJECTED
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 2. TACKA ZE STEMPLAMI DO PRZECIĄGANIA */}
                <div className="stamp-tray">
                    <div
                        role="button"
                        tabIndex={0}
                        draggable={!stampMark}
                        onDragStart={(e) => handleDragStart(e, 'REJECTED')}
                        onDragEnd={handleDragEnd}
                        onClick={handleStampClickHint}
                        className={`stamp-handle stamp-reject ${draggedStamp === 'REJECTED' ? 'stamp-dragging' : ''
                            } ${stampMark ? 'stamp-locked' : ''}`}
                    >
                        <div className="stamp-knob"></div>
                        <span>ODRZUĆ</span>
                    </div>

                    <div
                        role="button"
                        tabIndex={0}
                        draggable={!stampMark}
                        onDragStart={(e) => handleDragStart(e, 'ACCEPTED')}
                        onDragEnd={handleDragEnd}
                        onClick={handleStampClickHint}
                        className={`stamp-handle stamp-accept ${draggedStamp === 'ACCEPTED' ? 'stamp-dragging' : ''
                            } ${stampMark ? 'stamp-locked' : ''}`}
                    >
                        <div className="stamp-knob"></div>
                        <span>PRZYJMIJ</span>
                    </div>
                </div>

                {/* 3. DZIENNIK ZASAD / NOTES (ZASILANY DYNAMICZNIE Z RULES.JSON) */}
                <div className="rules-notebook">
                    <div className="notebook-rings">○○○○○○○○○○</div>
                    <div className="notebook-title">ZASADY PRZYJĘCIA</div>
                    <ul className="notebook-list">
                        {dayInfo.rules.map((rule) => (
                            <li key={rule.id} title={rule.description}>
                                {rule.label}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. PRZYCISK STARTU ZMIANY LUB NASTĘPNEJ DOSTAWY */}
                <div className="desk-actions">
                    <button
                        className="desk-btn desk-btn-next"
                        disabled={!canTriggerNextDelivery}
                        onClick={
                            !shiftStarted
                                ? handleStartFirstDelivery
                                : handleNextDelivery
                        }
                    >
                        NASTĘPNA DOSTAWA →
                    </button>
                </div>
            </div>
        </div>
    );
}

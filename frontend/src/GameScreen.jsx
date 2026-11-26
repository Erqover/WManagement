import React, { useState, useRef } from 'react';
import './GameScreen.css';
import Clock from './Clock';

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
    const currentDay = saveData?.save_data?.day ?? 1;
    const gameDateObj = getGameDateObj(currentDay);
    const formattedDate = formatDate(gameDateObj);

    const [money, setMoney] = useState(saveData?.save_data?.money ?? 0);
    const [manifestIndex, setManifestIndex] = useState(0);
    const [manifest, setManifest] = useState(() => getManifestByIndex(0));

    // Stan przeciągania i odcisku pieczęci
    const [draggedStamp, setDraggedStamp] = useState(null); // 'ACCEPTED' | 'REJECTED' | null
    const [isDragOver, setIsDragOver] = useState(false);
    const [stampMark, setStampMark] = useState(null); // { type, x, y, angle }
    const [feedback, setFeedback] = useState(null);

    const manifestRef = useRef(null);

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

    return (
        <div className="game-screen">
            <div className="window-view">
                <div>
                    [WIDOK NA RAMPĘ — WYKRYTO {manifest.actualQty} SZT. ŁADUNKU]
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
                            <Clock/> | DAY {String(currentDay).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="desk-view">
                {/* 1. DOKUMENT MANIFESTU (STREFA UPUSZCZANIA STEMPLA) */}
                <div
                    ref={manifestRef}
                    className={`manifest-document ${isDragOver ? 'manifest-drop-active' : ''}`}
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
                            className={`manifest-stamp-placed ${
                                stampMark.type === 'ACCEPTED'
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

                {/* 2. TACKA ZE STEMPLAMI DO PRZECIĄGANIA */}
                <div className="stamp-tray">
                    <div
                        role="button"
                        tabIndex={0}
                        draggable={!stampMark}
                        onDragStart={(e) => handleDragStart(e, 'REJECTED')}
                        onDragEnd={handleDragEnd}
                        onClick={handleStampClickHint}
                        className={`stamp-handle stamp-reject ${
                            draggedStamp === 'REJECTED' ? 'stamp-dragging' : ''
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
                        className={`stamp-handle stamp-accept ${
                            draggedStamp === 'ACCEPTED' ? 'stamp-dragging' : ''
                        } ${stampMark ? 'stamp-locked' : ''}`}
                    >
                        <div className="stamp-knob"></div>
                        <span>PRZYJMIJ</span>
                    </div>
                </div>

                {/* 3. DZIENNIK ZASAD / NOTES */}
                <div className="rules-notebook">
                    <div className="notebook-rings">○○○○○○○○○○</div>
                    <div className="notebook-title">ZASADY PRZYJĘCIA</div>
                    <ul className="notebook-list">
                        <li>SPRAWDŹ DATĘ</li>
                        <li>ILOŚĆ</li>
                        <li>PODPIS</li>
                    </ul>
                </div>

                {/* 4. PRZYCISK NASTĘPNEJ DOSTAWY */}
                {stampMark && (
                    <div className="desk-actions">
                        <button
                            className="desk-btn desk-btn-next"
                            onClick={handleNextDelivery}
                        >
                            NASTĘPNA DOSTAWA →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

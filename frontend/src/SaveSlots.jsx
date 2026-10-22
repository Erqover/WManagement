import React, { useState, useEffect } from 'react';
import './MainMenu.css';

export default function SaveSlots({ onSelectSlot, onBack }) {
    const [slots, setSlots] = useState({ 1: null, 2: null, 3: null });

    const [confirmingSlot, setConfirmingSlot] = useState(null);

    const loadSlots = () => {
        fetch('http://localhost:5000/api/saves')
            .then((res) => res.json())
            .then((data) => {
                const map = { 1: null, 2: null, 3: null };
                data.forEach((save) => {
                    map[save.slot_id] = save;
                });
                setSlots(map);
            })
            .catch((err) => console.error('Brak połączenia z backendem:', err));
    };

    useEffect(() => {
        loadSlots();
    }, []);

    const handleStartSave = async (slotId) => {
        try {
            const response = await fetch('http://localhost:5000/api/saves/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotId }),
            });
            const data = await response.json();
            onSelectSlot(data);
        } catch {
            onSelectSlot({ slot_id: slotId, current_day: 1, balance: 250 });
        }
    };

    const handleDeleteSave = async (slotId) => {
        try {
            await fetch(`http://localhost:5000/api/saves/${slotId}`, { method: 'DELETE' })
            setSlots((prev) => ({ ...prev, [slotId]: null }));
        } catch (err) {
            console.error('Blad usuwania zapisu: ', err);
        } finally {
            setConfirmingSlot(null)
        }
    }

    return (
        <div
            className="menu-screen"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
            }}
        >
            <div className="center-panel" style={{ width: '560px' }}>
                <h2 className="game-title" style={{ fontSize: '38px', marginBottom: '8px', textAlign: 'center' }}>
                    REJESTR ZMIAN
                </h2>
                <div className="game-subtitle" style={{ textAlign: 'center', marginBottom: '32px' }}>
                    WYBIERZ PROFIL ZAPISU
                </div>

                <div className="menu-buttons">
                    {[1, 2, 3].map((id) => {
                        const save = slots[id];
                        const isConfirming = confirmingSlot === id;

                        return (
                            <div key={id} className="slot-row">
                                {/* Główny przycisk wyboru slotu */}
                                <button
                                    className="pixel-btn slot-main-btn"
                                    onClick={() => handleStartSave(id)}
                                    style={{ textAlign: 'center', padding: '16px 20px' }}
                                >
                                    <div>SLOT 0{id}</div>
                                    <div style={{ fontSize: '18px', color: '#6ee7b7', marginTop: '6px' }}>
                                        {save
                                            ? `DZIEŃ: ${save.current_day} | SALDO: ${save.balance} $`
                                            : '[ PUSTY SLOT ]'}
                                    </div>
                                </button>

                                {/* Sekcja usuwania (aktywna tylko gdy slot posiada dane) */}
                                {save && (
                                    <div className="slot-actions">
                                        {!isConfirming ? (
                                            <button
                                                className="action-btn action-trash"
                                                title="Usuń zapis"
                                                onClick={() => setConfirmingSlot(id)}
                                            >
                                                🗑️
                                            </button>
                                        ) : (
                                            <>
                                                {/* Potwierdzenie usunięcia */}
                                                <button
                                                    className="action-btn action-confirm"
                                                    title="Potwierdź usunięcie"
                                                    onClick={() => handleDeleteSave(id)}
                                                >
                                                    ✓
                                                </button>
                                                {/* Anulowanie i powrót do kosza */}
                                                <button
                                                    className="action-btn action-cancel"
                                                    title="Anuluj"
                                                    onClick={() => setConfirmingSlot(null)}
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <button
                        className="pixel-btn pixel-btn-quit"
                        onClick={onBack}
                        style={{ marginTop: '16px' }}
                    >
                        POWRÓT DO MENU
                    </button>
                </div>
            </div>
        </div>
    );
}
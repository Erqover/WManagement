import React from 'react';
import './MainMenu.css';

export default function MainMenu({ onNewGame, onContinue }) {
    const handleQuit = () => {
        if (window.electronAPI) {
            window.electronAPI.quitGame();
        } else {
            alert('Wyjście z aplikacji działa w oknie Electron.');
        }
    };

    return (
        <div className="menu-screen">
            {/* LEWA KOLUMNA: BIURKO / DOKUMENTACJA */}
            <div className="side-panel">
                <div className="warning-box">[!] STREFA KONTROLI HAZMAT</div>
                <div className="industrial-decal">
                    SEKTOR 04-B
                    <br />
                    PROCEDURA REJESTRACJI DOSTAW CHEMICZNYCH
                    <br />
                    ZGODNOŚĆ: ISO/IEC 25002
                </div>
            </div>

            {/* ŚRODKOWA KOLUMNA: GŁÓWNY PANEL MENU */}
            <div className="center-panel">
                <div className="title-container">
                    <span className="flask-icon">⚗️</span>
                    <h1 className="game-title">ChemZero</h1>
                </div>
                <div className="game-subtitle">SYS. KONTROLI SKŁADU v0.1</div>

                <div className="menu-buttons">
                    <button
                        className="pixel-btn pixel-btn-primary"
                        onClick={onNewGame}
                    >
                        NOWA GRA
                    </button>

                    <button className="pixel-btn" onClick={onContinue}>
                        KONTYNUUJ
                    </button>

                    <button
                        className="pixel-btn pixel-btn-quit"
                        onClick={handleQuit}
                    >
                        WYJDŹ Z GRY
                    </button>
                </div>

                <div className="station-footer">
                    STANOWISKO: ZMIANA 06:00 - 12:00
                </div>
            </div>

            {/* PRAWA KOLUMNA: MAGAZYN / ZASOBNIKI */}
            <div className="side-panel right-panel">
                <div
                    className="warning-box"
                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                >
                    UWAGA: ODPADY TOKSYCZNE
                </div>
                <div className="industrial-decal">
                    STATUS APARATURY: AKTYWNY
                    <br />
                    DETEKTOR SKAŻEŃ: NORMA [0.0 ppm]
                    <br />
                    POJEMNIKI W TRAKCIE ROZŁADUNKU
                </div>
            </div>
        </div>
    );
}

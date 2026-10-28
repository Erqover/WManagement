import React, { useState, useEffect } from 'react';
import './GameScreen.css';
import Zegar from './Zegar';

export default function GameScreen({ saveData, onBackToMenu }) {
    return (
        <div className="game-screen">
            <div className="window-view">
                [WIDOK NA RAMPĘ]
                <div className="hud-top-bar">
                    <button className="hud-btn-back" onClick={onBackToMenu}>
                        ← MENU
                    </button>

                    <div className="hud-clock">
                        <Zegar /> | DAY {String(saveData?.current_day || 1).padStart(2, '0')}
                    </div>
                </div>
            </div>
            <div className="desk-view">
                {/* 1. DOKUMENT MANIFESTU */}
                <div className="manifest-document">
                    <div className="manifest-title">
                        DELIVERY MANIFEST #903-CH
                    </div>
                    <div className="manifest-row">
                        <strong>CARRIER:</strong> CHEM-TRANS
                    </div>
                    <div className="manifest-row">
                        <strong>ITEMS:</strong> 20x Acid, 10x Solvents
                    </div>
                    <div className="manifest-row">
                        <strong>EXP:</strong> 24/10/2026
                    </div>
                    <div className="manifest-row">
                        <strong>SIGNATURE:</strong> [brak]
                    </div>
                    <div className="manifest-stamp-preview">
                        BRAK PODPISU
                        <br />
                        NO SIGNATURE
                    </div>
                </div>

                {/* 2. TACKA ZE STEMPLAMI */}
                <div className="stamp-tray">
                    <button className="stamp-handle stamp-reject">
                        <div className="stamp-knob"></div>
                        <span>ODRZUĆ</span>
                    </button>
                    <button className="stamp-handle stamp-accept">
                        <div className="stamp-knob"></div>
                        <span>PRZYJMIJ</span>
                    </button>
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
            </div>
        </div>
    );
}

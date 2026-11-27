import React from "react";
import "./Summary.css";

const baseSalary = 100;

export default function Summary({day, money, onNextDay}){
    return(
        <div className="summary-screen">
            <div className="summary-panel">
                <div className="summary-header">
                    <div className="summary-title">RAPORT KONCA ZMIANY</div>
                    <div className="summary-subtitle">Dzień {day} zakonczony</div>
                </div>

                <div className="summary-section">
                    <div className="summary-row">
                        <span>Wynagrodzenie podstawowe</span>
                        <span className="val-neutral">{baseSalary}</span>
                    </div>
                    <div className="summary-row">
                        <span>Udane przyjecia (liczba)</span>
                        <span className="val-positive">0</span>
                    </div>
                    <div className="summary-row">
                        <span>Poprawne odrzucenia (liczba)</span>
                        <span className="val-positive">0</span>
                    </div>
                    <div className="summary-row">
                        <span>Kary (liczba)</span>
                        <span className="val-negative">0</span>
                    </div>
                </div>

                <div className="summary-totals">
                    <div className="summary-row">
                        <span>Suma zarobiona</span>
                        <span className="val-positive">0</span>
                    </div>
                    <div className="summary-row">
                        <span>Koszty</span>
                        <span className="val-negative">0</span>
                    </div>
                    <div className="summary-row summary-balance">
                        <span>Saldo</span>
                        <span className="val-balance">{money + baseSalary}</span>
                    </div>
                </div>

                <button 
                    className="pixel-btn pixel-btn-primary summary-next-btn"
                    onClick={onNextDay}
                >
                    Zacznij dzien {day + 1}
                </button>
            </div>
        </div>
    );
}

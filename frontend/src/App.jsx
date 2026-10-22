import React, { useState } from 'react';
import MainMenu from './MainMenu';
import SaveSlots from './SaveSlots';
import GameScreen from './GameScreen';

export default function App() {
    const [screen, setScreen] = useState('MAIN_MENU'); // upewnij się, że domyślna wartość to dokładnie 'MAIN_MENU'
    const [activeSave, setActiveSave] = useState(null);

    const handleStartGame = (saveData) => {
        setActiveSave(saveData);
        setScreen('GAME');
    };

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#0d1110' }}>
            {screen === 'MAIN_MENU' && (
                <MainMenu
                    onNewGame={() => setScreen('SAVES')}
                    onContinue={() => setScreen('SAVES')}
                />
            )}

            {screen === 'SAVES' && (
                <SaveSlots
                    onSelectSlot={handleStartGame}
                    onBack={() => setScreen('MAIN_MENU')}
                />
            )}

            {screen === 'GAME' && (
                <GameScreen onBackToMenu={() => setScreen('MAIN_MENU')} />
            )}
        </div>
    );
}

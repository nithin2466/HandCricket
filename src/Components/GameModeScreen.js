import React from 'react';

const GameModeScreen = ({ onModeSelect }) => {
  return (
    <div className="game-mode-container">
      <div className="mode-card">
        <h2>🏏 Game Mode</h2>
        <p>Choose how you want to play:</p>
        
        <div className="mode-buttons">
          <button 
            className="mode-btn vs-computer-btn"
            onClick={() => onModeSelect('computer')}
          >
            <span className="mode-icon">🤖</span>
            <span className="mode-text">
              <strong>Play vs Computer</strong>
              <small>Single Player</small>
            </span>
          </button>
          
          <button 
            className="mode-btn vs-player-btn"
            onClick={() => onModeSelect('multiplayer')}
          >
            <span className="mode-icon">👥</span>
            <span className="mode-text">
              <strong>Player vs Player</strong>
              <small>Multiplayer</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModeScreen;

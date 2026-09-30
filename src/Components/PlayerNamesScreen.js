import React, { useState } from 'react';

const PlayerNamesScreen = ({ gameMode, onNamesSubmit }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name1 = player1Name.trim() || 'Player 1';
    const name2 = gameMode === 'computer' ? 'Computer' : (player2Name.trim() || 'Player 2');

    if (!name1 || (gameMode === 'multiplayer' && !name2)) {
      setError('Please enter player names');
      return;
    }

    onNamesSubmit(name1, name2);
  };

  return (
    <div className="player-names-container">
      <div className="names-card">
        <h2>👤 Player Names</h2>
        <p>{gameMode === 'computer' ? 'Your name:' : 'Enter player names:'}</p>

        <form onSubmit={handleSubmit}>
          <div className="name-input-group">
            <input
              type="text"
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              maxLength="20"
              autoFocus
            />
          </div>

          {gameMode === 'multiplayer' && (
            <div className="name-input-group">
              <input
                type="text"
                placeholder="Player 2 Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                maxLength="20"
              />
            </div>
          )}

          {gameMode === 'computer' && (
            <div className="opponent-info">
              <p>🤖 vs Computer</p>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-names-btn">
            Start Game →
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerNamesScreen;

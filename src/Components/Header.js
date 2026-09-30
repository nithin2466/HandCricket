import React from 'react';

const Header = ({ currentInnings, currentBatter, currentBowler, player1Name, player2Name, target }) => {
  const getPlayerName = (player) => {
    if (player === 'player1') return player1Name || 'Player 1';
    return player2Name || 'Player 2';
  };

  return (
    <header>
      <h1>🏏 Hand Cricket</h1>
      <p>Runs should be between 1 and 6</p>
      
      {currentBatter && (
        <div className="game-info">
          <p className="innings-display">Innings {currentInnings}</p>
          <p className="roles-display">
            🏏 Batting: <strong>{getPlayerName(currentBatter)}</strong> | 
            🎯 Bowling: <strong>{getPlayerName(currentBowler)}</strong>
          </p>
          {target && <p className="target-display">Target: {target + 1} runs</p>}
        </div>
      )}
    </header>
  );
};

export default Header;

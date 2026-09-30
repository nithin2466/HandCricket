import React from 'react';

const ScoreBoard = ({ innings1, innings2, currentInnings, currentBatter }) => {
  const getCurrentScore = () => {
    if (currentInnings === 1) {
      return { player1: innings1.player1, player2: innings1.player2 };
    } else {
      return { player1: innings2.player1, player2: innings2.player2 };
    }
  };

  const currentScores = getCurrentScore();
  const player1Name = 'Player 1';
  const player2Name = 'Player 2';

  return (
    <div className="ScoreBoard">
      <div className="score-display">
        <div className="score-section">
          <h3>Innings {currentInnings}</h3>
          <p className="current-scores">
            {player1Name}: <span className={currentBatter === 'player1' ? 'batting' : ''}>{currentScores.player1}</span> | 
            {player2Name}: <span className={currentBatter === 'player2' ? 'batting' : ''}>{currentScores.player2}</span>
          </p>
        </div>

        {innings1.player1 > 0 || innings1.player2 > 0 ? (
          <div className="score-section innings-history">
            <h4>Innings 1 Summary</h4>
            <p>P1: {innings1.player1} | P2: {innings1.player2}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ScoreBoard;

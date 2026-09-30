import React from 'react';
import '../App.css';

const ResultScreen = ({ innings1, innings2, player1Name, player2Name, getWinner, onContinue }) => {
  const { message } = getWinner();
  
  const player1Total = innings1.player1 + innings2.player1;
  const player2Total = innings1.player2 + innings2.player2;

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="winner-message">{message}</h2>
        
        <div className="scoreboard-final">
          <div className="final-scores">
            <div className="player-score">
              <h3>{player1Name || 'Player 1'}</h3>
              <p className="innings-score">Innings 1: {innings1.player1}</p>
              <p className="innings-score">Innings 2: {innings2.player1}</p>
              <p className="total-score">Total: {player1Total}</p>
            </div>
            
            <div className="divider">vs</div>
            
            <div className="player-score">
              <h3>{player2Name || 'Player 2'}</h3>
              <p className="innings-score">Innings 1: {innings1.player2}</p>
              <p className="innings-score">Innings 2: {innings2.player2}</p>
              <p className="total-score">Total: {player2Total}</p>
            </div>
          </div>
        </div>

        <button className="play-again-btn" onClick={onContinue}>
          → View Stats
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;

import React from 'react';
import '../App.css';

const TossScreen = ({ onTossDecision }) => {
  return (
    <div className="toss-container">
      <div className="toss-card">
        <h2>🪙 TOSS 🪙</h2>
        <p>Who wants to bat first?</p>
        
        <div className="toss-buttons">
          <button 
            className="toss-btn player1-btn"
            onClick={() => onTossDecision('player1')}
          >
            👤 Player 1
          </button>
          
          <button 
            className="toss-btn player2-btn"
            onClick={() => onTossDecision('player2')}
          >
            👤 Player 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default TossScreen;

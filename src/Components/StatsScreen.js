import React from 'react';

const StatsScreen = ({ stats, onPlayAgain, onHome }) => {
  if (!stats) {
    return (
      <div className="stats-container">
        <div className="stats-card">
          <p>Loading stats...</p>
        </div>
      </div>
    );
  }

  const cvp = stats.computerVsPlayerStats;
  const pvp = stats.playerVsPlayerStats;
  const winRate = cvp.wins + cvp.losses + cvp.ties > 0 
    ? ((cvp.wins / (cvp.wins + cvp.losses + cvp.ties)) * 100).toFixed(1)
    : 0;
  const avgScore = cvp.wins + cvp.losses + cvp.ties > 0
    ? (cvp.totalRuns / (cvp.wins + cvp.losses + cvp.ties)).toFixed(1)
    : 0;

  return (
    <div className="stats-container">
      <div className="stats-card">
        <h2>📊 Game Statistics</h2>
        
        <div className="total-stats">
          <p>Total Games Played: <strong>{stats.totalGames}</strong></p>
        </div>

        {stats.totalGames > 0 && (
          <>
            {/* VS COMPUTER STATS */}
            {cvp.games.length > 0 && (
              <div className="stats-section">
                <h3>🤖 vs Computer</h3>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-label">Wins</span>
                    <span className="stat-value wins">{cvp.wins}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Losses</span>
                    <span className="stat-value losses">{cvp.losses}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Ties</span>
                    <span className="stat-value ties">{cvp.ties}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Win Rate</span>
                    <span className="stat-value">{winRate}%</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Avg Score</span>
                    <span className="stat-value">{avgScore}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Total Runs</span>
                    <span className="stat-value">{cvp.totalRuns}</span>
                  </div>
                </div>

                {/* Recent Games */}
                <div className="recent-games">
                  <h4>Recent Games</h4>
                  {cvp.games.slice(-5).reverse().map((game, idx) => (
                    <div key={idx} className="game-record">
                      <span className="game-date">{game.date}</span>
                      <span className="game-score">You: {game.playerScore}</span>
                      <span className="game-score">PC: {game.computerScore}</span>
                      <span className={`game-result ${game.winner.toLowerCase()}`}>
                        {game.winner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VS PLAYER STATS */}
            {pvp.games.length > 0 && (
              <div className="stats-section">
                <h3>👥 Player vs Player</h3>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-label">Total Games</span>
                    <span className="stat-value">{pvp.games.length}</span>
                  </div>
                </div>

                {/* Recent Games */}
                <div className="recent-games">
                  <h4>Recent Games</h4>
                  {pvp.games.slice(-5).reverse().map((game, idx) => (
                    <div key={idx} className="game-record">
                      <span className="game-date">{game.date}</span>
                      <span className="game-p1">{game.player1Name}: {game.player1Score}</span>
                      <span className="game-p2">{game.player2Name}: {game.player2Score}</span>
                      <span className="game-winner">
                        Winner: {game.winner === 'Tie' ? 'Tie' : game.winner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {stats.totalGames === 0 && (
          <p className="no-games">No games played yet. Play your first game!</p>
        )}

        <div className="stats-buttons">
          <button className="btn-play-again" onClick={onPlayAgain}>
            🎮 Play Again
          </button>
          <button className="btn-home" onClick={onHome}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsScreen;

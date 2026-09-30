import { useState, useEffect } from 'react';

const useStats = () => {
  const [stats, setStats] = useState(null);

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('handCricketStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      // Initialize empty stats
      setStats({
        totalGames: 0,
        computerVsPlayerStats: {
          wins: 0,
          losses: 0,
          ties: 0,
          totalRuns: 0,
          totalComputerRuns: 0,
          games: []
        },
        playerVsPlayerStats: {
          totalGames: 0,
          games: [] // Each game: {player1Name, player2Name, player1Score, player2Score, winner}
        }
      });
    }
  }, []);

  // Save game result to stats
  const recordGameResult = (gameMode, player1Name, player2Name, innings1, innings2) => {
    if (!stats) return;

    const player1Total = innings1.player1 + innings2.player1;
    const player2Total = innings1.player2 + innings2.player2;

    let winner;
    if (player1Total > player2Total) {
      winner = player1Name;
    } else if (player2Total > player1Total) {
      winner = player2Name;
    } else {
      winner = 'Tie';
    }

    const newStats = { ...stats };

    if (gameMode === 'computer') {
      const gameRecord = {
        date: new Date().toLocaleDateString(),
        playerName: player1Name,
        playerScore: player1Total,
        computerScore: player2Total,
        winner: winner === player1Name ? 'You' : (winner === 'Tie' ? 'Tie' : 'Computer'),
        innings1: { player: innings1.player1, computer: innings1.player2 },
        innings2: { player: innings2.player1, computer: innings2.player2 }
      };

      newStats.computerVsPlayerStats.games.push(gameRecord);
      newStats.computerVsPlayerStats.totalRuns += player1Total;
      newStats.computerVsPlayerStats.totalComputerRuns += player2Total;

      if (winner === player1Name) {
        newStats.computerVsPlayerStats.wins += 1;
      } else if (winner === 'Tie') {
        newStats.computerVsPlayerStats.ties += 1;
      } else {
        newStats.computerVsPlayerStats.losses += 1;
      }
    } else {
      const gameRecord = {
        date: new Date().toLocaleDateString(),
        player1Name: player1Name,
        player1Score: player1Total,
        player2Name: player2Name,
        player2Score: player2Total,
        winner: winner,
        innings1: { player1: innings1.player1, player2: innings1.player2 },
        innings2: { player1: innings2.player1, player2: innings2.player2 }
      };

      newStats.playerVsPlayerStats.games.push(gameRecord);
    }

    newStats.totalGames += 1;
    setStats(newStats);
    localStorage.setItem('handCricketStats', JSON.stringify(newStats));
  };

  const resetStats = () => {
    const emptyStats = {
      totalGames: 0,
      computerVsPlayerStats: {
        wins: 0,
        losses: 0,
        ties: 0,
        totalRuns: 0,
        totalComputerRuns: 0,
        games: []
      },
      playerVsPlayerStats: {
        totalGames: 0,
        games: []
      }
    };
    setStats(emptyStats);
    localStorage.setItem('handCricketStats', JSON.stringify(emptyStats));
  };

  return { stats, recordGameResult, resetStats };
};

export default useStats;

import { useState } from 'react';

const useGameLogic = () => {
  // Innings 1 & 2 scores
  const [innings1, setInnings1] = useState({ player1: 0, player2: 0 });
  const [innings2, setInnings2] = useState({ player1: 0, player2: 0 });
  
  // Game state management
  const [currentInnings, setCurrentInnings] = useState(1);
  const [gamePhase, setGamePhase] = useState('gameMode'); // gameMode, playerNames, toss, playing, result, stats
  const [alertMessage, setAlertMessage] = useState(null);
  
  // Game mode and players
  const [gameMode, setGameMode] = useState(null); // 'computer' or 'multiplayer'
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [batsFirst, setBatsFirst] = useState(null);
  
  // Current game state
  const [currentBatter, setCurrentBatter] = useState(null);
  const [currentBowler, setCurrentBowler] = useState(null);

  // Set game mode and move to player names screen
  const setGameModeAndContinue = (mode) => {
    setGameMode(mode);
    setGamePhase('playerNames');
  };

  // Set player names and move to toss
  const setPlayerNamesAndContinue = (name1, name2) => {
    setPlayer1Name(name1);
    setPlayer2Name(name2);
    setGamePhase('toss');
  };

  // Start game after toss decision
  const startGame = (firstPlayer) => {
    setBatsFirst(firstPlayer);
    setCurrentBatter(firstPlayer);
    setCurrentBowler(firstPlayer === 'player1' ? 'player2' : 'player1');
    setCurrentInnings(1);
    setGamePhase('playing');
  };

  // Handle each turn of the game
  const handleTurn = (batterNumber) => {
    let bowlerNumber;
    
    // For computer mode, simple random (can be enhanced with difficulty)
    if (gameMode === 'computer') {
      bowlerNumber = Math.floor(Math.random() * 6) + 1;
    } else {
      // For multiplayer, also random (represents the other player's hidden choice)
      bowlerNumber = Math.floor(Math.random() * 6) + 1;
    }

    // Check if bowler matched batter (OUT!)
    if (batterNumber === bowlerNumber) {
      endInnings();
      return null;
    }

    // Add runs to current batter
    if (currentInnings === 1) {
      if (currentBatter === 'player1') {
        setInnings1((prev) => ({ ...prev, player1: prev.player1 + batterNumber }));
      } else {
        setInnings1((prev) => ({ ...prev, player2: prev.player2 + batterNumber }));
      }
    } else {
      if (currentBatter === 'player1') {
        setInnings2((prev) => ({ ...prev, player1: prev.player1 + batterNumber }));
      } else {
        setInnings2((prev) => ({ ...prev, player2: prev.player2 + batterNumber }));
      }
    }

    return bowlerNumber;
  };

  // End current innings and move to next
  const endInnings = () => {
    if (currentInnings === 1) {
      // After Innings 1, swap roles for Innings 2
      setCurrentInnings(2);
      setCurrentBatter(currentBowler);
      setCurrentBowler(currentBatter);
      setAlertMessage('OUT! Innings 1 complete. Now batting: ' + (currentBowler === 'player1' ? player1Name : player2Name));
    } else {
      // After Innings 2, game is over
      setGamePhase('result');
    }
  };

  // Calculate final winner
  const getWinner = () => {
    const player1Total = innings1.player1 + innings2.player1;
    const player2Total = innings1.player2 + innings2.player2;

    if (player1Total > player2Total) {
      return { winner: player1Name, message: `🏆 ${player1Name} Wins! 🎉` };
    } else if (player2Total > player1Total) {
      return { winner: player2Name, message: `🏆 ${player2Name} Wins! 🎉` };
    } else {
      return { winner: 'Tie', message: '🤝 It\'s a Tie! 🤝' };
    }
  };

  // Move to stats screen
  const goToStats = () => {
    setGamePhase('stats');
  };

  const resetGame = () => {
    setInnings1({ player1: 0, player2: 0 });
    setInnings2({ player1: 0, player2: 0 });
    setCurrentInnings(1);
    setGamePhase('toss');
    setAlertMessage(null);
    setBatsFirst(null);
    setCurrentBatter(null);
    setCurrentBowler(null);
  };

  const goHome = () => {
    setInnings1({ player1: 0, player2: 0 });
    setInnings2({ player1: 0, player2: 0 });
    setCurrentInnings(1);
    setGamePhase('gameMode');
    setAlertMessage(null);
    setBatsFirst(null);
    setCurrentBatter(null);
    setCurrentBowler(null);
    setGameMode(null);
    setPlayer1Name('');
    setPlayer2Name('');
  };

  return {
    // Current state
    innings1,
    innings2,
    currentInnings,
    gamePhase,
    currentBatter,
    currentBowler,
    batsFirst,
    gameMode,
    player1Name,
    player2Name,
    alertMessage,
    
    // Functions
    handleTurn,
    startGame,
    endInnings,
    getWinner,
    resetGame,
    goToStats,
    goHome,
    setAlertMessage,
    setGameModeAndContinue,
    setPlayerNamesAndContinue,
  };
};

export default useGameLogic;

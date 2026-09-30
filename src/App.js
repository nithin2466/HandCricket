import React, { useState } from 'react';
import Header from './Components/Header';
import NumberInputButtons from './Components/NumberInputButtons';
import GameModeScreen from './Components/GameModeScreen';
import PlayerNamesScreen from './Components/PlayerNamesScreen';
import TossScreen from './Components/TossScreen';
import ResultScreen from './Components/ResultScreen';
import StatsScreen from './Components/StatsScreen';
import ScoreBoard from './Components/ScoreBoard';
import CustomAlert from './Components/CustomAlert';
import './App.css';
import useGameLogic from './hooks/useGameLogic';
import useStats from './hooks/useStats';

const App = () => {
  const gameLogic = useGameLogic();
  const { stats, recordGameResult } = useStats();
  const [userRuns, setUserRuns] = useState([]);
  const [systemRuns, setSystemRuns] = useState([]);

  // Handle game mode selection
  const handleGameModeSelect = (mode) => {
    gameLogic.setGameModeAndContinue(mode);
  };

  // Handle player names submission
  const handlePlayerNames = (name1, name2) => {
    gameLogic.setPlayerNamesAndContinue(name1, name2);
  };

  // Handle toss decision
  const handleTossDecision = (player) => {
    gameLogic.startGame(player);
  };

  // Handle number selection
  const handleNumberSelect = (number) => {
    const systemNumber = gameLogic.handleTurn(number);

    if (systemNumber === null) {
      setUserRuns([]);
      setSystemRuns([]);
    } else {
      setUserRuns([number]);
      setSystemRuns([systemNumber]);
    }
  };

  // Handle result - go to stats
  const handleGameEnd = () => {
    recordGameResult(
      gameLogic.gameMode,
      gameLogic.player1Name,
      gameLogic.player2Name,
      gameLogic.innings1,
      gameLogic.innings2
    );
    gameLogic.goToStats();
  };

  // Handle alert close
  const handleAlertClose = () => {
    gameLogic.setAlertMessage(null);
  };

  // Handle play again
  const handlePlayAgain = () => {
    gameLogic.resetGame();
  };

  // Handle go home
  const handleGoHome = () => {
    gameLogic.goHome();
  };

  // Calculate target for Innings 2
  const getTarget = () => {
    if (gameLogic.currentInnings === 2) {
      const inningsScores = gameLogic.batsFirst === 'player1'
        ? gameLogic.innings1.player1
        : gameLogic.innings1.player2;
      return inningsScores;
    }
    return null;
  };

  // GAME FLOW:
  // 1. Game Mode Selection
  // 2. Player Names
  // 3. Toss
  // 4. Playing
  // 5. Result
  // 6. Stats

  if (gameLogic.gamePhase === 'gameMode') {
    return (
      <div className="App">
        <Header />
        <GameModeScreen onModeSelect={handleGameModeSelect} />
      </div>
    );
  }

  if (gameLogic.gamePhase === 'playerNames') {
    return (
      <div className="App">
        <Header />
        <PlayerNamesScreen 
          gameMode={gameLogic.gameMode}
          onNamesSubmit={handlePlayerNames}
        />
      </div>
    );
  }

  if (gameLogic.gamePhase === 'toss') {
    return (
      <div className="App">
        <Header />
        <TossScreen onTossDecision={handleTossDecision} />
      </div>
    );
  }

  if (gameLogic.gamePhase === 'result') {
    return (
      <div className="App">
        <Header currentInnings={gameLogic.currentInnings} />
        <ResultScreen
          innings1={gameLogic.innings1}
          innings2={gameLogic.innings2}
          player1Name={gameLogic.player1Name}
          player2Name={gameLogic.player2Name}
          getWinner={gameLogic.getWinner}
          onContinue={handleGameEnd}
        />
      </div>
    );
  }

  if (gameLogic.gamePhase === 'stats') {
    return (
      <div className="App">
        <Header />
        <StatsScreen
          stats={stats}
          onPlayAgain={handlePlayAgain}
          onHome={handleGoHome}
        />
      </div>
    );
  }

  // Playing phase
  return (
    <div className="App">
      <Header
        currentInnings={gameLogic.currentInnings}
        currentBatter={gameLogic.currentBatter}
        currentBowler={gameLogic.currentBowler}
        player1Name={gameLogic.player1Name}
        player2Name={gameLogic.player2Name}
        target={getTarget()}
      />
      <NumberInputButtons onNumberSelect={handleNumberSelect} />
      <div className="runs-display">
        <div className="user-runs">
          {userRuns.map((run, index) => (
            <img key={index} src={`/images/${run}.jpg`} alt={`Run ${run}`} />
          ))}
        </div>
        <div className="system-runs">
          {systemRuns.map((run, index) => (
            <img key={index} src={`/images/${run}.jpg`} alt={`Run ${run}`} />
          ))}
        </div>
      </div>
      <ScoreBoard
        innings1={gameLogic.innings1}
        innings2={gameLogic.innings2}
        currentInnings={gameLogic.currentInnings}
        currentBatter={gameLogic.currentBatter}
      />
      {gameLogic.alertMessage && (
        <CustomAlert
          message={gameLogic.alertMessage}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
};

export default App;

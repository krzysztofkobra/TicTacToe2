const TicTacToe2 = () => {
  const { useState, useEffect } = React;

  // Game state
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [moveHistory, setMoveHistory] = useState({ X: [], O: [] });
  const [winner, setWinner] = useState(null);

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  // Initialize audio on first user interaction
  useEffect(() => {
    const initAudio = () => {
      AudioManager.init();
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
    return () => document.removeEventListener('click', initAudio);
  }, []);

  // Handle background music
  useEffect(() => {
    if (musicEnabled && gameMode) {
      AudioManager.backgroundMusic.start();
    } else {
      AudioManager.backgroundMusic.stop();
    }

    return () => {
      AudioManager.backgroundMusic.stop();
    };
  }, [musicEnabled, gameMode]);

  // Game logic functions
  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const willRemovePiece = moveHistory[currentPlayer].length >= 3;

    if (soundEnabled) {
      AudioManager.playMove();
      if (willRemovePiece) {
        setTimeout(() => AudioManager.playRemove(), 100);
      }
    }

    const result = GameLogic.processMove(board, moveHistory, currentPlayer, index);
    if (!result) return;

    setBoard(result.board);
    setMoveHistory(result.moveHistory);

    if (result.winner) {
      setWinner(result.winner);
      if (soundEnabled) {
        setTimeout(() => AudioManager.playWin(), 200);
      }
    } else {
      setCurrentPlayer(result.nextPlayer);
    }
  };

  const resetGame = () => {
    const initialState = GameLogic.getInitialGameState();
    setBoard(initialState.board);
    setCurrentPlayer(initialState.currentPlayer);
    setMoveHistory(initialState.moveHistory);
    setWinner(initialState.winner);
  };

  const goToMenu = () => {
    setGameMode(null);
    resetGame();
  };

  const positionToRemove = GameLogic.getPositionToRemove(moveHistory, currentPlayer);

  // Combined GameBoard + GameStats component
  const GameBoardWithStats = ({
    board,
    onCellClick,
    positionToRemove,
    currentPlayer,
    winner,
    moveHistory,
    onReset,
    onBackToMenu,
    soundEnabled,
  }) => {
    const handleReset = () => {
      if (soundEnabled) AudioManager.playMenuSelect();
      onReset();
    };

    const handleBackToMenu = () => {
      if (soundEnabled) AudioManager.playMenuSelect();
      onBackToMenu();
    };

    const handleHover = () => {
      if (soundEnabled) AudioManager.playHover();
    };

    const handleCellClickInternal = (index) => {
      onCellClick(index);
    };

    const handleCellHover = (cell) => {
      if (!cell && soundEnabled) {
        AudioManager.playHover();
      }
    };

    return (
      <>
        {/* Current player and winner status above the board */}
        <div className="text-center mb-6">
          {winner ? (
            <div className="bg-yellow-400 text-black p-4 mb-4 border-2 border-yellow-600">
              <div className="text-lg font-black winner-bounce">
                PLAYER {winner} WINS!
              </div>
              <div className="text-xs mt-1">GAME OVER</div>
            </div>
          ) : (
            <div className="bg-gray-800 border-2 border-gray-600 p-3">
              <div className="text-sm text-white">
                TURN:{' '}
                <span
                  className={`font-black text-lg ${
                    currentPlayer === 'X' ? 'player-x' : 'player-o'
                  }`}
                >
                  {currentPlayer}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-6 w-72 mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClickInternal(index)}
              onMouseEnter={() => handleCellHover(cell)}
              className="game-cell w-20 h-20 text-2xl font-black flex items-center justify-center"
            >
              <span
                className={`
                  ${cell === 'X' ? 'player-x' : cell === 'O' ? 'player-o' : ''}
                  ${positionToRemove === index ? 'blink-remove' : ''}
                `}
              >
                {cell}
              </span>
            </button>
          ))}
        </div>

        {/* Player Scores */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="score-display p-3 text-center">
            <div className="text-xs font-bold">PLAYER X</div>
            <div className="text-lg font-black">{moveHistory.X.length}/3</div>
          </div>
          <div className="score-display p-3 text-center">
            <div className="text-xs font-bold">PLAYER O</div>
            <div className="text-lg font-black">{moveHistory.O.length}/3</div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 justify-center mb-4">
          <button
            onClick={handleReset}
            onMouseEnter={handleHover}
            className="pixel-button pixel-button-red font-bold py-2 px-4 text-xs text-white"
          >
            RESET
          </button>
          <button
            onClick={handleBackToMenu}
            onMouseEnter={handleHover}
            className="pixel-button pixel-button-purple font-bold py-2 px-4 text-xs"
          >
            MENU
          </button>
        </div>

        {/* Game Rules */}
        <div className="bg-gray-900 border-2 border-gray-700 p-3 text-center">
          <div className="text-xs text-gray-300 space-y-1">
            <p>MAX 3 PIECES PER PLAYER</p>
            <p>4TH MOVE = 1ST PIECE GONE</p>
          </div>
        </div>
      </>
    );
  };

  if (!gameMode) {
    return (
      <MainMenu
        onModeSelect={setGameMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ParticleSystem />
      <div className="pixel-container rounded-none p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-xl font-black text-white mb-1">TIC TAC TOE 2</h1>
          <h2 className="text-sm text-yellow-400">PIXEL EDITION</h2>
        </div>

        <GameBoardWithStats
          board={board}
          onCellClick={handleCellClick}
          positionToRemove={positionToRemove}
          currentPlayer={currentPlayer}
          winner={winner}
          moveHistory={moveHistory}
          onReset={resetGame}
          onBackToMenu={goToMenu}
          soundEnabled={soundEnabled}
        />
      </div>
    </div>
  );
};

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToe2 />);
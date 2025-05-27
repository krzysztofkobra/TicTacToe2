const GameInterface = ({
  board,
  currentPlayer,
  winner,
  moveHistory,
  onCellClick,
  onReset,
  onBackToMenu,
  soundEnabled,
  positionToRemove,
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

  const handleCellClick = (index) => {
    onCellClick(index);
  };

  const handleCellHover = (cell) => {
    if (!cell && soundEnabled) {
      AudioManager.playHover();
    }
  };

  return (
    <>
      {/* Game Status (currentPlayer + winner) */}
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
            onClick={() => handleCellClick(index)}
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

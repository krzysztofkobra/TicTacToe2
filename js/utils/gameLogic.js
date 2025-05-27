// Game Logic Utilities
const GameLogic = {
  // Check if there's a winner on the board
  checkWinner(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  },

  // Get the position that should be removed for a player
  getPositionToRemove(moveHistory, player) {
    if (moveHistory[player].length >= 3) {
      return moveHistory[player][0];
    }
    return null;
  },

  // Check if a move is valid
  isValidMove(board, index, winner) {
    return !board[index] && !winner;
  },

  // Process a move and return new game state
  processMove(board, moveHistory, currentPlayer, index) {
    if (!this.isValidMove(board, index, null)) {
      return null;
    }

    const newBoard = [...board];
    const newMoveHistory = { ...moveHistory };
    
    // Place the new piece
    newBoard[index] = currentPlayer;
    newMoveHistory[currentPlayer].push(index);
    
    // Remove oldest piece if player has more than 3 pieces
    if (newMoveHistory[currentPlayer].length > 3) {
      const oldestMove = newMoveHistory[currentPlayer].shift();
      newBoard[oldestMove] = null;
    }
    
    return {
      board: newBoard,
      moveHistory: newMoveHistory,
      winner: this.checkWinner(newBoard),
      nextPlayer: currentPlayer === 'X' ? 'O' : 'X'
    };
  },

  // Initialize empty game state
  getInitialGameState() {
    return {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      moveHistory: { X: [], O: [] },
      winner: null
    };
  }
};
const GameLogic = {
  checkWinner(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  },

  getPositionToRemove(moveHistory, player) {
    if (moveHistory[player].length >= 3) {
      return moveHistory[player][0];
    }
    return null;
  },

  isValidMove(board, index, winner) {
    return !board[index] && !winner;
  },

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
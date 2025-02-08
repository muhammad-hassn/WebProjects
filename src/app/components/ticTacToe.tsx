'use client';

import { useState } from 'react';

type Square = 'X' | 'O' | null;
type Winner = Square | 'Draw';

const WINNING_LINES = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

const TicTacToe = () => {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Square>('X');
  const [winner, setWinner] = useState<Winner>(null);

  const checkWinner = (squares: Square[]): Winner => {
    for (const [a, b, c] of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Draw';
  };

  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);

    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const getStatus = () => {
    if (winner) {
      return winner === 'Draw' ? 'Game Draw!' : `Winner: ${winner}`;
    }
    return `Current Player: ${currentPlayer}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold text-gray-800">{getStatus()}</div>
      
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-lg shadow-lg">
        {squares.map((square, index) => (
          <button
            key={index}
            className="w-20 h-20 flex items-center justify-center text-3xl font-bold 
                     bg-blue-100 hover:bg-blue-200 rounded-md transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleClick(index)}
            disabled={!!winner || !!square}
            aria-label={`Cell ${index + 1} ${square ? `occupied by ${square}` : 'empty'}`}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                 transition-colors font-semibold shadow-md"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
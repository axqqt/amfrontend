/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import './MiniGame2.css';

const generateBoard = () => {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  return Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => colors[Math.floor(Math.random() * colors.length)])
  );
};

const MiniGame2 = () => {
  const [board, setBoard] = useState(generateBoard());
  const [score, setScore] = useState(0);
  const [firstCell, setFirstCell] = useState(null);
  const [secondCell, setSecondCell] = useState(null);

  const checkMatches = (board) => {
    let newBoard = board.map(row => [...row]);
    let matches = [];

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (col < 3 && newBoard[row][col] === newBoard[row][col + 1] && newBoard[row][col] === newBoard[row][col + 2]) {
          matches.push({ row, col });
        }
        if (row < 3 && newBoard[row][col] === newBoard[row + 1][col] && newBoard[row][col] === newBoard[row + 2][col]) {
          matches.push({ row, col });
        }
      }
    }

    matches.forEach(({ row, col }) => {
      if (col < 3) {
        newBoard[row][col] = newBoard[row][col + 1] = newBoard[row][col + 2] = null;
      }
      if (row < 3) {
        newBoard[row][col] = newBoard[row + 1][col] = newBoard[row + 2][col] = null;
      }
    });

    setScore(score + matches.length * 10);

    return newBoard;
  };

  const refillBoard = (board) => {
    let newBoard = board.map(row => row.map(cell => cell || ['red', 'green', 'blue', 'yellow', 'purple'][Math.floor(Math.random() * 5)]));
    return newBoard;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let newBoard = checkMatches(board);
      if (newBoard.flat().includes(null)) {
        newBoard = refillBoard(newBoard);
        setBoard(newBoard);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [board]);

  const handleClick = (row, col) => {
    if (!firstCell) {
      setFirstCell({ row, col });
    } else {
      setSecondCell({ row, col });

      // Only allow swapping adjacent cells
      if (
        (Math.abs(firstCell.row - row) === 1 && firstCell.col === col) ||
        (Math.abs(firstCell.col - col) === 1 && firstCell.row === row)
      ) {
        const newBoard = board.map(row => [...row]);
        const temp = newBoard[firstCell.row][firstCell.col];
        newBoard[firstCell.row][firstCell.col] = newBoard[row][col];
        newBoard[row][col] = temp;

        setBoard(newBoard);
        setFirstCell(null);
        setSecondCell(null);
      } else {
        // If the cells are not adjacent, reset the selection
        setFirstCell(null);
        setSecondCell(null);
      }
    }
  };

  return (
    <div>
      <h1>Candy Crush-like Game</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: cell }}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default MiniGame2;

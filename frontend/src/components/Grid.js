import React, { useState, useEffect } from 'react';
import Square from './Square';

const Grid = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5217/api/squares')
      .then((response) => response.json())
      .then((data) => setSquares(data))
      .catch((error) => console.error('Error loading squares:', error));
  }, []);

  const getRandomColor = (lastColor) => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    let newColor;
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === lastColor);
    return newColor;
  };

  const saveSquares = async (squares) => {
    try {
      const response = await fetch('http://localhost:5217/api/squares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(squares),
      });

      if (!response.ok) {
        throw new Error('Failed to save squares');
      }

      console.log('Squares saved successfully');
    } catch (error) {
      console.error('Error saving squares:', error);
    }
  };

  const addSquare = () => {
    console.log("Knappen är tryckt");
    const lastSquare = squares[squares.length - 1];
    const newSquare = {
      id: squares.length,
      color: getRandomColor(lastSquare ? lastSquare.color : null),
    };

    const updatedSquares = [...squares, newSquare];
    setSquares(updatedSquares);
    saveSquares(updatedSquares);
  };

  // Beräkna storleken på grid (så att den är kvadratisk)
  const getGridColumns = () => {
    const gridSize = Math.ceil(Math.sqrt(squares.length));
    return gridSize;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${getGridColumns()}, minmax(0, 1fr))`,
          width: `${getGridColumns() * 50}px`,
        }}
      >
        {squares.map((square) => (
          <Square key={square.id} color={square.color} />
        ))}
      </div>
      <button onClick={addSquare} className="bg-purple-500 text-white px-4 py-2 mt-4">
        Lägg till ruta
      </button>
    </div>
  );
};

export default Grid;
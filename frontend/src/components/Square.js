import React from 'react';

const Square = ({ color }) => {
  return (
    <div
      className="w-12 h-12 border-2 border-black"
      style={{ backgroundColor: color }}
    >
    </div>
  );
};

export default Square;
import React from 'react';

const NumberInputButtons = ({ onNumberSelect, disabled = false }) => {
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <div className="number-buttons-container">
      <p className="number-prompt">Select a number (1-6):</p>
      <div className="number-buttons">
        {numbers.map((num) => (
          <button
            key={num}
            className={`number-btn num-${num}`}
            onClick={() => onNumberSelect(num)}
            disabled={disabled}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberInputButtons;

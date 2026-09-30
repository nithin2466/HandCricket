import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={userInput}
        onChange={handleChange}
        min="1"
        max="6"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;

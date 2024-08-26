import './style.css'
import React, { useState, useEffect } from 'react';

function Stack() {
  const initialStack = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const [stackValues, setStackValues] = useState(initialStack);
  const [stackPointer, setStackPointer] = useState(initialStack.length);

  function push(number) {
    if (stackPointer > 0) {
      const newStack = [...stackValues];
      newStack[stackPointer - 1] = number;
      setStackValues(newStack);
      
      setStackPointer(prevPointer => prevPointer - 1);
    }
  }

  function pop() {
    if (stackPointer < stackValues.length) {
      setStackPointer(prevPointer => prevPointer + 1);
    }
  }


  return (
    <div className='stackDiv'>
      <h2>Stack</h2>
      {stackValues.map((value, index) => (
        <div
          key={index}
          className={`stack-row ${index === stackPointer ? 'active' : ''} ${index > stackPointer ? 'underActive' : ''}`}
        >
          <span className="stack-number">{stackValues.length - index}.</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
      <p>{stackPointer}</p>
      <button onClick={() => push(123)}>push</button><button onClick={pop}>pop</button>
    </div>
  );
}

export default Stack;

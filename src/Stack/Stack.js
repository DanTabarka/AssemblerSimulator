import './stack.css'
import React, { useState, useEffect } from 'react';

function Stack({ stackPointer, stackValues }) {

  const reversedStackValues = [...stackValues].reverse();

  return (
    <div className='stackDiv'>
      <h2>Stack</h2>
      {reversedStackValues.map((value, index) => (
        <div
          key={index}
          className={`stack-row ${stackValues.length - index === stackPointer ? 'active' : ''} 
                                ${stackValues.length - index < stackPointer ? 'underActive' : ''}`}
        >
          <span className="stack-number">{stackValues.length - index}.</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
      <p>{stackPointer}</p>
    </div>
  );
}

export default Stack;

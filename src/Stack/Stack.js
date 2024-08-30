import './stack.css'
import React, { useState, useEffect } from 'react';

function Stack({ stackPointer, stackValues }) {

  return (
    <div className='stackDiv'>
      <h2>Stack</h2>
      {stackValues.reverse().map((value, index) => (
        <div
          key={index}
          className={`stack-row ${index === stackPointer ? 'active' : ''} ${index > stackPointer ? 'underActive' : ''}`}
        >
          <span className="stack-number">{stackValues.length - index}.</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
      {/* <p>{stackPointer}</p> */}
      {/* <button onClick={() => push(123)}>push</button><button onClick={pop}>pop</button> */}
    </div>
  );
}

export default Stack;

import './style.css';
import React, { useState, useRef, useEffect } from 'react';

function Buttons() {

  // const handleStepClick = () => {
  //   setCurrentLine(prevLine => prevLine + 1);
  // };
  

  return (
    <div className='buttonsLine'>
      <div className="button-group left">
        <button className='run' onClick={() => alert('Run code clicked!')}>▶️ Run</button>
        <button className='step' onClick={() => alert('Run code clicked!')}>⏩ Step</button>
        <button className='reset' onClick={() => alert('Run code clicked!')}>🔄 Reset</button>
      </div>
      <div className="button-group right">
        <button className='info'>🔍 popis simulátoru</button>
        <button className='info'>📝 instrukce procesoru</button>
      </div>
    </div>
    
  );
}

export default Buttons;

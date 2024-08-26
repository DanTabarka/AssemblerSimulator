import './style.css';
import React, { useState, useRef, useEffect } from 'react';

function Buttons() {
  

  return (
    <p className='buttonsLine'>
      <div className="button-group left">
        <button className='run' onClick={() => alert('Run code clicked!')}>▶️ Run</button>
        <button className='step' onClick={() => alert('Run code clicked!')}>⏩ Step</button>
      </div>
      <div className="button-group right">
        <button className='info'>🔍 popis simulátoru</button>
        <button className='info'>📝 instrukce procesoru</button>
      </div>
    </p>
    
  );
}

export default Buttons;

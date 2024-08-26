import './style.css';
import React, { useState, useRef, useEffect } from 'react';

function Buttons() {
  

  return (
    <p className='buttons'>
        <button className='run' onClick={() => alert('Run code clicked!')}>Run</button>
        <button className='step' onClick={() => alert('Run code clicked!')}>Step</button>
    </p>
    
  );
}

export default Buttons;

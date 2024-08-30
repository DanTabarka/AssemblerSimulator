import './buttons.css';
import { useState } from 'react';

function Buttons({ onRun, onStep, onReset}) {
  const [catchMe, setCatchMe] = useState(false);

  return (
    <div className='buttonsLine'>
      <div className="button-group left">
        <button className='run' onClick={onRun}>▶️ Run</button>
        <button className='step' onClick={onStep}>⏩ Step</button>
        <button className='reset' onClick={onReset}>🔄 Reset</button>
        <button
        style={{
          marginLeft: catchMe ? "150px" : "10px",
        }}
        className='catchMe'
        onMouseEnter={() => setCatchMe(!catchMe)}
      >
        Catch me!!
      </button>
      </div>
      <div className="button-group right">
        <button className='info'>🔍 popis simulátoru</button>
        <button className='info'>📝 instrukce procesoru</button>
      </div>
    </div>
    
  );
}

export default Buttons;

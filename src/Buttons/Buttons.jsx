import './buttons.css';
import { useState } from 'react';
import { Link } from "react-router-dom";


function Buttons({ run, onRun, onStop, onStep, onReset}) {
  const [catchMe, setCatchMe] = useState(false);

  return (
    <div className='buttonsLine'>
      <div className="button-group left">
        {run ? (
          <button className='stop' onClick={onStop}>⏹️ Stop</button>
        ) : (
          <button className='run' onClick={onRun}>▶️ Run</button>
        )}
        <button className='step' onClick={onStep}>⏩ Step</button>
        <button className='reset' onClick={onReset}>🔄 Reset</button>
        <button
        style={{
          marginLeft: catchMe ? "150px" : "10px",
        }}
        onClick={() => alert("How???😮")}
        className='catchMe'
        onMouseEnter={() => setCatchMe(!catchMe)}
      >
        Catch me!!
      </button>
      </div>
      <div className="button-group right">
        <button className='info' 
                onClick={() => document.getElementById('introduction').scrollIntoView({ behavior: 'smooth' })}
        >
                🔍 popis simulátoru
        </button>
        <button className='info'
                onClick={() => document.getElementById('instructions').scrollIntoView({ behavior: 'smooth' })}
        >
                📝 instrukce procesoru
        </button>
        <button className='info'
                onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })}
        >
                ⚙ programy
        </button>

      </div>
    </div>
    
  );
}

export default Buttons;

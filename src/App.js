import './App.css';
import React, {useState, createContext} from 'react';
import Code from './Code/Code.js'
import Registers from './Registers/Registers.js'
import Stack from './Stack/Stack.js'
import Buttons from './Buttons/Buttons.js'



function App() {

  const [intervalId, setIntervalId] = useState(null);
  const [code, setCode] = useState("");
  const initialRegisters = [0, 0, 0, 0];
  const [registers, setRegisters] = useState(initialRegisters);
  const initialFlags = [false, false, false];
  const [flags, setFlags] = useState(initialFlags);
  const [programCounter, setProgramCounter] = useState(0);
  const [stackPointer, setStackPointer] = useState(0);

  const handleRunClick = () => {
    if (intervalId) return; // Prevent multiple intervals

    const id = setInterval(() => {
      handleStepClick();
    }, 1000);
    setIntervalId(id);
  };

  const handleStepClick = () => {
    const lines = code.split("\n");
    if (programCounter >= lines.length) {
      return;
    }
    lines[programCounter].trim();

    //step
    setProgramCounter(prevLine => prevLine + 1);
  };

  const handleResetClick = () => {
    setProgramCounter(0);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div className="App">
      <Buttons 
        onRun={handleRunClick}
        onStep={handleStepClick} 
        onReset={handleResetClick} 
      />
      <div className="flex">
        <Code programCounter={programCounter} code={code} setCode={setCode} />
        <Registers  registers={registers}
                    programCounter={programCounter}
                    stackPointer={stackPointer}
                    flags={flags}
        />
        <Stack />
      </div>
    </div>
  );
}

export default App;

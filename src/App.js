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
  const initialStack = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const [stackValues, setStackValues] = useState(initialStack);


  const registerMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3
  };

  const flagMap = {
    "sign": 0,
    "zero": 1,
    "carry": 2
  }

  const instructionSet = {
    nop : (args) =>{
      return;
    },
    add: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register] += parseInt(args[1]);
    },
    sub: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register] -= parseInt(args[1]);
    },
    mul: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register] *= parseInt(args[1]);
    },
    div: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register] /= parseInt(args[1]);
    },
    inc: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register]++;
    },
    dec: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register]--;
    },
    loop: (args) => {
      setProgramCounter(parseInt(args[0]) - 1);
    },
    movr: (args) => {
      const register = registerMap[args[0].toUpperCase()];

      registers[register] = parseInt(args[1]);
    },
    push: (args) => {
    },
    pop: (args) => {
    },
    swap: (args) => {
      const register1 = registerMap[args[0].toUpperCase()];
      const register2 = registerMap[args[1].toUpperCase()];

      const tmp = registers[register1];
      registers[register1] = registers[register2];
      registers[register2] = tmp;
    },
    get: (args) => {
    },
    put: (args) => {
    },
    cmp: (args) => {
      const register1 = registerMap[args[0].toUpperCase()];
      const register2 = registerMap[args[1].toUpperCase()];

      const value = registers[register1] - registers[register2];

      if (value > 0) {
        flags[flagMap["sign"]] = true;
        flags[flagMap["zero"]] = false;
      } else if (value < 0) {
        flags[flagMap["sign"]] = false;
        flags[flagMap["zero"]] = false;
      } else {
        flags[flagMap["sign"]] = true;
        flags[flagMap["zero"]] = true;
      }
    }
  };

  const run = () => {
    if (intervalId) return; // Prevent multiple intervals

    const id = setInterval(() => {
      step();
    }, 1000);
    setIntervalId(id);
  };

  const step = () => {
    const lines = code.split("\n");
    
    if (programCounter >= lines.length) {
      return;
    }
    let currentLine = lines[programCounter].trim();

    if (currentLine.length == 0) {
      setProgramCounter(prevLine => prevLine + 1);
      return;  
    }
    const [instruction, ...args] = currentLine.split(' ');
  
    const func = instructionSet[instruction.toLowerCase()];
    
    if (func) {
      func(args);
    } else {
      console.error(`Unknown instruction: ${instruction}`);
    }

    setProgramCounter(prevLine => prevLine + 1);
  };

  const reset = () => {
    setProgramCounter(0);
    clearInterval(intervalId);
    setIntervalId(null);
    setRegisters(initialRegisters);
    setFlags(initialFlags);
    setStackPointer(0);
    setStackValues(initialStack);
  };

  return (
    <div className="App">
      <Buttons 
        onRun={run}
        onStep={step} 
        onReset={reset} 
      />
      <div className="flex">
        <Code programCounter={programCounter} code={code} setCode={setCode} />
        <Registers  registers={registers}
                    programCounter={programCounter}
                    stackPointer={stackPointer}
                    flags={flags}
        />
        <Stack stackPointer={stackPointer} stackValues={stackValues}/>
      </div>
    </div>
  );
}

export default App;

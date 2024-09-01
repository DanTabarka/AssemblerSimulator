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
  const [invalidLine, setInvalidLine] = useState(-1);
  const [cpuStatus, setCpuStatus] = useState("ok");


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
      if (args.length != 0) {
        return "InvalidArgumentCount"
      }
      return "ok";
    },
    add: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let adding = 0;
      if (isRegister(args[1])) {
        adding = registers[registerMap[args[1].toUpperCase()]];
      } else {
        adding = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] += adding;
      return "ok";
    },
    sub: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] -= parseInt(args[1]);
      return "ok";
    },
    mul: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] *= parseInt(args[1]);
      return "ok";
    },
    div: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] /= parseInt(args[1]);
      return "ok";
    },
    inc: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register]++;
      return "ok";
    },
    dec: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register]--;
      return "ok";
    },
    loop: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      setProgramCounter(parseInt(args[0]) - 1);
      return "ok";
    },
    movr: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] = parseInt(args[1]);
      return "ok";
    },
    push: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      return "ok";
    },
    pop: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      return "ok";
    },
    swap: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register1 = registerMap[args[0].toUpperCase()];
      const register2 = registerMap[args[1].toUpperCase()];

      const tmp = registers[register1];
      registers[register1] = registers[register2];
      registers[register2] = tmp;
      return "ok";
    },
    get: (args) => {
      return "ok";
    },
    put: (args) => {
      return "ok";
    },
    cmp: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      const register1 = registerMap[args[0].toUpperCase()];
      const register2 = registerMap[args[1].toUpperCase()];

      const value = registers[register1] - registers[register2];

      flags[flagMap["sign"]] = value >= 0;
      flags[flagMap["zero"]] = value == 0;
      return "ok";
    },
    halt: (args) => {
      if (args.length != 0) {
        return "InvalidArgumentCount"
      }
      return "halt";
    }
  };

  function isRegister(input) {
    return registerMap[input.toUpperCase()] != null;
  }

  const run = () => {
    if (intervalId) return; // Prevent multiple intervals

    const id = setInterval(() => {
      step()
      if (cpuStatus !== "ok") {
        setInvalidLine(programCounter);
        clearInterval(id);
        setIntervalId(null);
      }
    }, 1000);
    setIntervalId(id);
  };

  const step = () => {
    if (cpuStatus !== "ok") {
      return;
    }
    const lines = code.split("\n");
    
    if (programCounter >= lines.length) {
      setCpuStatus("halt");
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
      let status = func(args);
      if (status != "ok") {
        setInvalidLine(programCounter);
      }
      setCpuStatus(status);
    } else {
      setCpuStatus("InvalidOperation");
      setInvalidLine(programCounter);
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
    setInvalidLine(-1);
    setCpuStatus("ok");
  };

  return (
    <div className="App">
      <Buttons 
        onRun={run}
        onStep={step} 
        onReset={reset} 
      />
      <div className="flex">
        <Code programCounter={programCounter} code={code} setCode={setCode} invalidLine={invalidLine} />
        <Registers  registers={registers}
                    programCounter={programCounter}
                    stackPointer={stackPointer}
                    flags={flags}
        />
        <Stack stackPointer={stackPointer} stackValues={stackValues}/>
      </div>
      <h1>{cpuStatus}</h1>
    </div>
  );
}

export default App;

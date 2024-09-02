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
      let addition = 0;
      if (isRegister(args[1])) {
        addition = registers[registerMap[args[1].toUpperCase()]];
      } else {
        addition = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] += addition;
      return "ok";
    },
    sub: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let subtraction = 0;
      if (isRegister(args[1])) {
        subtraction = registers[registerMap[args[1].toUpperCase()]];
      } else {
        subtraction = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] -= subtraction;
      return "ok";
    },
    mul: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let multiplication = 0;
      if (isRegister(args[1])) {
        multiplication = registers[registerMap[args[1].toUpperCase()]];
      } else {
        multiplication = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] *= multiplication;
      return "ok";
    },
    div: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let division = 0;
      if (isRegister(args[1])) {
        division = registers[registerMap[args[1].toUpperCase()]];
      } else {
        division = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] /= division;
      return "ok";
    },
    inc: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register]++;
      return "ok";
    },
    dec: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register]--;
      return "ok";
    },
    loop: (args) => {                                   // looping on line before and didnt make instruction
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      setProgramCounter(parseInt(args[0]) - 1);
      return "ok";
    },
    movr: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let num = 0;
      if (isRegister(args[1])) {
        num = registers[registerMap[args[1].toUpperCase()]];
      } else {
        num = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] = num;
      return "ok";
    },
    push: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (stackPointer >= stackValues.length - 1) {
        return "CannotPushOnFullStack"
      }

      let value = 0;
      if (isRegister(args[0])) {
        value = registers[registerMap[args[0].toUpperCase()]];
      } else {
        value = parseInt(args[0]);
      }

      stackValues[stackPointer] = value;

      setStackPointer(prev => prev + 1);
      return "ok";
    },
    pop: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (stackPointer <= 0) {
        return "CannotPopOnEmptyStack"
      }

      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let register = registerMap[args[0].toUpperCase()];
      let stackValue = stackValues[stackPointer - 1];

      registers[register] = stackValue;
      console.log({stackValue});

      setStackPointer(prev => prev - 1);
      return "ok";
    },
    swap: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0]) || !isRegister(args[1])) {
        return "InvalidArgument"
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
      let num1 = 0;
      if (isRegister(args[0])) {
        num1 = registers[registerMap[args[0].toUpperCase()]];
      } else {
        num1 = parseInt(args[0]);
      }

      let num2 = 0;
      if (isRegister(args[1])) {
        num2 = registers[registerMap[args[1].toUpperCase()]];
      } else {
        num2 = parseInt(args[1]);
      }

      const value = num1 - num2;

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
    let [instruction, ...args] = currentLine.split(' ');

    args = args.filter(arg => arg !== ''); // filter empty spaces
    
    const commentIndex = args.indexOf('//'); // filter comments
    if (commentIndex !== -1) {
      args = args.slice(0, commentIndex);
    }

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
        <Code programCounter={programCounter}
              code={code}
              setCode={setCode}
              invalidLine={invalidLine}
              cpuStatus={cpuStatus}
        />
        <Registers  registers={registers}
                    programCounter={programCounter}
                    stackPointer={stackPointer}
                    flags={flags}
        />
        <Stack stackPointer={stackPointer} stackValues={stackValues}/>
      </div>
      <p>{cpuStatus}</p>
      <input></input>
      <p>neco</p>
    </div>
  );
}

export default App;

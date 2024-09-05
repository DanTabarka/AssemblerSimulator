import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Code from './Code/Code.jsx';
import Registers from './Registers/Registers.jsx';
import Stack from './Stack/Stack.jsx';
import Buttons from './Buttons/Buttons.jsx';
import Description from './Info/Description.jsx';
import Instructions from './Info/Instructions.jsx';


function App() {

  const [intervalId, setIntervalId] = useState(null);
  const [code, setCode] = useState("");
  const initialRegisters = [0, 0, 0, 0];
  const [registers, setRegisters] = useState(initialRegisters);
  const initialFlags = [false, false, false];
  const [flags, setFlags] = useState(initialFlags);
  const [programCounter, setProgramCounter] = useState(0);
  const [nextProgramCounter, setNextProgramCounter] = useState(1);
  const [stackPointer, setStackPointer] = useState(0);
  const initialStack = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const [stackValues, setStackValues] = useState(initialStack);
  const [invalidLine, setInvalidLine] = useState(-1);
  const [cpuStatus, setCpuStatus] = useState("ok");
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");


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

      let value = registers[register] + addition;
      storeInRegister(register, value);
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

      let value = registers[register] - subtraction;
      storeInRegister(register, value);
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

      let value = registers[register] * multiplication;
      storeInRegister(register, value);
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

      if (division === 0) {
        return "divideByZero"
      }

      const register = registerMap[args[0].toUpperCase()];

      let value = Math.trunc(registers[register] / division); // becose some issue with extremly small numbers
      storeInRegister(register, value);
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

      let value = registers[register] + 1;
      storeInRegister(register, value);
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

      let value = registers[register] - 1;
      storeInRegister(register, value);
      return "ok";
    },
    loop: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      setNextProgramCounter(parseInt(args[0]) - 1);
      return "ok";
    },
    movr: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let value = 0;
      if (isRegister(args[1])) {
        value = registers[registerMap[args[1].toUpperCase()]];
      } else {
        value = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      storeInRegister(register, value);
      return "ok";
    },
    push: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (stackPointer >= stackValues.length) {
        return "StackOverflow"
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
        return "StackUnderflow"
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
      if (args.length != 0) {
        return "InvalidArgumentCount"
      }
      let char = 0;
      if (userInput.length !== 0) {
        char = userInput.charCodeAt(0);
      }

      if (stackPointer >= stackValues.length) { // push
        return "StackOverflow"
      }
      stackValues[stackPointer] = char;
      setStackPointer(prev => prev + 1);// push

      setUserInput(userInput.substring(1));
      return "ok";
    },
    put: (args) => {
      if (args.length != 0) {
        return "InvalidArgumentCount"
      }
      let char = 0;
      if (userInput.length !== 0) {
        char = userInput.charCodeAt(0);
      }

      if (stackPointer <= 0) {
        return "StackUnderflow"
      }

      let stackValue = stackValues[stackPointer - 1];
      
      if (stackValue >= 32 && stackValue <= 126) { // ASCII printable characters
        stackValue = String.fromCharCode(stackValue);
        setUserOutput(prev => prev + stackValue);
      }

      setStackPointer(prev => prev - 1);

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
    and: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let value = 0;
      if (isRegister(args[1])) {
        value = registers[registerMap[args[1].toUpperCase()]];
      } else {
        value = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] &= value;
      return "ok";
    },
    or: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let value = 0;
      if (isRegister(args[1])) {
        value = registers[registerMap[args[1].toUpperCase()]];
      } else {
        value = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] |= value;
      return "ok";
    },
    xor: (args) => {
      if (args.length != 2) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      let value = 0;
      if (isRegister(args[1])) {
        value = registers[registerMap[args[1].toUpperCase()]];
      } else {
        value = parseInt(args[1]);
      }
      const register = registerMap[args[0].toUpperCase()];

      registers[register] ^= value;
      return "ok";
    },
    not: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      const register = registerMap[args[0].toUpperCase()];
      let value = registers[register];

      registers[register] = ~value & 255; // becose we need to use only 8 bits
      return "ok";
    },
    shl: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      const register = registerMap[args[0].toUpperCase()];

      let value = registers[register] << 1;
      storeInRegister(register, value);
      return "ok";
    },
    shr: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (!isRegister(args[0])) {
        return "InvalidArgument"
      }
      const register = registerMap[args[0].toUpperCase()];

      let value = registers[register] >> 1;
      storeInRegister(register, value);
      return "ok";
    },
    jz: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      let jump = parseInt(args[0]);

      if (flags[flagMap["zero"]]) {
        setNextProgramCounter(jump - 1);
      }
      return "ok";
    },
    jnz: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      let jump = parseInt(args[0]);

      if (!flags[flagMap["zero"]]) {
        setNextProgramCounter(jump - 1);
      }
      return "ok";
    },
    js: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      let jump = parseInt(args[0]);

      if (flags[flagMap["sign"]]) {
        setNextProgramCounter(jump - 1);
      }
      return "ok";
    },
    jns: (args) => {
      if (args.length != 1) {
        return "InvalidArgumentCount"
      }
      if (isRegister(args[0])) {
        return "InvalidArgument"
      }
      let jump = parseInt(args[0]);

      if (!flags[flagMap["sign"]]) {
        setNextProgramCounter(jump - 1);
      }
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

  function storeInRegister(register, value) {
    if (value >= 256 || value < 0) {
      flags[flagMap["carry"]] = true;
      value = ((value % 256) + 256) % 256; // becose JS cannot calculate the modulus of negative number
    } else {
      flags[flagMap["carry"]] = false;
    }
    registers[register] = value;
  }

  const run = () => {
    if (intervalId) return; // Prevent multiple intervals

    const id = setInterval(() => {
      step();
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

    let localPC = nextProgramCounter - 1; // REACT async error
    setProgramCounter(nextProgramCounter);
    
    if (localPC >= lines.length) {
      setCpuStatus("halt");
      return;
    }
    
    let currentLine = lines[localPC].trim();
    console.log({currentLine, localPC, nextProgramCounter}); // logging___________________________
    
    let [instruction, ...args] = currentLine.split(' ');
    
    if (currentLine.length == 0 || instruction.startsWith("//")) {
      setNextProgramCounter(prev => prev + 1);
      return "ok";
    }
    
    args = args.filter(arg => arg !== ''); // filter empty spaces
    
    const commentIndex = args.findIndex(item => item.startsWith('//')); // filter comments
    if (commentIndex !== -1) {
      args = args.slice(0, commentIndex);
    }
    
    const func = instructionSet[instruction.toLowerCase()];
    
    if (func) {
      let status = func(args);
      if (status != "ok") {
        setInvalidLine(localPC);
      }
      setCpuStatus(status);
    } else {
      setCpuStatus("InvalidOperation");
      setInvalidLine(localPC);
    }

    setNextProgramCounter(prev => prev + 1);
  };

  const reset = () => {
    setProgramCounter(0);
    setNextProgramCounter(1);
    clearInterval(intervalId);
    setIntervalId(null);
    setRegisters(initialRegisters);
    setFlags(initialFlags);
    setStackPointer(0);
    setStackValues(initialStack);
    setInvalidLine(-1);
    setCpuStatus("ok");
    setUserInput("");
    setUserOutput("");
  };

  return (
    <Router>
      <div className="App">
        <Buttons 
          onRun={run}
          onStep={step} 
          onReset={reset} 
        />
        <div className="flex">
          <Code programCounter={programCounter}
                nextProgramCounter={nextProgramCounter}
                code={code}
                setCode={setCode}
                invalidLine={invalidLine}
                cpuStatus={cpuStatus}
                userInput={userInput}
                setUserInput={setUserInput}
                userOutput={userOutput}
          />
          <Registers  registers={registers}
                      programCounter={programCounter}
                      stackPointer={stackPointer}
                      flags={flags}
          />
          <Stack stackPointer={stackPointer} stackValues={stackValues}/>
        </div>
      </div>

      {/* <Routes>
        <Route path="/description" element={<Description />}></Route>
        <Route path="/instructions" element={<Instructions />}></Route>
      </Routes> */}
    </Router>
  );
}

export default App;

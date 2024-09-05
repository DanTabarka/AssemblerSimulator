import './code.css';
import React, { useState, useRef, useEffect } from 'react';


function Code({ programCounter, nextProgramCounter, code, setCode, invalidLine, cpuStatus, userInput, setUserInput, userOutput }) {
  const codeInputRef = useRef(null);
  const lineNumbersRef = useRef(null);
  // const highlightRef = useRef(null);

  const updateLineNumbers = () => {
    const lines = code.split('\n');
    let lineNumberText = '';
    for (let i = 1; i <= lines.length; i++) {
      if (i === invalidLine + 1) {
        lineNumberText += `<span class="invalid">${i}</span>\n`;
      } else if (i === programCounter){
        lineNumberText += `<span class="highlight">${i}</span>\n`;
      } else if (i === nextProgramCounter && programCounter + 1 != nextProgramCounter) {
        lineNumberText += `<span class="next">${i}</span>\n`;
      } else {
        lineNumberText += `${i}\n`;
      }
    }
    lineNumbersRef.current.innerHTML = lineNumberText;
  };


  // const updateHighlight = () => {
  //   const lines = code.split('\n');
  //   let lineText = '';
  //   for (let i = 0; i < lines.length; i++) {
  //     if (i === invalidLine + 1) {
  //       lineText += `<span class="invalid">${lines[i]}</span>\n`;
  //     } else if (i === programCounter){
  //       lineText += `<span class="highlight">${lines[i]}</span>\n`;
  //     } else {
  //       lineText += `${lines[i]}\n`;
  //     }
  //   }
  //   if (codeInputRef.current) {
  //     codeInputRef.current.innerHTML = lineText;
  //   }
  // }

  const syncTextarea = () => {
    if (codeInputRef.current && codeInputRef.current) {
      codeInputRef.current.textContent = code;
    }
  };


  const syncScroll = () => {
    if (codeInputRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = codeInputRef.current.scrollTop;
    }
  };

  useEffect(() => {
    updateLineNumbers();
    // updateHighlight();
    syncTextarea();
    const updateHeight = () => {
      if (codeInputRef.current && lineNumbersRef.current) {
        lineNumbersRef.current.style.height = `${codeInputRef.current.clientHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [code, programCounter, invalidLine]);



  return (
    <div className="code">
      <div ref={lineNumbersRef} className="line-numbers"></div>
      <div className="code-and-status">
        <textarea
          ref={codeInputRef}
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={syncScroll}
          placeholder="Write assembler code here..."
        />
        <p className={`cpu-status ${cpuStatus === "ok" ? 'cpu-ok' : 'cpu-nok'}`}>
          CPU_Status: {cpuStatus}
        </p>
        <input  class='input'
                placeholder='input...'
                value={userInput}
                onChange={event => setUserInput(event.target.value)}
        ></input>
        <p class='output'><span className='output-highlight'>Output:</span> {userOutput}</p>
      </div>
    </div>
  );
  
}

export default Code;

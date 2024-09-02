import './code.css';
import React, { useState, useRef, useEffect } from 'react';


function Code({ programCounter, code, setCode, invalidLine, cpuStatus }) {
  const codeInputRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const updateLineNumbers = () => {
    const lines = code.split('\n');
    let lineNumberText = '';
    for (let i = 1; i <= lines.length; i++) {
      if (i === invalidLine + 1) {
        lineNumberText += `<span class="invalid">${i}</span>\n`;
      } else if (i === programCounter){
        lineNumberText += `<span class="highlight">${i}</span>\n`;
      } else {
        lineNumberText += `${i}\n`;
      }
    }
    lineNumbersRef.current.innerHTML = lineNumberText;
  };

  const syncScroll = () => {
    if (codeInputRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = codeInputRef.current.scrollTop;
    }
  };

  useEffect(() => {
    updateLineNumbers();
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
  }, [code, programCounter]);



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
      </div>
    </div>
  );
  
}

export default Code;

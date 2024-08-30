import './code.css';
import React, { useState, useRef, useEffect } from 'react';


function Code({ programCounter, code, setCode }) {
  const codeInputRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const updateLineNumbers = () => {
    const lines = code.split('\n');
    let lineNumberText = '';
    for (let i = 1; i <= lines.length; i++) {
      if (i === programCounter) {
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
  }, [code, programCounter]);

  return (
    <div className="code">
      <div ref={lineNumbersRef} className="line-numbers"></div>
      <textarea
        ref={codeInputRef}
        className="code-input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onScroll={syncScroll}
        placeholder="Write assembler code here..."
      />
    </div>
  );
}

export default Code;

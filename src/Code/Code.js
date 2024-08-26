import './style.css';
import React, { useState, useRef, useEffect } from 'react';

function Code() {
  const [code, setCode] = useState('');
  const codeInputRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);

  const updateLineNumbers = () => {
    const lines = code.split('\n');
    let lineNumberText = '';
    for (let i = 1; i <= lines.length; i++) {
      if (i === currentLine) {
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
  }, [code, currentLine]);

  const handleStepClick = () => {
    setCurrentLine(prevLine => prevLine + 1);
  };

  const handleResetClick = () => {
    setCurrentLine(0);
  };

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
      <button>Run</button>
      <button onClick={handleStepClick}>Step</button>
      <button onClick={handleResetClick}>Reset</button>
      <button>{currentLine}</button>
    </div>
  );
}

export default Code;

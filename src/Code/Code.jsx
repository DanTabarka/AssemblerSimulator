import './code.css';
import React, { useState, useRef, useEffect } from 'react';
import 'codemirror/lib/codemirror.css'; // Základní CSS pro CodeMirror
import 'codemirror/mode/clike/clike'; // Import režimu pro zvýraznění syntaxe C
// import 'codemirror/theme/default.css'; // Import tématu (např. default)
import CodeMirror from 'codemirror';


function Code({ programCounter, nextProgramCounter, code, setCode, invalidLine, cpuStatus, userInput, setUserInput, userOutput }) {
  const codeInputRef = useRef(null);
  // const lineNumbersRef = useRef(null);
  // const highlightRef = useRef(null);

  // const updateLineNumbers = () => {
  //   const lines = code.split('\n');
  //   let lineNumberText = '';
  //   for (let i = 1; i <= lines.length; i++) {
  //     if (i === invalidLine + 1) {
  //       lineNumberText += `<span class="invalid">${i}</span>\n`;
  //     } else if (i === programCounter){
  //       lineNumberText += `<span class="highlight">${i}</span>\n`;
  //     } else if (i === nextProgramCounter && programCounter + 1 != nextProgramCounter) {
  //       lineNumberText += `<span class="next">${i}</span>\n`;
  //     } else {
  //       lineNumberText += `${i}\n`;
  //     }
  //   }
  //   lineNumbersRef.current.innerHTML = lineNumberText;
  // };



  // const syncTextarea = () => {
  //   if (codeInputRef.current && codeInputRef.current) {
  //     codeInputRef.current.textContent = code;
  //   }
  // };


  // const syncScroll = () => {
  //   if (codeInputRef.current && lineNumbersRef.current) {
  //     lineNumbersRef.current.scrollTop = codeInputRef.current.scrollTop;
  //   }
  // };

  useEffect(() => {
    if (codeInputRef.current) {
      const editor = CodeMirror.fromTextArea(codeInputRef.current, {
        lineNumbers: true,
        mode: 'text/x-csrc',
        theme: 'default',
        tabSize: 8, // Velikost tabulátoru
        smartIndent: false, // Zakázat chytré odsazení
      });

      const highlightLine = (lineNumber, className) => {
        editor.addLineClass(lineNumber - 1, 'background', className);
        editor.markText(
          { line: lineNumber - 1, ch: 0 },
          { line: lineNumber - 1, ch: Infinity },
          { className }
        );
      };

      const updateHighlights = () => {
        editor.getAllMarks().forEach(mark => mark.clear()); // Clear existing highlights
        if (programCounter) highlightLine(programCounter, 'highlight');
        if (nextProgramCounter && programCounter + 1 !== nextProgramCounter) highlightLine(nextProgramCounter, 'next');
        if (invalidLine !== -1) highlightLine(invalidLine + 1, 'invalid');
      };

      updateHighlights();

      // Při změně textu v editoru
      editor.on('change', () => {
        updateHighlights();
        setCode(editor.getValue());
      });

      return () => {
        editor.toTextArea();
      };
    }
  }, [programCounter, nextProgramCounter, invalidLine]);



  return (
    <div className="code">
      {/* <div ref={lineNumbersRef} className="line-numbers"></div> */}
      <div className="code-and-status">
        <textarea
          ref={codeInputRef}
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          // onScroll={syncScroll}
          placeholder="Write assembler code here..."
        />
        <p className={`cpu-status ${cpuStatus === "ok" ? 'cpu-ok' : 'cpu-nok'}`}>
          CPU_Status: {cpuStatus}
        </p>
        <div className='input-container'>
          <p class='inout'><span className='inout-highlight'>Input:</span></p>
          <input  class='input'
                  value={userInput}
                  onChange={event => setUserInput(event.target.value)}
          ></input>
        </div>
        <p class='inout'><span className='inout-highlight'>Output:</span> <span className='user-output'>{userOutput}</span></p>
      </div>
    </div>
  );
  
}

export default Code;

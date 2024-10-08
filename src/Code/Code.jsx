import './code.css';
import React, { useRef, useEffect } from 'react';
import 'codemirror/lib/codemirror.css'; // basic CSS for MirrorCode
import 'codemirror/mode/clike/clike'; // Import C syntax
import CodeMirror from 'codemirror';


function Code({ programCounter, nextProgramCounter, code, setCode, invalidLine, cpuStatus, userInput, setUserInput, userOutput }) {
  const codeInputRef = useRef(null);

  useEffect(() => {
    if (codeInputRef.current) {
      const editor = CodeMirror.fromTextArea(codeInputRef.current, {
        lineNumbers: true,
        mode: 'text/x-csrc',
        theme: 'default',
        tabSize: 8,
        smartIndent: false,
        lineWrapping: true,
        viewportMargin: Infinity,
      });

      const highlightLine = (lineNumber, className) => {
        editor.addLineClass(lineNumber - 1, 'background', className);
        editor.markText(
          { line: lineNumber - 1, ch: 0 },
          { line: lineNumber - 1, ch: Infinity },
          { className }
        );
      };

      const clearAllHighlights = () => { 
        editor.getAllMarks().forEach(mark => mark.clear());   // becose there is LineClass and markText
        const lineCount = editor.lineCount();
        for (let i = 0; i < lineCount; i++) {
          editor.removeLineClass(i, 'background', 'highlight');
          editor.removeLineClass(i, 'background', 'next');
          editor.removeLineClass(i, 'background', 'invalid');
        }
      };

      const updateHighlights = () => {
        clearAllHighlights();
        if (programCounter) highlightLine(programCounter, 'highlight');
        if (nextProgramCounter && programCounter + 1 !== nextProgramCounter) highlightLine(nextProgramCounter, 'next');
        if (invalidLine !== -1) highlightLine(invalidLine + 1, 'invalid');
      };
      
      editor.setValue(code);
      updateHighlights();
      editor.scrollIntoView({ line: programCounter, ch: 0 });

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
      <div className="code-and-status">
        <textarea
          ref={codeInputRef}
          className="code-input"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write assembler code here..."
        />
        <div className='inout-container'>
          <p className={`cpu-status ${cpuStatus === "ok" ? 'cpu-ok' : 'cpu-nok'}`}>
            CPU_Status: {cpuStatus}
          </p>
          <div className='input-container'>
            <p className='inout'><span className='inout-highlight'>Input:</span></p>
            <input  className='input'
                    value={userInput}
                    onChange={event => setUserInput(event.target.value)}
            ></input>
          </div>
          <p className='inout'><span className='inout-highlight'>Output:</span> <span className='user-output'>{userOutput}</span></p>
        </div>
      </div>
    </div>
  );
  
}

export default Code;

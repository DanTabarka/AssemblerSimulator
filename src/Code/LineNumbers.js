import React from 'react';

function LineNumbers({ code }) {
  const lines = code.split('\n');
  const lineNumberText = lines.map((_, index) => (index + 1) + '.').join('\n');

  return (
    <div className="line-numbers">
      {lineNumberText}
    </div>
  );
}

export default LineNumbers;
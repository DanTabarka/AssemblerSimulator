import React from 'react';

function Registers() {
  return (
    <div style={styles.Registers}>
      <h2>Registers</h2>
      <pre>Register values will appear here...</pre>
      <h2>Stack</h2>
      <pre>Stack contents will appear here...</pre>
    </div>
  );
}

const styles = {
  Registers: {
    width: '25%',
    padding: '10px',
    borderLeft: '2px solid #ddd',
    boxSizing: 'border-box',
  },
};

export default Registers;

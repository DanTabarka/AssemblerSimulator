import React from 'react';

function Stack() {
  return (
    <div style={styles.Stack}>
      <div id="outputInput">
        <h3>Stack</h3>
        <textarea placeholder="Enter input or view output..."></textarea>
      </div>
    </div>
  );
}

const styles = {
  Stack: {
    width: '25%',
    padding: '10px',
    boxSizing: 'border-box',
  },
};

export default Stack;

import './stack.css'


function Stack({ stackPointer, stackValues }) {

  const reversedStackValues = [...stackValues].reverse();

  // const hexValue = (value) => {
  //   return value.toString(16).toUpperCase().padStart(2, '0');
  // }
  // const binValue = (value) => {
  //   return value.toString(2).padStart(8, '0');
  // }
  // const decValue = (value) => {
  //   return value.toString(10).padStart(3, '0');
  // }

  return (
    <div className='stackDiv'>
      <h2>Stack</h2>
      {reversedStackValues.map((value, index) => (
        <div
          key={index}
          className={`stack-row ${stackValues.length - index === stackPointer ? 'active' : ''} 
                                ${stackValues.length - index < stackPointer ? 'underActive' : ''}`}
        >
          <span className="stack-number">{stackValues.length - index}.</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default Stack;

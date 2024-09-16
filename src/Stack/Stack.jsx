import './stack.css'


function Stack({ stackPointer, stackValues }) {

  const reversedStackValues = [...stackValues].reverse();

  return (
    <div className='stack-div'>
      <h2 className='stack-h2'>Stack</h2>
      {reversedStackValues.map((value, index) => (
        <div
          key={index}
          className={`stack-row ${stackValues.length - index === stackPointer ? 'active' : ''} 
                                ${stackValues.length - index < stackPointer ? 'under-active' : ''}`}
        >
          <span className="stack-number">{stackValues.length - index}.</span>
          <span className="stack-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default Stack;

import React from 'react';
import './registers.css';

function Register({name, value, data, lastUsedRegister = -2}) {
  let registers = ["A", "B", "C", "D"];

  const hexValue = value.toString(16).toUpperCase().padStart(2, '0');
  const binValue = value.toString(2).padStart(8, '0');
  const decValue = value.toString(10).padStart(3, '0');

  console.log(lastUsedRegister);

  return (
    <div className='register-item'>
        <h3 className='tooltip' data-tooltip={`${data}`}>{name}</h3>
        <p className={`value ${lastUsedRegister === registers.indexOf(name) ? 'highlight22' : ''}`}>0x{hexValue} : {decValue} : {binValue}</p>
    </div>
  );
}

export default Register;

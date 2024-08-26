import React from 'react';
import './style.css';

function Register({name, value}) {


  return (
    <div className='register-item'>
        <h3>{name}</h3>
        <p className='value'>{value}</p>
    </div>
  );
}

export default Register;

import React, { useState } from 'react';
import './style.css';
import Register from './Register.js'

function Registers() {
  const [sign, setSign] = useState(false);
  const [zero, setZero] = useState(true);
  const [carry, setCarry] = useState(false);

  return (
    <div className='registersDiv'>
      <h2>Registers</h2>
      <Register name='A' value={10} />
      <Register name='B' value={10} />
      <Register name='C' value={10} />
      <Register name='D' value={10} />

      <br/><br/>

      <Register name='PC' value={20} />
      <Register name='SP' value={20} />

      <br/>

      <table>
            <thead>
                <tr>
                  <th className="tooltip" data-tooltip="Sign flag">S</th>
                  <th className="tooltip" data-tooltip="Zero flag">Z</th>
                  <th className="tooltip" data-tooltip="Carry flag">C</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='flags'>{(sign) ? 'true' : 'false'}</td>
                    <td className='flags'>{(zero) ? 'true' : 'false'}</td>
                    <td className='flags'>{(carry) ? 'true' : 'false'}</td>
                </tr>
            </tbody>
        </table>

      
    </div>
  );
}

export default Registers;

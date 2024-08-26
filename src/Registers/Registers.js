import React from 'react';
import './style.css';
import Register from './Register.js'

function Registers() {
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
                    <td>1</td>
                    <td>0</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>

      
    </div>
  );
}

export default Registers;

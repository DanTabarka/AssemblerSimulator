import React, { useState } from 'react';
import './registers.css';
import Register from './Register.jsx'

function Registers({ registers, lastUsedRegister, programCounter, stackPointer, flags }) {

  return (
    <div className='registers-div'>
      <h2>Registers</h2>
      <Register name='A' value={registers[0]} data='Registr A' lastUsedRegister={lastUsedRegister} />
      <Register name='B' value={registers[1]} data='Registr B' lastUsedRegister={lastUsedRegister} />
      <Register name='C' value={registers[2]} data='Registr C' lastUsedRegister={lastUsedRegister} />
      <Register name='D' value={registers[3]} data='Registr D' lastUsedRegister={lastUsedRegister} />

      <br/><br/>

      <Register name='PC' value={programCounter} data='Program Counter' />
      <Register name='SP' value={stackPointer} data='Stack Pointer' />

      <br/>

      <table className='registers-table'>
            <thead>
                <tr>
                  <th className="tooltip" data-tooltip="Sign flag">S</th>
                  <th className="tooltip" data-tooltip="Zero flag">Z</th>
                  <th className="tooltip" data-tooltip="Carry flag">C</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={`flags ${flags[0] ? 'green' : 'red'}`}>{(flags[0]) ? 'true' : 'false'}</td>
                    <td className={`flags ${flags[1] ? 'green' : 'red'}`}>{(flags[1]) ? 'true' : 'false'}</td>
                    <td className={`flags ${flags[2] ? 'green' : 'red'}`}>{(flags[2]) ? 'true' : 'false'}</td>
                </tr>
            </tbody>
        </table>

      
    </div>
  );
}

export default Registers;

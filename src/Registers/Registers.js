import React, { useState } from 'react';
import './registers.css';
import Register from './Register.js'

function Registers({ registers, programCounter, stackPointer, flags }) {

  return (
    <div className='registersDiv'>
      <h2>Registers</h2>
      <Register name='A' value={registers[0]} data='Registr A' />
      <Register name='B' value={registers[1]} data='Registr B' />
      <Register name='C' value={registers[2]} data='Registr C' />
      <Register name='D' value={registers[3]} data='Registr D' />

      <br/><br/>

      <Register name='PC' value={programCounter} data='Program Counter' />
      <Register name='SP' value={stackPointer} data='Stack Pointer' />

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
                    <td className='flags'>{(flags[0]) ? 'true' : 'false'}</td>
                    <td className='flags'>{(flags[1]) ? 'true' : 'false'}</td>
                    <td className='flags'>{(flags[2]) ? 'true' : 'false'}</td>
                </tr>
            </tbody>
        </table>

      
    </div>
  );
}

export default Registers;

import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import CalcProvider from './CalcProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CalcProvider>
      <Calculator />
    </CalcProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


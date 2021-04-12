import React, { useState, useRef, useEffect } from 'react';

export const Context = React.createContext();

const CalcProvider = props => {

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.current.onerror = (e) => console.error("WebSocket error observed:", e.reason);
    ws.current.onclose = (e) =>  {
      console.log('Socket is closed', e.reason);
      return () => {
        ws.current.close();
      };
    }
  },[]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
        const calcLogs = JSON.parse(e.data);
        updateCalcLog([...calcLogs].reverse());
    };
}, []);

  const [display, updateDisplay] = useState('');
  const [preview, updatePreview] = useState('Do some calculations')
  const [calcLog, updateCalcLog] = useState([]);

  const [validLen, setLengthValidity] = useState(true);
  const [validCalc, setCalcValidity] = useState(true);

  var stringAnswer = '';
  const quint = 100000000000000000000;

  const validRegex = new RegExp(/^((?!0[0-9]+))[-]*[0-9]+(\.(?=[0-9]))*[0-9]*(([+\-*/]((?!0[0-9]+))[0-9]+(\.(?=[0-9]))*[0-9]*)+)$/);
  const validateStringFormat = (stringBeChecked) => validRegex.test(stringBeChecked) ? true : false;

  const validateCalculation = (stringToEvaluate) => {
    const answer = Math.round(eval(stringToEvaluate) * quint) / quint;

    if (answer.toString() === 'NaN' || answer.toString() === 'Infinity') {
      updatePreview('Cannot divide by zero');
      return false;

    } else if (answer > 10**19 || answer < (-10)**19) {
      updatePreview('Range of +/- 100 quintillion Exceeded');
      return false;

    } else {
      stringAnswer = answer.toString();
      return true;
    }

  }


  const press = (pressedValue) => {
    var calcText = display;
    switch (pressedValue) {
      case '=':
        calculate();
        return;

      case '+': case '-': case '*': case '/':
        if (calcText === '') {
          updatePreview('Enter a number before an operation');
          return;
        }
        calcText += pressedValue;
        break;

      case 'backspace':
        calcText = calcText.slice(0, -1);
        break;

      case 'AC':
        calcText = '';
        updatePreview('');
        break;

      case '.':
        if (calcText === '' || /[+\-*/]$/.test(calcText)) {
          calcText += '0';
        }

      // intentional fallthrough so .(decimal) is added to display when it's followed by non-operator or it's a non-empty displays.
      case '0':
        if (calcText === '') {
          updatePreview('Leading zero can only be used with decimals');
          return;
        }

      // intentional fallthrough so 0 is added to non-empty displays.
      default:
        calcText += pressedValue;

    }
    updateDisplay(calcText);
    if(validateStringFormat(calcText) && validateCalculation(calcText)) {
      updatePreview(stringAnswer);
    }
  }

  const calculate = () => {
    if (validateStringFormat(display)) {
      if (validateCalculation(display)) {
        updateDisplay(stringAnswer);
        updatePreview('Your calculation was ' + display);
      }
    } else {
      updatePreview('Calculation is not valid')
    }
  }


  return (
    <Context.Provider value={{ display, preview, calcLogs, validLen, validCalc, press }}>
      {props.children}
    </Context.Provider>
  );
};

export default CalcProvider;

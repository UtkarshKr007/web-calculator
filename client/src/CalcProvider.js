import React, { useState } from 'react';

export const Context = React.createContext();

const CalcProvider = props => {

  const [display, updateDisplay] = useState('');
  const [validLen, setLengthValidity] = useState(true);
  const [validCalc, setCalcValidity] = useState(true);

  var stringAnswer = '';
  const quint = 100000000000000000000;

  const validRegex = new RegExp(/^((?!0[0-9]+))[-]*[0-9]+(\.(?=[0-9]))*[0-9]*(([+\-*/]((?!0[0-9]+))[0-9]+(\.(?=[0-9]))*[0-9]*)+)$/);
  const validateStringFormat = (stringBeChecked) => validRegex.test(stringBeChecked) ? true : false;

  const validateCalculation = (stringToEvaluate) => {
    const answer = Math.round(eval(stringToEvaluate) * quint) / quint;

    if (answer.toString() === 'NaN' || answer.toString() === 'Infinity') {
      return false;

    } else if (answer > 10**19 || answer < (-10)**19) {
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
          return;
        }
        calcText += pressedValue;
        break;

      case 'backspace':
        calcText = calcText.slice(0, -1);
        break;

      case 'AC':
        calcText = '';
        break;

      case '.':
        if (calcText === '' || /[+\-*/]$/.test(calcText)) {
          calcText += '0';
        }

      // intentional fallthrough so .(decimal) is added to display when it's followed by non-operator or it's a non-empty displays.
      case '0':
        if (calcText === '') {
          return;
        }

      // intentional fallthrough so 0 is added to non-empty displays.
      default:
        calcText += pressedValue;

    }
    updateDisplay(calcText);
  }

  const calculate = () => {
    if (validateStringFormat(display) && validateCalculation(display)) {
        updateDisplay(stringAnswer);
    }
  }


  return (
    <Context.Provider value={{ display, validLen, validCalc, press }}>
      {props.children}
    </Context.Provider>
  );
};

export default CalcProvider;

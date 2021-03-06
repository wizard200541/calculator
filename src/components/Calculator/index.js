import React, { useEffect, useState } from 'react';
import AutoScalingText from '../AutoScalingText';
import './style.css';

function Calculator() {
  const [sum, setSum] = useState(0);
  const [firstNum, setFirstNum] = useState('');
  const [secondNum, setSecondNum] = useState('');
  const [action, setAction] = useState('');

  const handleNumClick = (e) => {
    const { dataset } = e.target
    if (action) {
      setSecondNum(secondNum + dataset.number);
    } else {
      setFirstNum(firstNum + dataset.number);
    }
  }

  const handleActionClick = (e) => {
    const { dataset } = e.target
    setAction(dataset.action);
  }

  const handleCalculation = () => {
    switch(action) {
      case '+':
        setSum(Number(firstNum) + Number(secondNum));
        break;
      case 'x':
        setSum(Number(firstNum) * Number(secondNum));
        break;
      case '÷':
        setSum(Number(firstNum) / Number(secondNum));
        break;
      case '-':
        setSum(Number(firstNum) - Number(secondNum));
        break;
      default:
        setSum(0);
        break;
    }

    setFirstNum('');
    setSecondNum('');
    setAction('');
  }

  const allClear = () => {
    setFirstNum('');
    setSecondNum('');
    setAction('');
    setSum(0);
  }

  const clearLastChar = () => {
    if (secondNum) {
      setSecondNum(secondNum.substring(0, secondNum.length - 1));
    } else if (action) {
      setAction(action.substring(0, action.length - 1));
    } else if (firstNum) {
      setFirstNum(firstNum.substring(0, firstNum.length - 1) || '0');
    }
  }
  const setPercent = () => {
    if (action) {
      setSecondNum(String(secondNum/100));
    } else {
      setFirstNum(String(firstNum/100));
    }
  }

  const setDecimal = () => {
    if (action) {
      if (secondNum.indexOf('.') === -1){
        setSecondNum(`${secondNum ? secondNum : '0'}` + ".");
      }
    } else {
      if (firstNum.indexOf('.') === -1){
        setFirstNum(`${firstNum ? firstNum : '0'}` + ".");
      }
    }
  }
  const toggleSign = () => {
    if (action) {
      setSecondNum(secondNum.charAt(0) === '-' ? secondNum.substr(1) : '-' + secondNum);
    } else {
      setFirstNum(firstNum.charAt(0) === '-' ? firstNum.substr(1) : '-' + firstNum);
    }
  }

  const handleKeyDown = (event) => {
    let { key } = event
    if (key === 'Enter') {
      key = '='
    }
    if ((/^\d+$/).test(key)) {
      event.preventDefault()
      if (action) {
        setSecondNum(String(secondNum) + String(key));
      } else {
        setFirstNum(String(firstNum) + String(key));
      }
    } else if (key === '+' || key === '-' || key === '/' || key === '*' || key === '=') {
      event.preventDefault()
      switch (key) {
        case '+':
        case '-':
          setAction(key);
          break;
        case '/':
          setAction('÷');
          break;
        case '*':
          setAction('x');
          break;
        case '=':
          handleCalculation();
        default:
          break;
      }
    } else if (key === '.') {
      event.preventDefault()
      setDecimal();
    } else if (key === '%') {
      event.preventDefault()
      setPercent();
    } else if (key === 'Backspace') {
      event.preventDefault()
      clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault()
      allClear();
    }
  };

  return (
    <div className="wrapper" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="display">
        <AutoScalingText>
          {firstNum ? `${firstNum}${action}${secondNum}` : sum}
        </AutoScalingText>
      </div>
      <div className="container">
        <div className="btn tool" onClick={allClear}>AC</div>
        <div className="btn tool" onClick={toggleSign}>±</div>
        <div className="btn tool" onClick={setPercent}>%</div>
        <div className="btn action" onClick={handleActionClick} data-action="÷">÷</div>

        <div className="btn" onClick={handleNumClick} data-number="7">7</div>
        <div className="btn" onClick={handleNumClick} data-number="8">8</div>
        <div className="btn" onClick={handleNumClick} data-number="9">9</div>
        <div className="btn action" onClick={handleActionClick} data-action="x">x</div>

        <div className="btn" onClick={handleNumClick} data-number="4">4</div>
        <div className="btn" onClick={handleNumClick} data-number="5">5</div>
        <div className="btn" onClick={handleNumClick} data-number="6">6</div>
        <div className="btn action" onClick={handleActionClick} data-action="-" >-</div>

        <div className="btn" onClick={handleNumClick} data-number="1">1</div>
        <div className="btn" onClick={handleNumClick} data-number="2">2</div>
        <div className="btn" onClick={handleNumClick} data-number="3">3</div>
        <div className="btn action" onClick={handleActionClick} data-action="+">+</div>

        <div className="btn" onClick={handleNumClick} data-number="0">0</div>
        <div className="btn" onClick={setDecimal}>.</div>
        <div className="btn" onClick={clearLastChar}>←</div>
        <div className="btn action" onClick={handleCalculation}>＝</div>
      </div>
    </div>
  );
}

export default Calculator;

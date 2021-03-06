import React, { useState } from 'react';
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
  return (
    <div className="wrapper">
      <input className="display" readOnly value={firstNum ? `${firstNum}${action}${secondNum}` : sum}/>
      <div className="container">
        <div className="btn" onClick={handleNumClick} data-number="7">7</div>
        <div className="btn" onClick={handleNumClick} data-number="8">8</div>
        <div className="btn" onClick={handleNumClick} data-number="9">9</div>
        <div className="btn" onClick={handleActionClick} data-action="x">x</div>

        <div className="btn" onClick={handleNumClick} data-number="4">4</div>
        <div className="btn" onClick={handleNumClick} data-number="5">5</div>
        <div className="btn" onClick={handleNumClick} data-number="6">6</div>
        <div className="btn" onClick={handleActionClick} data-action="-" >-</div>

        <div className="btn" onClick={handleNumClick} data-number="1">1</div>
        <div className="btn" onClick={handleNumClick} data-number="2">2</div>
        <div className="btn" onClick={handleNumClick} data-number="3">3</div>
        <div className="btn" onClick={handleActionClick} data-action="+">+</div>

        <div className="btn" >±</div>
        <div className="btn" onClick={handleNumClick} data-number="0">0</div>
        <div className="btn" onClick={handleNumClick} data-number="00">00</div>
        <div className="btn" onClick={handleCalculation}>＝</div>
      </div>
    </div>
  );
}

export default Calculator;

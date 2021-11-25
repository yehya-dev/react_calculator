import { useState } from 'react';
import backspace_button from './assets/backspace.svg';

const Calculator = () => {
    
    const [mainInput, setMainInput] = useState('');
    const [currentResult, setCurrentResult] = useState(null);
    const [lastOperator, setLastOperator] = useState(undefined);
    
    // TODO refactor

    // TODO split clearvalue, backspace etc into multiple functions

    const resetCalc = () => {
        setMainInput('');
        setCurrentResult(null);
        setLastOperator(null);
    }

    const handleInput = (setVal, clearvalue=false, backspace=false) => {
        if (clearvalue === true) {
            resetCalc();
        }
        else if (backspace === true) {
            const len_inp = mainInput.length;
            const val = mainInput.toString().slice(0, len_inp - 1);
            setMainInput(val); 
        }
        else if ((setVal === '00' || setVal === '0') && mainInput === '') {
            return
        }
        else {
            if (lastOperator == null) {
                resetCalc();
            }
            setMainInput(mainInput.toString() + setVal);
            }
        }
    
    const handleOperation = (operation) => {
        if (mainInput === '' && currentResult === null) return
        if (mainInput === '' && lastOperator !== null) return

        if (lastOperator === null && operation !== '=') {
            setLastOperator(operation);
        }
 
        if (currentResult === null) {
            setCurrentResult(mainInput);
            
        }
        else {
            if (lastOperator === '+') {
                setCurrentResult(parseFloat(mainInput) + parseFloat(currentResult));
            }
            else if (lastOperator === '-') {
                setCurrentResult(parseFloat(currentResult) - parseFloat(mainInput));
            }
            else if (lastOperator === '/') {
                setCurrentResult(parseFloat(currentResult) / parseFloat(mainInput));
            }
            else if (lastOperator === 'x') {
                setCurrentResult(parseFloat(mainInput) * parseFloat(currentResult));
            }
            else if (lastOperator === '%') {
                setCurrentResult(parseFloat(currentResult) % parseFloat(mainInput));
            }
        }
        
        // All cases
        setMainInput('');

        if (operation === '=') {
            setLastOperator(null);
        }
        else {
            setLastOperator(operation);
        }
    }
    
    return (
        <main className="calc-container">
        <section style={{'position': 'relative'}}>
        <div dir="ltr" className="history-display">
        <div>
        {currentResult}
        </div>
        <div>
        {lastOperator}
        </div>
        </div>
        <input onChange={(event) => setMainInput(event.target.value)} value={mainInput}  dir='ltr' type="text" className="calc-main-input no-select"/>
        </section>
        {/* TODO : Do i need to make the button a different component ? */}
        <section className="calc-controls-parent no-select">
            <section className="calc-controls calc-left">
                <button onClick={() => handleInput(0, true)} className="attention-button" >C</button>
                <button onClick={() => handleOperation('%')} className='highlighted-button'>%</button>
                <button onClick={() => handleInput(null, false, true)} className="icon-button highlighted-button"><img className='calc-icon' src={backspace_button} alt="Backspace"/></button>
                <button onClick={() => handleInput('7')}>7</button>
                <button onClick={() => handleInput('8')}>8</button>
                <button onClick={() => handleInput('9')}>9</button>
                <button onClick={() => handleInput('4')}>4</button>
                <button onClick={() => handleInput('5')}>5</button>
                <button onClick={() => handleInput('6')}>6</button>
                <button onClick={() => handleInput('1')}>1</button>
                <button onClick={() => handleInput('2')}>2</button>
                <button onClick={() => handleInput('3')}>3</button>
                <button onClick={() => handleInput('00')}>00</button>
                <button onClick={() => handleInput('0')}>0</button>
                <button onClick={() => handleInput('.')}>.</button>
            </section>
            <section className="calc-controls calc-right">
                <button onClick={() => handleOperation('/')} className="highlighted-button">/</button>
                <button onClick={() => handleOperation('x')} className="highlighted-button">x</button>
                <button onClick={() => handleOperation('-')} className="highlighted-button">-</button>
                <button onClick={() => handleOperation('+')} className="highlighted-button">+</button>
                <button onClick={() => handleOperation('=')} className="attention-button">=</button>
            </section>
        </section>
    </main>);
}
 
export default Calculator;
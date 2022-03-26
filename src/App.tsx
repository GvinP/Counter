import React, {useState} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";

function App() {
    const startValue = 0
    const maxValue = 5
    let [counterValue, setCounterValue] = useState<number>(0)

    const incrementCounter = () => {
        if (counterValue < maxValue) {
            setCounterValue(counterValue + 1)
        }
    }
    const resetCounter = () => {
        setCounterValue(startValue)
    }
    return (
        <div className={style.app}>
            <Display counterValue={counterValue} maxValue={maxValue}/>
            <div className={style.buttons}>
                <Button name={'inc'} onClick={incrementCounter} disabled={counterValue === maxValue}/>
                <Button name={'reset'} onClick={resetCounter} disabled={counterValue === startValue}/>
            </div>

        </div>
    );
}

export default App;

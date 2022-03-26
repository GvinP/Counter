import React, {useState} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

function App() {
    let [counterValue, setCounterValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(5)
    let [startValue, setStartValue] = useState<number>(0)
    let setCounterButton = false
    let [but, setBut] = useState(false)

    const incrementCounter = () => {
        if (counterValue < maxValue) {
            setCounterValue(counterValue + 1)
        }
    }
    const resetCounter = () => {
        setCounterValue(startValue)
    }

    const setCounter = () => {
        setBut(true)
        setCounterButton = true
        setCounterValue(startValue)
    }

    const setMaxValueHandler = (value: string) => {
        setMaxValue(Number(value))
            setBut(false)
        setCounterButton = false
    }
    const setStartValueHandler = (value: string) => {
        setStartValue(Number(value))
        setBut(false)
        setCounterButton = false
    }
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.inputsContainer}>
                    <Input name={'max value:'} onChange={setMaxValueHandler} value={maxValue}/>
                    <Input name={'start value:'} onChange={setStartValueHandler} value={startValue}/>
                </div>
                <div className={style.buttonsContainer}>
                    <Button name={'set'} onClick={setCounter} disabled={but}/>
                </div>

            </div>
            <div className={style.container}>
                <Display counterValue={counterValue} maxValue={maxValue}/>
                <div className={style.buttonsContainer}>
                    <Button name={'inc'} onClick={incrementCounter} disabled={counterValue === maxValue}/>
                    <Button name={'reset'} onClick={resetCounter} disabled={counterValue === startValue}/>
                </div>
            </div>
        </div>
    );
}

export default App;

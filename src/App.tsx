import React, {useEffect, useState} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

function App() {
    let [counterValue, setCounterValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(5)
    let [startValue, setStartValue] = useState<number>(0)
    let [error, setError] = useState('')
    let [incButton, setIncButton] = useState<boolean>(false)
    let [resetButton, setResetButton] = useState<boolean>(false)
    let [setButton, setSetButton] = useState<boolean>(false)

    useEffect(() => {
        let maxValue = localStorage.getItem('maxCounterValue')
        if (maxValue) {
            setMaxValue(JSON.parse(maxValue))
        }
        let startValue = localStorage.getItem('startCounterValue')
        if (startValue) {
            setStartValue(JSON.parse(startValue))
        }
        let counterValue = localStorage.getItem('CounterValue')
        if (counterValue) {
            setCounterValue(JSON.parse(counterValue))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('CounterValue', JSON.stringify(counterValue))
    }, [counterValue])

    const incrementCounter = () => {
        if (counterValue < maxValue) {
            setCounterValue(counterValue + 1)
        }
    }

    const resetCounter = () => {
        setCounterValue(startValue)
    }

    const setCounter = () => {
        localStorage.setItem('maxCounterValue', JSON.stringify(maxValue))
        localStorage.setItem('startCounterValue', JSON.stringify(startValue))
        setCounterValue(startValue)
        setError('')
        setIncButton(false)
        setResetButton(false)
        setSetButton(true)
    }

    const setMaxValueHandler = (value: string) => {
        if (JSON.parse(value) >= startValue) {
            setMaxValue(JSON.parse(value))
            setError('enter values and press `set`')
            setIncButton(true)
            setResetButton(true)
            setSetButton(false)
        }
        if (JSON.parse(value) === startValue) {
            setError('Incorrect value!')
        }
    }
    const setStartValueHandler = (value: string) => {
        if (JSON.parse(value) >= -1 && JSON.parse(value) <= maxValue) {
            setStartValue(JSON.parse(value))
            setError('enter values and press `set`')
            setIncButton(true)
            setResetButton(true)
            setSetButton(false)
        }
        if (JSON.parse(value) === -1 || JSON.parse(value) === maxValue) {
            setError('Incorrect value!')
        }
    }
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.inputsContainer}>
                    <Input name={'max value:'} onChange={setMaxValueHandler} value={maxValue} secondValue={startValue}/>
                    <Input name={'start value:'} onChange={setStartValueHandler} value={startValue} secondValue={maxValue}/>
                </div>
                <div className={style.buttonsContainer}>
                    <Button name={'set'} onClick={setCounter} disabled={startValue === -1 || startValue === maxValue|| setButton}/>
                </div>

            </div>
            <div className={style.container}>
                <Display counterValue={counterValue} maxValue={maxValue} error={error}/>
                <div className={style.buttonsContainer}>
                    <Button name={'inc'} onClick={incrementCounter} disabled={incButton||counterValue === maxValue}/>
                    <Button name={'reset'} onClick={resetCounter} disabled={resetButton||counterValue === startValue}/>
                </div>
            </div>
        </div>
    );
}

export default App;

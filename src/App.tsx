import React, {useEffect} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {
    incrementCounterAC,
    resetCounterAC,
    setCounterAC,
    setMaxValueAC,
    setStartValueAC,
    setValuesFromLocalStorageAC, stateType
} from "./reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store";
import {Dispatch} from "redux";


function App() {
    const dispatch = useDispatch<Dispatch>()
    const counterState = useSelector<AppStateType, stateType>(state => state.counter)

    useEffect(() => {
        let maxValue = 0
        let startValue = 0
        let counterValue = 0
        const maxValueFromLocalStorage = localStorage.getItem('maxCounterValue')
        if (maxValueFromLocalStorage) {
            maxValue = JSON.parse(maxValueFromLocalStorage)
        }
        const startValueFromLocalStorage = localStorage.getItem('startCounterValue')
        if (startValueFromLocalStorage) {
            startValue = JSON.parse(startValueFromLocalStorage)
        }
        const counterValueFromLocalStorage = localStorage.getItem('CounterValue')
        if (counterValueFromLocalStorage) {
            counterValue = JSON.parse(counterValueFromLocalStorage)
        }
        dispatch(setValuesFromLocalStorageAC(maxValue, startValue, counterValue))
    }, [dispatch])


    useEffect(() => {
        localStorage.setItem('CounterValue', JSON.stringify(counterState.counterValue))
    }, [counterState.counterValue])

    const setCounter = () => {
        localStorage.setItem('maxCounterValue', JSON.stringify(counterState.maxValue))
        localStorage.setItem('startCounterValue', JSON.stringify(counterState.startValue))
        dispatch(setCounterAC())
    }
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.inputsContainer}>
                    <Input name={'max value:'} onChange={(value) => dispatch(setMaxValueAC(value))}
                           value={counterState.maxValue}
                           secondValue={counterState.startValue}/>
                    <Input name={'start value:'} onChange={(value) => dispatch(setStartValueAC(value))}
                           value={counterState.startValue}
                           secondValue={counterState.maxValue}/>
                </div>
                <div className={style.buttonsContainer}>
                    <Button name={'set'} onClick={setCounter}
                            disabled={counterState.startValue === -1 || counterState.startValue === counterState.maxValue || counterState.setButton}/>
                </div>
            </div>
            <div className={style.container}>
                <Display counterValue={counterState.counterValue} maxValue={counterState.maxValue}
                         error={counterState.error}/>
                <div className={style.buttonsContainer}>
                    <Button name={'inc'} onClick={() => dispatch(incrementCounterAC())}
                            disabled={counterState.incButton || counterState.counterValue === counterState.maxValue}/>
                    <Button name={'reset'} onClick={() => dispatch(resetCounterAC())}
                            disabled={counterState.resetButton || counterState.counterValue === counterState.startValue}/>
                </div>
            </div>
        </div>
    );
}

export default App;

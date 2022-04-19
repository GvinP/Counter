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
} from "./Reducer";
import {useDispatch, useSelector} from "react-redux";


function App() {
    const dispatch = useDispatch()
    const counterState = useSelector<stateType, stateType>(state=> state)

    useEffect(() => {
        dispatch(setValuesFromLocalStorageAC())
    }, [])


    useEffect(() => {
        localStorage.setItem('CounterValue', JSON.stringify(counterState.counterValue))
    }, [counterState.counterValue])


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
                    <Button name={'set'} onClick={() => dispatch(setCounterAC())}
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

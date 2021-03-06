import React, {useEffect} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {
    incrementCounterAC,
    resetCounterAC,
    setCounterTC,
    setCounterValueTC,
    setMaxValueAC,
    setStartValueAC,
    setValuesFromLocalStorageTC,
    StateType
} from "./reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, TypedDispatch} from "./store";


function App() {
    const dispatch = useDispatch<TypedDispatch>()
    const counterState = useSelector<AppStateType, StateType>(state => state.counter)

    useEffect(() => {
        dispatch(setValuesFromLocalStorageTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCounterValueTC(counterState.counterValue))
    }, [counterState.counterValue, dispatch])

    const setCounter = (startValue: number, maxValue: number) => {
        dispatch(setCounterTC(startValue, maxValue))
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
                    <Button name={'set'} onClick={() => setCounter(counterState.startValue, counterState.maxValue)}
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

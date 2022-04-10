import React, {useEffect, useReducer} from 'react';
import style from './App.module.css';
import {Display} from "./components/Display";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {
    INCREMENT_COUNTER,
    reducer,
    RESET_COUNTER,
    SET_COUNTER,
    SET_MAX_VALUE,
    SET_START_VALUE,
    SET_VALUES_FROM_LOCAL_STORAGE,
    stateType
} from "./Reducer";


function App() {
    
    let state: stateType = {
        counterValue: 0,
        maxValue: 5,
        startValue: 0,
        error: '',
        incButton: false,
        resetButton: false,
        setButton: false
    }

    let [counterState, dispatch] = useReducer(reducer, state)

    // let [counterValue, setCounterValue] = useState<number>(0)
    // let [maxValue, setMaxValue] = useState<number>(5)
    // let [startValue, setStartValue] = useState<number>(0)
    // let [error, setError] = useState('')
    // let [incButton, setIncButton] = useState<boolean>(false)
    // let [resetButton, setResetButton] = useState<boolean>(false)
    // let [setButton, setSetButton] = useState<boolean>(false)

    useEffect(() => {
        dispatch({type: SET_VALUES_FROM_LOCAL_STORAGE})
    }, [])


    useEffect(() => {
        localStorage.setItem('CounterValue', JSON.stringify(counterState.counterValue))
    }, [counterState.counterValue])

    // const incrementCounter = () => {
    //     if (counterValue < maxValue) {
    //         setCounterValue(counterValue + 1)
    //     }
    // }
    //
    // const resetCounter = () => {
    //     setCounterValue(startValue)
    // }
    //
    // const setCounter = () => {
    //     localStorage.setItem('maxCounterValue', JSON.stringify(maxValue))
    //     localStorage.setItem('startCounterValue', JSON.stringify(startValue))
    //     setCounterValue(startValue)
    //     setError('')
    //     setIncButton(false)
    //     setResetButton(false)
    //     setSetButton(true)
    // }
    //
    // const setMaxValueHandler = (value: string) => {
    //     if (JSON.parse(value) >= startValue) {
    //         setMaxValue(JSON.parse(value))
    //         setError('enter values and press \'set\'')
    //         setIncButton(true)
    //         setResetButton(true)
    //         setSetButton(false)
    //     }
    //     if (JSON.parse(value) === startValue) {
    //         setError('Incorrect value!')
    //     }
    // }
    //
    // const setStartValueHandler = (value: string) => {
    //     if (JSON.parse(value) >= -1 && JSON.parse(value) <= maxValue) {
    //         setStartValue(JSON.parse(value))
    //         setError('enter values and press \'set\'')
    //         setIncButton(true)
    //         setResetButton(true)
    //         setSetButton(false)
    //     }
    //     if (JSON.parse(value) === -1 || JSON.parse(value) === maxValue) {
    //         setError('Incorrect value!')
    //     }
    // }
    return (
        <div className={style.wrapper}>
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*<Route path={'/'} element={*/}
            <div className={style.container}>
                <div className={style.inputsContainer}>
                    <Input name={'max value:'} onChange={(value)=>dispatch({type: SET_MAX_VALUE, value: value})} value={counterState.maxValue}
                           secondValue={counterState.startValue}/>
                    <Input name={'start value:'} onChange={(value)=>dispatch({type: SET_START_VALUE, value: value})} value={counterState.startValue}
                           secondValue={counterState.maxValue}/>
                </div>
                <div className={style.buttonsContainer}>
                    {/*<NavLink to={'/1'} style={{textDecoration: "none"}}>*/}
                    <Button name={'set'} onClick={()=>dispatch({type: SET_COUNTER})}
                            disabled={counterState.startValue === -1 || counterState.startValue === counterState.maxValue || counterState.setButton}/>
                    {/*</NavLink>*/}
                </div>
            </div>
            {/*}/>*/}
            {/*<Route path={'/1'} element={*/}
            <div className={style.container}>
                <Display counterValue={counterState.counterValue} maxValue={counterState.maxValue} error={counterState.error}/>
                <div className={style.buttonsContainer}>
                    <Button name={'inc'} onClick={()=>dispatch({type: INCREMENT_COUNTER})}
                            disabled={counterState.incButton || counterState.counterValue === counterState.maxValue}/>
                    <Button name={'reset'} onClick={()=>dispatch({type: RESET_COUNTER})}
                            disabled={counterState.resetButton || counterState.counterValue === counterState.startValue}/>
                    {/*<NavLink to={'/'} style={{textDecoration: "none"}}>*/}
                    {/*    <Button name={'set'} onClick={() => {}} disabled={false}/>*/}
                    {/*</NavLink>*/}
                </div>
            </div>
            {/*}/>*/}
            {/*</Routes>*/}
            {/*</BrowserRouter>*/}
        </div>
    );
}

export default App;

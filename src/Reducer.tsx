export type stateType = {
    counterValue: number,
    maxValue: number,
    startValue: number,
    error: string,
    incButton: boolean,
    resetButton: boolean,
    setButton: boolean
}
type actionType = {
    type: string
    value?: string
}
export const SET_VALUES_FROM_LOCAL_STORAGE = 'SET-VALUES-FROM-LOCAL-STORAGE'
export const INCREMENT_COUNTER = 'INCREMENT-COUNTER'
export const RESET_COUNTER = 'RESET-COUNTER'
export const SET_COUNTER = 'SET-COUNTER'
export const SET_MAX_VALUE = 'SET-MAX-VALUE'
export const SET_START_VALUE = 'SET-START-VALUE'
export const reducer = (counterState: stateType, action: actionType): stateType => {
    let counterStateCopy = {...counterState}
    switch (action.type) {
        case SET_VALUES_FROM_LOCAL_STORAGE:
            let maxValue = localStorage.getItem('maxCounterValue')
            if (maxValue) {
                counterStateCopy.maxValue = JSON.parse(maxValue)
            }
            let startValue = localStorage.getItem('startCounterValue')
            if (startValue) {
                counterStateCopy.startValue = JSON.parse(startValue)
            }
            let counterValue = localStorage.getItem('CounterValue')
            if (counterValue) {
                counterStateCopy.counterValue = JSON.parse(counterValue)
            }
            return counterStateCopy;
        case INCREMENT_COUNTER:
            if (counterState.counterValue < counterState.maxValue) {
                counterStateCopy.counterValue = counterStateCopy.counterValue + 1
            }
            return counterStateCopy;
        case RESET_COUNTER:
            counterStateCopy.counterValue = counterStateCopy.startValue
            return counterStateCopy;
        case SET_COUNTER:
            localStorage.setItem('maxCounterValue', JSON.stringify(counterStateCopy.maxValue))
            localStorage.setItem('startCounterValue', JSON.stringify(counterStateCopy.startValue))
            counterStateCopy.counterValue = counterStateCopy.startValue
            counterStateCopy.error = ''
            counterStateCopy.incButton = false
            counterStateCopy.resetButton = false
            counterStateCopy.setButton = true
            return counterStateCopy;
        case SET_MAX_VALUE:
            if (action.value) {
                if (JSON.parse(action.value) >= counterStateCopy.startValue) {
                    counterStateCopy.maxValue = JSON.parse(action.value)
                    counterStateCopy.error = 'enter values and press \'set\''
                    counterStateCopy.incButton = true
                    counterStateCopy.resetButton = true
                    counterStateCopy.setButton = false
                }
                if (JSON.parse(action.value) === counterStateCopy.startValue) {
                    counterStateCopy.error = 'Incorrect value!'
                }
            }
            return counterStateCopy;
        case SET_START_VALUE:
            if (action.value) {
                if (JSON.parse(action.value) >= -1 && JSON.parse(action.value) <= counterStateCopy.maxValue) {
                    counterStateCopy.startValue = JSON.parse(action.value)
                    counterStateCopy.error = 'enter values and press \'set\''
                    counterStateCopy.incButton = true
                    counterStateCopy.resetButton = true
                    counterStateCopy.setButton = false
                }
                if (JSON.parse(action.value) === -1 || JSON.parse(action.value) === counterStateCopy.maxValue) {
                    counterStateCopy.error = 'Incorrect value!'
                }
            }
            return counterStateCopy;
        default:
            return counterStateCopy;
    }
}
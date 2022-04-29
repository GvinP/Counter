export const SET_VALUES_FROM_LOCAL_STORAGE = 'SET-VALUES-FROM-LOCAL-STORAGE'
export const INCREMENT_COUNTER = 'INCREMENT-COUNTER'
export const RESET_COUNTER = 'RESET-COUNTER'
export const SET_COUNTER = 'SET-COUNTER'
export const SET_MAX_VALUE = 'SET-MAX-VALUE'
export const SET_START_VALUE = 'SET-START-VALUE'

export type stateType = {
    counterValue: number,
    maxValue: number,
    startValue: number,
    error: string,
    incButton: boolean,
    resetButton: boolean,
    setButton: boolean
}

export type actionType =
    setValuesFromLocalStorageActionType
    | resetCounterActionType | setCounterActionType
    | setMaxValueActionType | setStartValueActionType
    | incrementCounterActionType

type setValuesFromLocalStorageActionType = ReturnType<typeof setValuesFromLocalStorageAC>
type incrementCounterActionType = ReturnType<typeof incrementCounterAC>
type resetCounterActionType = ReturnType<typeof resetCounterAC>
type setCounterActionType = ReturnType<typeof setCounterAC>
type setMaxValueActionType = ReturnType<typeof setMaxValueAC>
type setStartValueActionType = ReturnType<typeof setStartValueAC>

// type setValuesFromLocalStorageActionType = {
//     type: 'SET-VALUES-FROM-LOCAL-STORAGE'
// }
// type incrementCounterActionType = {
//     type: 'INCREMENT-COUNTER'
// }
// type resetCounterActionType = {
//     type: 'RESET-COUNTER'
// }
// type setCounterActionType = {
//     type: 'SET-COUNTER'
// }
// type setMaxValueActionType = {
//     type: 'SET-MAX-VALUE',
//     value: string
// }
// type setStartValueActionType = {
//     type: 'SET-START-VALUE',
//     value: string
// }

export const setValuesFromLocalStorageAC = (maxValue: number, startValue: number, counterValue: number) => {
    return {
        type: 'SET-VALUES-FROM-LOCAL-STORAGE',
        payload: {
            maxValue,
            startValue,
            counterValue,
        }
    } as const
}
export const incrementCounterAC = () => {
    return {
        type: 'INCREMENT-COUNTER'
    } as const
}
export const resetCounterAC = () => {
    return {
        type: 'RESET-COUNTER'
    } as const
}
export const setCounterAC = () => {
    return {
        type: 'SET-COUNTER'
    } as const
}
export const setMaxValueAC = (maxValue: string) => {
    return {
        type: 'SET-MAX-VALUE',
        value: maxValue
    } as const
}
export const setStartValueAC = (startValue: string) => {
    return {
        type: 'SET-START-VALUE',
        value: startValue
    } as const
}

const initialState: stateType = {
    counterValue: 0,
    maxValue: 5,
    startValue: 0,
    error: '',
    incButton: false,
    resetButton: false,
    setButton: false
}

export const reducer = (counterState = initialState, action: actionType): stateType => {
    const counterStateCopy = {...counterState}

    switch (action.type) {
        case SET_VALUES_FROM_LOCAL_STORAGE:
            counterStateCopy.maxValue = action.payload.maxValue
            counterStateCopy.startValue = action.payload.startValue
            counterStateCopy.counterValue = action.payload.counterValue
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

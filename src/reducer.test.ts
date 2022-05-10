import {
    reducer,
    INCREMENT_COUNTER,
    StateType,
    RESET_COUNTER,
    SET_COUNTER,
    SET_MAX_VALUE,
    SET_START_VALUE,
    SET_VALUES_FROM_LOCAL_STORAGE
} from "./reducer";

let state: StateType

beforeEach(() => {
    state = {
        counterValue: 0,
        maxValue: 5,
        startValue: 0,
        error: '',
        incButton: false,
        resetButton: false,
        setButton: false
    }
})

test('counter value should be increased', () => {
    // action
    const newState = reducer(state, {type: INCREMENT_COUNTER})
    // expectation
    expect(newState.counterValue).toBe(state.counterValue + 1);
});

test('counter value should be set to start value', () => {
    // action
    const newState = reducer(state, {type: RESET_COUNTER})
    // expectation
    expect(newState.counterValue).toBe(newState.startValue);
});

test('start counter value and maximum counter value should be set', () => {
    // action
    const newState = reducer(state, {type: SET_COUNTER})
    // expectation
    expect(newState.counterValue).toBe(newState.startValue);
    expect(newState.error).toBe('');
    expect(newState.incButton).toBe(false);
    expect(newState.resetButton).toBe(false);
    expect(newState.setButton).toBe(true);
});

test('maximum counter value should be set', () => {
    // action
    const newState = reducer(state, {type: SET_MAX_VALUE, value: '8'})
    // expectation
    expect(newState.maxValue).toBe(8);
    expect(newState.error).toBe('enter values and press \'set\'');
    expect(newState.incButton).toBe(true);
    expect(newState.resetButton).toBe(true);
    expect(newState.setButton).toBe(false);
});

test('start counter value should be set', () => {
    // action
    const newState = reducer(state, {type: SET_START_VALUE, value: '4'})
    // expectation
    expect(newState.startValue).toBe(4);
    expect(newState.error).toBe('enter values and press \'set\'');
    expect(newState.incButton).toBe(true);
    expect(newState.resetButton).toBe(true);
    expect(newState.setButton).toBe(false);
});

// test('values from local storage should be set', () => {
//    // action
//     const newState = reducer(state, {type: SET_VALUES_FROM_LOCAL_STORAGE})
//     // expectation
//     expect(newState.startValue).toBe(0);
//     expect(newState.maxValue).toBe(5);
//     expect(newState.counterValue).toBe(0);
// });
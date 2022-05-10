import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import thunk, {ThunkDispatch} from "redux-thunk"


const rootReducer = combineReducers({
    counter: reducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

// export type AppDispatch = typeof store.dispatch;

export type TypedDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

// export type TypedThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     AppStateType,
//     unknown,
//     AnyAction
//     >;

import React from 'react';
import style from './Display.module.css'

type DisplayPropsType = {
    counterValue: number
    maxValue: number
    error: string
}

export const Display = (props: DisplayPropsType) => {
    return (
        <div className={`${props.counterValue === props.maxValue ? style.red : ''}
        ${props.error ? style.text : ''} ${props.error === 'Incorrect value!' ? style.red : ''}
         ${props.error === 'enter values and press `set`' ? style.white : ''} ${style.display}`}>
            {props.error ? props.error : props.counterValue}
        </div>
    );
};
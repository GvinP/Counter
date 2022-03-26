import React from 'react';
import style from './Display.module.css'

type DisplayPropsType ={
    counterValue: number
    maxValue: number
}

export const Display = (props: DisplayPropsType) => {
    return (
        <div className= {`${props.counterValue === props.maxValue? style.red : ''} ${style.display}`}>
            {props.counterValue}
        </div>
    );
};
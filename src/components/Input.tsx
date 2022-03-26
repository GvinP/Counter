import React from 'react';
import style from './Input.module.css'

type InputPropsType = {
    name: string
    value: number
    onChange: (value: string) => void
}

export const Input = (props: InputPropsType) => {
    return (
        <div className={style.wrapper}>
            <span className={style.span}>{props.name}</span>
            <input className={style.input}
                   type={"number"} value={props.value}
                   onChange={(e) => props.onChange(e.currentTarget.value)}
            />
        </div>
    );
};
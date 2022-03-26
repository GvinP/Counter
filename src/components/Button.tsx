import React from 'react';
import style from './Button.module.css'
type ButtonPropsType = {
    name: string
    onClick: ()=>void
    disabled: boolean
}

export const Button = (props: ButtonPropsType) => {
    return (
        <div>
            <button className={`${props.disabled? style.disabled: ''} ${style.button}`}
                    onClick={props.onClick}
                    disabled={props.disabled}>{props.name}</button>
        </div>
    );
};
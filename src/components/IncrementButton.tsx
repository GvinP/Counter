import React from 'react';

type IncrementButtonPropsType = {
    onClick: ()=>void
    counterValue: number
}

export const IncrementButton = (props: IncrementButtonPropsType) => {
    return (
        <div>
            <button onClick={props.onClick} disabled={props.counterValue === 5}>inc</button>
        </div>
    );
};
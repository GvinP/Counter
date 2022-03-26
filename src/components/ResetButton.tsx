import React from 'react';

type ResetButtonPropsType = {
    counterValue: number
    onClick: ()=>void
}

export const ResetButton = (props: ResetButtonPropsType) => {
    return (
        <div>
            <button onClick={props.onClick} disabled={props.counterValue ? false : true}>reset</button>
        </div>
    );
};
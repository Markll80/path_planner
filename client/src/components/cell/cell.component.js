import React from 'react';
import './cell.styles.scss';

const Cell = ({isStart, isGoal, inPath}) => {
    return(
        <span className={`${isStart ? 'start' : ''} ${isGoal ? 'goal' : ''} ${inPath ? 'path' : ''} cell`} >
            {isStart ? 'Wall-e' : null}
            {isGoal ? 'Eve' : null}
        </span>
    );
}

export default Cell;
import React from 'react';
import './cell.styles.scss';

const Cell = ({isStart, isGoal, value, inPath, handleClick}) => {
    return(
        <span onClick={handleClick} className={`${isStart ? 'start' : ''} 
                          ${isGoal ? 'goal' : ''} 
                          ${inPath ? 'path' : ''} 
                          ${value > 1 ? 'value' : ''} 
                          cell`} >
            {isStart ? 'Wall-e' : null}
            {isGoal ? 'Eve' : null}
        </span>
    );
}

export default Cell;
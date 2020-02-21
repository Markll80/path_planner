import React from 'react';
import './board.styles.scss';

import Cell from '../cell/cell.component'

const Board = ({width, height, start, goal, paths}) => {
    // const boardArray = new Array(width*height);
    // for(var i = 0; i < boardArray.length; i++) boardArray[i] = 1;
    
    const boardArray = new Array(width);
    // const boardJSX = [];
    for(var i = 0; i < boardArray.length; i++) {
        boardArray[i] = new Array(height);
        for(var j = 0; j < boardArray.length; j++) {
            boardArray[i][j] = {
                isStart: false,
                isGoal: false,
                inPath: false,
                value: 1,
            }
        }
    }
    // console.log(width);
    // console.log(boardArray);
    // console.log(start.i);
    // console.log(start.j);
    const boardJSX = [];
    if(boardArray.length > 0) {
        // console.log(boardArray);
        boardArray[start.i][start.j].isStart = true;
        boardArray[goal.i][goal.j].isGoal = true;

        paths.forEach((item) => {
            boardArray[item.i][item.j].inPath = true;
        });

        boardArray.forEach((item1, i) => {
            item1.forEach((item2, j) => {
                if((j+1) % height === 0) boardJSX.push(
                    <span key={-i-0.1}>
                        <Cell 
                            key={(i+1) * height + j}
                            isStart={item2.isStart}
                            isGoal={item2.isGoal}
                            inPath={item2.inPath}
                        />
                        <br key={-i-0.2} />
                    </span>
                );
                else boardJSX.push(
                    <Cell 
                        key={(i+1) * height + j} 
                        isStart={item2.isStart}
                        isGoal={item2.isGoal}
                        inPath={item2.inPath}
                    />);
            });
        });
    }

    // const boardJSX = boardArray.map((val, index) => {
    //     // ((index+1) % width) == 0 ? 
    //     // <span><Cell /><br /></span>
    //     // :
    //     // <Cell />;
    //     // console.log(index)
    //     if((index+1) % width === 0) {
    //         // console.log('??');
    //         return(<span><Cell key={index} /><br /></span>);
    //     }
    //     else return(<Cell key={index}/>);
    // });
    return (
        <div className='Board'>
            {boardJSX}
        </div>
    );
};

export default Board;
import React from 'react';
import './board.styles.scss';

import Cell from '../cell/cell.component';

class Board extends React.Component {
    // Attach keyboard listener
    componentDidMount() {
        document.addEventListener('keydown', async (e) => {
            const { changeStart, updateMovement, start, width, height } = this.props;
            if(e.key === 'w' && start.i !== 0) {
                await updateMovement(start.i-1, start.j);
                changeStart();
            }
            if(e.key === 'a' && start.j !== 0) {
                await updateMovement(start.i, start.j-1);
                changeStart();
            }
            if(e.key === 's' && start.i !== height-1) {
                await updateMovement(start.i+1, start.j);
                changeStart();
            }
            if(e.key === 'd' && start.j !== width-1) {
                await updateMovement(start.i, start.j+1);
                changeStart();
            }
        });
    }

    buildBlock = () => {
        const { width, height, start, goal, costs, paths, cellClickHandler } = this.props
        const boardArray = new Array(height);
        for (var i = 0; i < boardArray.length; i++) {
            boardArray[i] = new Array(width);
            for (var j = 0; j < boardArray[i].length; j++) {
                boardArray[i][j] = {
                    isStart: false,
                    isGoal: false,
                    inPath: false,
                    value: 1,
                }
            }
        }
        const boardJSX = [];
        if (boardArray.length > 0) {
            boardArray[start.i][start.j].isStart = true;
            boardArray[goal.i][goal.j].isGoal = true;

            costs.forEach((item) => {
                boardArray[item.i][item.j].value = item.value;
            })

            paths.forEach((item) => {
                boardArray[item.i][item.j].inPath = true;
            });

            boardArray.forEach((item1, i) => {
                item1.forEach((item2, j) => {
                    // console.log(i*width+j);
                    // console.log(`i: ${i}, height: ${height}, j: ${j}`);
                    if ((j + 1) % width === 0) boardJSX.push(
                        <span key={-i - 0.1}>
                            <Cell
                                key={i * width + j}
                                isStart={item2.isStart}
                                isGoal={item2.isGoal}
                                value={item2.value}
                                inPath={item2.inPath}
                                handleClick={() => cellClickHandler({i: i, j: j, value: item2.value})}
                            />
                            <br key={-i - 0.2} />
                        </span>
                    );
                    else boardJSX.push(
                        <Cell
                            key={i * width + j}
                            isStart={item2.isStart}
                            isGoal={item2.isGoal}
                            value={item2.value}
                            inPath={item2.inPath}
                            handleClick={() => cellClickHandler({i: i, j: j, value: item2.value})}
                        />);
                });
            });
        }
        return boardJSX;
    }

    render() {
    return(
        <div className = 'Board' >
            { this.buildBlock() }
        </div>
    );}
};

export default Board;
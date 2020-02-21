import React from 'react';
import './puzzle.styles.scss';

import Board from '../board/board.component';
import Popup from '../popup/popup.component';

import Adapter from '../../api/ApiAdapter';

class Puzzle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: true,
            mapWidth: 0,
            mapHeight: 0,
            inputWidth: 0,
            inputHeight: 0,
            startI: 0,
            startJ: 0,
            inputStartI: 0,
            inputStartJ: 0,
            goalI: 0,
            goalJ: 0,
            inputGoalI: 0,
            inputGoalJ: 0,
            costs: '',
            paths: [],
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(nextState);
    //     return true;
    // }

    handleSubmit = async () => {
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        const resCreateStart = await Adapter.createStart(this.state.startI, this.state.startJ);
        const resCreateGoal = await Adapter.createGoal(this.state.goalI, this.state.goalJ);
        const resGetPath = await Adapter.getPath();
        this.setState({
            settings: false,
            mapWidth: resCreateMap.mapWidth, 
            mapHeight: resCreateMap.mapHeight,
            startI: resCreateStart.i,
            startJ: resCreateStart.j,
            goalI: resCreateGoal.i,
            goalJ: resCreateGoal.j,
            paths: resGetPath.paths
        });
    }

    changeMap = async () => {
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        const resCreateStart = await Adapter.createStart(0, 0);
        const resCreateGoal = await Adapter.createGoal(this.state.inputHeight-1, this.state.inputWidth-1);
        const resGetPath = await Adapter.getPath();

        this.setState({
            mapWidth: resCreateMap.mapWidth, 
            mapHeight: resCreateMap.mapHeight,
            startI: resCreateStart.i,
            startJ: resCreateStart.j,
            goalI: resCreateGoal.i,
            goalJ: resCreateGoal.j,
            paths: resGetPath.paths
        });
    }

    changeStart = async() => {
        // console.log('called');
        await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        const resCreateStart = await Adapter.createStart(this.state.inputStartI, this.state.inputStartJ);
        const resGetPath = await Adapter.getPath();
        // console.log(resCreateStart);

        this.setState({
            startI: resCreateStart.i,
            startJ: resCreateStart.j,
            paths: resGetPath.paths
        });
    }

    changeGoal = async() => {
        await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        // await Adapter.createStart(this.state.startI, this.state.startJ);
        const resCreateGoal = await Adapter.createGoal(this.state.inputGoalI, this.state.inputGoalJ);
        const resGetPath = await Adapter.getPath();
        console.log(resGetPath);
        // console.log(resCreateStart);

        this.setState({
            goalI: resCreateGoal.i,
            goalJ: resCreateGoal.j,
            paths: resGetPath.paths
        });
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const start = {i: this.state.startI, j: this.state.startJ};
        const goal = {i: this.state.goalI, j: this.state.goalJ};
        return(
            <div>
                {this.state.settings ?
                    <Popup 
                        handleSubmit={this.handleSubmit} 
                        handleChange={this.handleChange} 
                        // inputHeight={this.state.inputHeight}
                        // inputWidth={this.state.inputWidth}
                    />
                    :
                    <div>
                        <Board width={this.state.mapWidth} 
                            height={this.state.mapHeight} 
                            start={start} 
                            goal={goal}
                            paths={this.state.paths}
                        />
                        <div className='config'>
                            <div>
                                <span>Map:</span>
                                <form id='changeMap' onSubmit={this.changeMap}>
                                    <span>i:</span>
                                    <input name='inputHeight' type='number' onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputWidth' type='number' onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeMap}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Start:</span>
                                <form id='changeStart' onSubmit={this.changeStart}>
                                    <span>i:</span>
                                    <input name='inputStartI' type='number' onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputStartJ' type='number' onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeStart}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Goal:</span>
                                <form id='changeGoal' onSubmit={this.changeGoal}>
                                    <span>i:</span>
                                    <input name='inputGoalI' type='number' onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputGoalJ' type='number' onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeGoal}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Costs:</span>
                                <form id='changeCosts' onSubmit={this.changCosts}>
                                    <span>i:</span>
                                    <input name='inputHeight' type='number' onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputWidth' type='number' onChange={this.handleChange} required />
                                </form>
                                <button type='submit' form='changeMap' value='Submit'>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Puzzle;
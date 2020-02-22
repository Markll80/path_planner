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
            inputCosts: '',
            costs: [],
            paths: [],
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(nextState);
    //     return true;
    // }

    handleSubmit = async () => {
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        // const resCreateStart = await Adapter.createStart(this.state.startI, this.state.startJ);
        // const resCreateGoal = await Adapter.createGoal(this.state.goalI, this.state.goalJ);
        // const resGetPath = await Adapter.getPath();
        this.setState({
            settings: false,
            mapWidth: resCreateMap.mapWidth, 
            mapHeight: resCreateMap.mapHeight,
            // inputWidth: resCreateMap.mapWidth,
            // inputHeight: resCreateMap.mapHeight,
            // startI: resCreateMap.start.i,
            // startJ: resCreateMap.start.j,
            // goalI: resCreateMap.goal.i,
            // goalJ: resCreateMap.goal.j,
            paths: resCreateMap.paths
        });
    }

    cellClickHandler = async (location) => {
        location.value > 1 ? location.value = 1 : location.value = 10;
        const resCreateCost = await Adapter.createCost(JSON.stringify(location));
        this.setState({
            costs: resCreateCost.costs,
            paths: resCreateCost.paths
        });
    }

    // RESET COSTS TODO
    changeMap = async () => {
        if(this.state.inputHeight > 10 || this.state.inputWidth > 10) {
            alert("I haven't made the blocks responsive yet so please keep the front-end under size 10 for now :)");
        }
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        // const resCreateStart = await Adapter.createStart(0, 0);
        // const resCreateGoal = await Adapter.createGoal(this.state.inputHeight-1, this.state.inputWidth-1);
        // const resCreateCost = await Adapter.createCost();
        // const resGetPath = await Adapter.getPath();
        // console.log(resCreateStart);
        // console.log(resCreateGoal);
        // console.log(resCreateMap.mapWidth);
        // console.log(resCreateMap.mapHeight);
        if(resCreateMap.status === 403) {
            alert('Invalid map data, Please enter numbers that are non negative. (floating numbers will be rounded down)');
            this.setState({
                inputWidth: this.state.mapWidth,
                inputHeight: this.state.mapHeight
            });
            return;
        }

        this.setState({
            settings: false,
            mapWidth: resCreateMap.mapWidth, 
            mapHeight: resCreateMap.mapHeight,
            startI: resCreateMap.start.i,
            startJ: resCreateMap.start.j,
            inputStartI: resCreateMap.start.i,
            inputStartJ: resCreateMap.start.j,
            goalI: resCreateMap.goal.i,
            goalJ: resCreateMap.goal.j,
            inputGoalI: resCreateMap.goal.i,
            inputGoalJ: resCreateMap.goal.j,
            costs: [],
            paths: resCreateMap.paths
        });
    }

    changeStart = async () => {
        // await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        if(this.state.inputStartI == this.state.goalI && this.state.inputStartJ == this.state.goalJ) {
            alert('Found Eve!');
            this.changeMap();
            return;
        }
        const resCreateStart = await Adapter.createStart(this.state.inputStartI, this.state.inputStartJ);
        if(resCreateStart.status === 403) {
            alert('Invalid Start! Please check your fiedls (Starting coordinates should be non negative, floating numbers will be rounded down)');
            return;
        }
        // await Adapter.createGoal(this.state.goalI, this.state.goalJ);
        // await Adapter.createCost(this.state.costs);
        // const resGetPath = await Adapter.getPath();
        // console.log(resCreateStart);
        // console.log(resCreateStart);

        this.setState({
            startI: resCreateStart.i,
            startJ: resCreateStart.j,
            inputStartI: resCreateStart.i,
            inputStartJ: resCreateStart.j,
            paths: resCreateStart.paths
        });
    }

    changeGoal = async() => {
        // await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        // await Adapter.createStart(this.state.startI, this.state.startJ);
        if(this.state.inputGoalI == this.state.startI && this.state.inputGoalJ == this.state.startJ) {
            alert('Oh wow Eve found Wall-e!');
            this.changeMap();
            return;
        }
        const resCreateGoal = await Adapter.createGoal(this.state.inputGoalI, this.state.inputGoalJ);
        if(resCreateGoal.status === 403) {
            alert('Invalid goal! Please check your fields (Your goal coordinates should be non negative, floating numbers will be rounded down to the nearest integers.)');
            return;
        }
        // await Adapter.createCost(this.state.costs);
        // const resGetPath = await Adapter.getPath();
        // console.log(resGetPath);
        // console.log(resCreateStart);

        this.setState({
            goalI: resCreateGoal.i,
            goalJ: resCreateGoal.j,
            inputGoalI: resCreateGoal.i,
            inputGoalJ: resCreateGoal.j,
            paths: resCreateGoal.paths
        });
    }

    changeCosts = async () => {
        // console.log(this.state.costs.split(','));
        // const JSONArray = this.state.inputCosts.split('|');
        // const costObjects = JSONArray.map((item) => {
        //     // console.log(item);
        //     return JSON.parse(item);
        // });
        // await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        // await Adapter.createStart(this.state.inputStartI, this.state.inputStartJ);
        // await Adapter.createGoal(this.state.goalI, this.state.goalJ);
        const resCreateCost = await Adapter.createCost(this.state.inputCosts);
        if(resCreateCost.status === 403) {
            alert('Invalid JSON input! JSON example: {"i": 2, "j": 2, "value": 10}, all numbers must be non negative (value must be positive) and please follow the field name in the example (floating numbers will be rounded down)');
            this.setState({inputCosts: ''});
            return;
        }
        // const resGetPath = await Adapter.getPath();
        // console.log(resCreateCost);
        this.setState({
            costs: resCreateCost.costs,
            paths: resCreateCost.paths
        });
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    updateMovement = (newI, newJ) => {
        this.setState({
            inputStartI: newI,
            inputStartJ: newJ
        });
    }
    

    render() {
        const start = {i: this.state.startI, j: this.state.startJ};
        const goal = {i: this.state.goalI, j: this.state.goalJ};
        return(
            <div>
                {this.state.settings ?
                    <Popup 
                        changeMap={this.changeMap} 
                        handleChange={this.handleChange} 
                        // inputHeight={this.state.inputHeight}
                        // inputWidth={this.state.inputWidth}
                    />
                    :
                    <div>
                        <p>Use WASD to control Wall-e!</p>
                        <p>Use mouse to toggle a block to an obstacle! Click again to toggle back</p>
                        <Board 
                            width={this.state.mapWidth} 
                            height={this.state.mapHeight} 
                            start={start} 
                            goal={goal}
                            costs={this.state.costs}
                            paths={this.state.paths}
                            updateMovement={this.updateMovement}
                            changeStart={this.changeStart}
                            cellClickHandler={this.cellClickHandler}
                        />
                        <div className='config'>
                            <div>
                                <span>Map:</span>
                                <form id='changeMap' onSubmit={this.changeMap}>
                                    <span>i:</span>
                                    <input name='inputHeight' type='number' value={this.state.inputHeight} onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputWidth' type='number' value={this.state.inputWidth} onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeMap}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Start:</span>
                                <form id='changeStart' onSubmit={this.changeStart}>
                                    <span>i:</span>
                                    <input name='inputStartI' type='number' value={this.state.inputStartI} onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputStartJ' type='number' value={this.state.inputStartJ} onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeStart}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Goal:</span>
                                <form id='changeGoal' onSubmit={this.changeGoal}>
                                    <span>i:</span>
                                    <input name='inputGoalI' type='number' value={this.state.inputGoalI} onChange={this.handleChange} required />
                                    <span>j:</span>
                                    <input name='inputGoalJ' type='number' value={this.state.inputGoalJ} onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeGoal}>SUBMIT</button>
                            </div>
                            <div>
                                <span>Costs:</span>
                                <form id='changeCosts' onSubmit={this.changCosts}>
                                    <input className='costs' name='inputCosts' value={this.state.inputCosts} onChange={this.handleChange} required />
                                </form>
                                <button type='submit' onClick={this.changeCosts}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Puzzle;
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
    
    // Handles submit button from the popup
    handleSubmit = async () => {
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
        this.setState({
            settings: false,
            mapWidth: resCreateMap.mapWidth, 
            mapHeight: resCreateMap.mapHeight,
            paths: resCreateMap.paths
        });
    }

    // Handles when a user clicks on a block
    cellClickHandler = async (location) => {
        location.value > 1 ? location.value = 1 : location.value = 10;
        const resCreateCost = await Adapter.createCost(JSON.stringify(location));
        this.setState({
            costs: resCreateCost.costs,
            paths: resCreateCost.paths
        });
    }

    // Map change api call
    changeMap = async () => {
        if(this.state.inputHeight > 10 || this.state.inputWidth > 10) {
            alert("I haven't made the blocks responsive yet so please keep the front-end under size 10 for now :)");
            this.setState({
                settings: true
            });
            return;
        }
        const resCreateMap = await Adapter.createMap(this.state.inputHeight, this.state.inputWidth);
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

    // Start change api call
    changeStart = async () => {
        if(
            parseInt(this.state.inputStartI) === this.state.goalI && 
            parseInt(this.state.inputStartJ) === this.state.goalJ
        ) {
            alert('Found Eve!');
            this.changeMap();
            return;
        }
        const resCreateStart = await Adapter.createStart(this.state.inputStartI, this.state.inputStartJ);
        if(resCreateStart.status === 403) {
            alert('Invalid Start! Please check your fiedls (Starting coordinates should be non negative, floating numbers will be rounded down)');
            return;
        }

        this.setState({
            startI: resCreateStart.i,
            startJ: resCreateStart.j,
            inputStartI: resCreateStart.i,
            inputStartJ: resCreateStart.j,
            paths: resCreateStart.paths
        });
    }

    // Goal change api call
    changeGoal = async() => {
        if(
            parseInt(this.state.inputGoalI) === this.state.startI && 
            parseInt(this.state.inputGoalJ) === this.state.startJ
        ) {
            alert('Oh wow Eve found Wall-e!');
            this.changeMap();
            return;
        }
        const resCreateGoal = await Adapter.createGoal(this.state.inputGoalI, this.state.inputGoalJ);
        if(resCreateGoal.status === 403) {
            alert('Invalid goal! Please check your fields (Your goal coordinates should be non negative, floating numbers will be rounded down to the nearest integers.)');
            return;
        }

        this.setState({
            goalI: resCreateGoal.i,
            goalJ: resCreateGoal.j,
            inputGoalI: resCreateGoal.i,
            inputGoalJ: resCreateGoal.j,
            paths: resCreateGoal.paths
        });
    }

    // Add obstacles api call
    changeCosts = async () => {
        const resCreateCost = await Adapter.createCost(this.state.inputCosts);
        if(resCreateCost.status === 403) {
            alert('Invalid JSON input! JSON example: {"i": 2, "j": 2, "value": 10}, all numbers must be non negative (value must be positive) and please follow the field name in the example (floating numbers will be rounded down)');
            this.setState({inputCosts: ''});
            return;
        }
        this.setState({
            costs: resCreateCost.costs,
            paths: resCreateCost.paths
        });
    }

    // Handles all changes in all input textfields
    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    // Helper function for keyboard listener in board
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
                                <span>Costs: (JSON objects only, use '|' to seperate)</span>
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
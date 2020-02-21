import React, { Component } from 'react';
import Adapter from './api/ApiAdapter';
import Popup from './components/popup/popup.component';
import Cell from './components/cell/cell.component';
import Puzzle from './components/puzzle/puzzle.component';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  // apiCall = async () => {
  //   // const res = await fetch('/wocao');
  //   // const body = await res.json();
  //   // this.setState({data: body.express});
  //   const res = await Adapter.createMap(5,5);
  //   const st = await Adapter.createStart(0,0);
  //   const ed = await Adapter.createGoal(4,4);
  //   const co = await Adapter.createCost([{i: 3, j: 4, cost: 10}]);
  //   const pt = await Adapter.getPath();
  //   console.log(pt);
  //   // this.setState({data: pt.paths});
  // }
  // // componentDidMount() {
  // //   this.apiCall()
  // //     .then(res => this.setState({data: res.express}));
  // // }

  // // apiCall = async () => {
  // //   const res = await fetch('/express_backend');
  // //   const body = await res.json();
  // //   return body;
  // // }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
          </p>
          <button onClick={this.apiCall}>createMap</button>
          <button onClick={this}></button>
        </header> */}
        {/* <Popup toggle={this.toggleSettings} /> */}
        {/* <Cell /> */}
        <Puzzle />
      </div>
    );
  }
}

export default App;

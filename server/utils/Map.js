import TinyQueue from 'tinyqueue';

import Node from './Node';

class Map {
    
    constructor(row, col) {
        // console.log(row);
        // console.log(col);
        this.start = [0,0];
        this.end = [row-1, col-1];
        this.pq = new TinyQueue([], (a,b) => a.value - b.value);
        this.path = [];
        this.count = 0;

        this.grid = new Array(row);
        console.log(this.grid.length);
        // console.log(typeof(row));
        // console.log(row);
        const grid = this.grid;
        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array(col);
        }

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                // console.log('??');
                grid[i][j] = new Node(i, j);
                // i == 0 ? null : grid[i][j].addChild(grid[i - 1][j]);
                // i == grid.length - 1 ? null : grid[i][j].addChild(grid[i + 1][j]);
                // j == 0 ? null : grid[i][j].addChild(grid[i][j - 1]);
                // j == grid[0].length - 1 ? null : grid[i][j].addChild(grid[i][j + 1]);
                // if(i == 0 && j == 0) console.log(`foiejwfoijewaiofj: ${grid[i][j].children}`);
                if(i !== 0) {
                    grid[i][j].addChild(grid[i-1][j]);
                    grid[i-1][j].addChild(grid[i][j]);
                }
                if(j !== 0) {
                    grid[i][j].addChild(grid[i][j-1]);
                    grid[i][j-1].addChild(grid[i][j]);
                }
            }
        }
        // console.log(grid);
    }

    begin = () => {
        // console.log(this.start);
        // console.log(this.start);
        const firstNode = this.grid[this.start[0]][this.start[1]];
        // console.log(firstNode);
        firstNode.initPathLength();
        this.findPath(this.start);
    }

    // findPath = (start) => {
    //     const curr = this.grid[start[0]][start[1]];
    //     const goal = this.grid[this.end[0]][this.end[1]];

    //     if(curr == goal) {
    //         return;
    //     }

    //     for(var i = 0; i < curr.children.length; i++) {
    //         if(curr.children[i] == curr.prev) continue;
    //         curr.children[i].addPathLength(curr)
    //         curr.children[i].calculateValue(this.end[0], this.end[1]);
    //         if(!curr.children[i].explored) this.pq.push(curr.children[i]);
    //     }

    //     const next = this.pq.pop();
    //     next.setExplored();
    //     return process.nextTick(() => this.findPath([next.i, next.j], [goal.i, goal.j]));
    // }

    findPath = (start) => {
        console.log(start);
        var curr = this.grid[start[0]][start[1]];
        // console.log(curr);
        // console.log(this.grid);
        const goal = this.grid[this.end[0]][this.end[1]]

        while(curr !== goal) {
            // console.log(++this.count);
            // console.log(`i: ${curr.i}, j: ${curr.j}`);
            for(var i = 0; i < curr.children.length; i++) {
                if(curr.children[i] == curr.prev) continue;
                curr.children[i].addPathLength(curr)
                curr.children[i].calculateValue(this.end[0], this.end[1]);
                if(!curr.children[i].explored) this.pq.push(curr.children[i]);
                curr.children[i].setExplored();
            }
            curr = this.pq.pop();
            // Explore the starting node TODO
            // curr.setExplored();
        }
    }

    // findPath = (start) => {
    //     // console.log(++this.count);
    //     // console.log('start');
    //     // const st = this.grid[this.start[0]][this.start[1]];
    //     // console.log(start);
    //     // start.setExplored();
    //     // debugger;
    //     // console.log(this.grid);
    //     const curr = this.grid[start[0]][start[1]];
    //     const goal = this.grid[this.end[0]][this.end[1]];
    //     // console.log(st.pathLength);
    //     // console.log(this.end);

    //     // console.log(curr.pathLength);

    //     if(curr == goal) {
    //         // return this.path.unshift(this.end);
    //         return;
    //     }

    //     for(var i = 0; i < curr.children.length; i++) {
    //         // console.log('???');
    //         if(curr.children[i] == curr.prev) continue;
    //         // curr.children[i].prev
    //         curr.children[i].addPathLength(curr)
    //         curr.children[i].calculateValue(this.end[0], this.end[1]);
    //         // if(curr.children[i].i == 1 &&  curr.children[i].j == 0) console.log(curr.children[i].value);
    //         // console.log('123');
    //         if(!curr.children[i].explored) this.pq.push(curr.children[i]);
    //         // console.log('pushed'); 
    //     }

    //     const next = this.pq.pop();
    //     next.setExplored();
    //     // console.log(`i: ${next.i}, j: ${next.j}`);
    //     // console.log(`i: ${goal.i}, j: ${goal.j}`);
    //     // path.unshift(this.findPath([next.i, next.j], [goal.i, goal.j]));
    //     // path = this.findPath([next.i, next.j], [goal.i, goal.j]);
    //     // return path.unshift([curr.i, curr.j]);
    //     // next.setPrev(curr);
    //     // setTimeout(() => {
    //     //     this.findPath([next.i, next.j], [goal.i, goal.j]);
    //     //     return;
    //     // }, 0);
    //     // return setImmediate(() => this.findPath([next.i, next.j], [goal.i, goal.j]));
    //     return process.nextTick(() => this.findPath([next.i, next.j], [goal.i, goal.j]));
    //     // return this.trampoline(this.findPath([next.i, next.j], [goal.i, goal.j]));
    //     // return this.path.unshift([curr.i, curr.j]);
    // }

    // trampoline = f => (...args) => {
    //     var res = f(args);
    //     while(typeof res === 'function') res = res();
    //     return res;
    // }

    getPath = () => {
        var curr = this.grid[this.end[0]][this.end[1]];
        this.path.unshift({i: curr.i, j: curr.j});

        while(curr.prev) {
            // console.log(`[${curr.prev.i}, ${curr.prev.j}]`);
            this.path.unshift({i: curr.prev.i, j: curr.prev.j});
            curr = curr.prev;
        }

        return this.path;
    }

    setStart = (start) => {
        this.start = start;
    }

    setEnd = (end) => {
        this.end = end;
    }

    setCost = (nodes) => {
        for(var k = 0; k < nodes.length; k++) {
            this.grid[nodes[k].i][nodes[k].j].setCost(nodes[k].cost);
        }
    }

    
}

export default Map;

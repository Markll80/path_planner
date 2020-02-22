import TinyQueue from 'tinyqueue';

import Node from './Node';

class Map {
    
    // New map object according to the row number and col number passed in from the client
    constructor(row, col) {
        this.start = [0,0];
        this.end = [row-1, col-1];
        this.pq = new TinyQueue([], (a,b) => a.value - b.value);  // Priority Queue
        this.path = [];
        this.costs = [];

        this.grid = new Array(row);
        const grid = this.grid;

        // Create a 2d array and populate it with nodes, then link each other as children
        for (var i = 0; i < grid.length; i++) {
            grid[i] = new Array(col);
            for (var j = 0; j < grid[0].length; j++) {
                grid[i][j] = new Node(i, j);
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
    }

    // Init path length from infinity to 0
    begin = () => {
        const firstNode = this.grid[this.start[0]][this.start[1]];
        firstNode.initPathLength();
        this.findPath(this.start);
    }

    // A* algorithm
    findPath = (start) => {
        var curr = this.grid[start[0]][start[1]];
        const goal = this.grid[this.end[0]][this.end[1]]

        while(curr !== goal) {
            for(var i = 0; i < curr.children.length; i++) {
                // To ensure the path does not go back the way it came
                if(curr.children[i] == curr.prev) continue;
                // Add path length to the existing one, if the child is an obstacle, 
                // the obstacle value will be added, otherwise 1 will be added
                curr.children[i].addPathLength(curr)
                // Heuristic calculation: Accumulated path length + distance from current position to the goal
                curr.children[i].calculateValue(this.end[0], this.end[1]);
                if(!curr.children[i].explored) this.pq.push(curr.children[i]);
                curr.children[i].setExplored();
            }
            curr = this.pq.pop();
        }
    }

    // Backtrack from the goal to the starting point using prev
    getPath = () => {
        var curr = this.grid[this.end[0]][this.end[1]];
        this.path.unshift({i: curr.i, j: curr.j});

        while(curr.prev) {
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
        nodes.forEach((item) => {
            this.grid[item.i][item.j].setCost(item.value);
            this.costs.push(item);
        });
    }

}

export default Map;

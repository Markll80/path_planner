class Node {
    
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.children = [];
        this.cost = 1;
        this.prev = null;
        this.value;
        this.pathLength = Infinity;
        this.explored = false;
    }

    addChild = (child) => {
        this.children.push(child);
        // console.log(`i: ${child.i}, j: ${child.j}`);
    }

    // isChild = (node) => {
    //     if(this.children.includes(node)) {
    //         return true;
    //     }
    //     return false;
    // }

    setCost = (cost) => {
        this.cost = cost;
    }

    calculateDistance = (endI, endJ) => {
        // this.dist = (endI - this.i)^2 + (endJ - this.j)^2;
        this.dist = Math.sqrt(Math.pow(endI - this.i, 2) + Math.pow(endJ - this.j, 2));
        // if(this.i == 1 && this.j == 0) {
        //     console.log(`1: ${endI}, 2: ${endJ}`);
        // }; 
        return this.dist;
    }

    calculateValue = () => {
        this.value = this.cost + this.dist;
        this.accum = this.value;
        return this.value;
    }

    calculateValue = (endI, endJ) => {
        // this.value = this.cost + this.calculateDistance(endI, endJ);
        // this.accum = this.value;
        this.value = this.pathLength + this.calculateDistance(endI, endJ);
        return this.value;
    }

    addPathLength = (parent) => {
        // this.pathLength = this.cost + prevPathLength;
        const newPathLength = this.cost + parent.pathLength;
        // newPathLength < this.pathLength ? this.pathLength = newPathLength : null;
        // console.log(newPathLength);
        if(newPathLength < this.pathLength) {
            // console.log('innewpathlenght');
            // console.log('check');
            this.pathLength = newPathLength;
            this.prev = parent;
        }
    }

    initPathLength = () => {
        this.pathLength = 0;
    }

    setPrev = (prev) => {
        this.prev = prev;
    }

    setExplored = () => {
        this.explored = true;
    }
    
};

export default Node;
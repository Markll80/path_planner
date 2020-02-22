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
    }

    setCost = (cost) => {
        this.cost = cost;
    }

    // Pythagorean theorem
    calculateDistance = (endI, endJ) => {
        this.dist = Math.sqrt(Math.pow(endI - this.i, 2) + Math.pow(endJ - this.j, 2));
        return this.dist;
    }

    calculateValue = () => {
        this.value = this.cost + this.dist;
        this.accum = this.value;
        return this.value;
    }

    calculateValue = (endI, endJ) => {
        this.value = this.pathLength + this.calculateDistance(endI, endJ);
        return this.value;
    }

    addPathLength = (parent) => {
        const newPathLength = this.cost + parent.pathLength;
        if(newPathLength < this.pathLength) {
            this.pathLength = newPathLength;
            this.prev = parent;
        }
    }

    initPathLength = () => {
        this.pathLength = 0;
        this.explored = true;
    }

    setPrev = (prev) => {
        this.prev = prev;
    }

    setExplored = () => {
        this.explored = true;
    }
    
};

export default Node;
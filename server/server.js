import express from 'express';
import bodyParser from 'body-parser';

import Map from './utils/Map';

class Server {
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.port = process.env.PORT || 5000;
        this.map;

        // this.app.listen(this.port, () => console.log(`**** Listening on http://localhost:${this.port}/`));
    }

    route() {
        this.app.listen(this.port, () => console.log(`**** Listening on http://localhost:${this.port}/`));

        // Handles request to change map
        this.app.post('/api/maps/', (req, res) => {
            const row = parseInt(req.body.row);
            const col = parseInt(req.body.col);
            
            // isNaN is used to handle empty input
            if(isNaN(row) || isNaN(col) || row <= 0 || col <= 0) {
                res.send({msg: 'Invalid Input', status: 403}).status(403);
            }
            else {
                this.map = new Map(row, col);
                this.map.setStart([0, 0]);
                this.map.setEnd([row-1, col-1]);
                this.map.begin();
                const paths = this.map.getPath();
                res.send({
                        mapWidth: col, 
                        mapHeight: row,
                        start: {i: 0, j: 0},
                        goal: {i: row-1, j: col-1},
                        paths: paths,
                        status: 201
                          
                }).status(201);
            }
        });

        // Handles request to change starting location
        this.app.post('/api/paths/start/', (req, res) => {
            const row = this.map.grid.length;
            const col = this.map.grid[0].length;
            const start = [parseInt(req.body.i), parseInt(req.body.j)];
            const goal = this.map.end;
            const costs = this.map.costs;
            if(
                isNaN(start[0]) ||
                isNaN(start[1]) ||
                start[0] < 0 || 
                start[0] >= this.map.grid.length ||
                start[1] < 0 || 
                start[1] >= this.map.grid[0].length
            ) {
                res.send({msg: 'Invalid Input', status: 403}).status(403);
            }
            else {
                this.map = new Map(row, col);
                this.map.setStart(start);
                this.map.setEnd(goal);
                this.map.setCost(costs);
                this.map.begin();
                const paths = this.map.getPath();
                res.send( {
                    i: this.map.start[0], 
                    j: this.map.start[1],
                    paths: paths,
                    status: 201
                }).status(201);
            }
        });

        // Handles request to change Eve's location
        this.app.post('/api/paths/goal/', (req, res) => {
            const row = this.map.grid.length;
            const col = this.map.grid[0].length;
            const start = this.map.start;
            const goal = [parseInt(req.body.i), parseInt(req.body.j)];
            const costs = this.map.costs;
            if( 
                isNaN(goal[0]) ||
                isNaN(goal[1]) ||
                goal[0] < 0 ||
                goal[0] >= this.map.grid.length ||
                goal[1] < 0 ||
                goal[1] >= this.map.grid[0].length
            ) {
                res.send({msg: 'Invalid Input', status: 403}).status(403);
            }
            this.map = new Map(row, col);
            this.map.setStart(start);
            this.map.setEnd(goal);
            this.map.setCost(costs);
            this.map.begin();
            const paths = this.map.getPath();
            res.send({
                i: this.map.end[0], 
                j: this.map.end[1],
                paths: paths,
                status: 201
            }).status(201);
        });

        // Handles request to add obstacles
        this.app.post('/api/costs/', (req, res) => {
            const row = this.map.grid.length;
            const col = this.map.grid[0].length;
            const start = this.map.start;
            const goal = this.map.end;
            const costs = this.map.costs;
            const JSONArray = req.body.input.split('|');
            JSONArray.forEach((item) => {
                try {
                    const obj = JSON.parse(item);
                    obj.i = parseInt(obj.i);
                    obj.j = parseInt(obj.j);
                    obj.value = parseInt(obj.value);
                    if(
                        isNaN(obj.i) ||
                        isNaN(obj.i) ||
                        isNaN(obj.value) ||
                        obj.i < 0 ||
                        obj.i >= this.map.grid.length ||
                        obj.j < 0 ||
                        obj.j >= this.map.grid[0].length ||
                        obj.value <= 0
                    ) {
                        res.send({msg: 'Invalid Input', status: 403})
                    }

                    const filteredCosts = costs.filter((costsItem) => {
                        if(costsItem.i === obj.i && costsItem.j === obj.j) {
                            costsItem.value = obj.value;
                            return true;
                        };
                        return false;
                    });

                    filteredCosts.length === 0 ? costs.push(obj) : null;

                } catch(error) {
                    console.error(error);
                    res.send({msg: 'Invalid Input', status: 403}).status(403);
                    return;
                }
            });

            this.map = new Map(row, col);
            this.map.setStart(start);
            this.map.setEnd(goal);
            this.map.setCost(costs);
            this.map.begin();
            const paths = this.map.getPath();
            res.send({
                costs: this.map.costs,
                paths: paths,
                status: 201
            }).status(201);
        })

        // Handles request to get shortest paths from starting location to the goal.
        this.app.get('/api/paths', async (req, res) => {
            this.map.begin();
            const paths = this.map.getPath();
            res.send({steps: paths.length - 1, paths: paths}).status(200);
        })
    }
}

export default Server;
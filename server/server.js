import express from 'express';
import bodyParser from 'body-parser';

// const app = express();
// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get('/express_backend', (req, res) => {
//      res.send({express: 'what'});
// });
import Map from '../utils/Map';

class Server {
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.port = process.env.PORT || 5000;
        this.map;

        this.app.listen(this.port, () => console.log(`**** Listening on http://localhost:${this.port}/`));
    }

    route() {
        this.app.get('/wocao', (req, res) => {
            res.send({express: 'what'});
        });
        // this.app.get('/api/maps/', (req, res) => {

        // });
        this.app.post('/api/maps/', (req, res) => {
            // console.log(req.body.row);
            this.map = new Map(parseInt(req.body.row), parseInt(req.body.col));
            const row = this.map.grid.length;
            const col = row == 0 ? 0 : this.map.grid[0].length
            res.send({mapWidth: row, mapHeight: col}).status(200);
            // res.sendStatus(200);
        });
        this.app.post('/api/paths/start/', (req, res) => {
            this.map.setStart([parseInt(req.body.i), parseInt(req.body.j)]);
            res.send({i: this.map.start[0], j: this.map.start[1]}).status(200);
        });
        this.app.post('/api/paths/goal/', (req, res) => {
            this.map.setEnd([parseInt(req.body.i), parseInt(req.body.j)]);
            res.send({i: this.map.end[0], j: this.map.end[1]}).status(200);
        });
        this.app.post('/api/costs/', (req, res) => {
            this.map.setCost(req.body);
            res.send({express: 'cost changed'}).status(200);
        })
        this.app.get('/api/paths', async (req, res) => {
            this.map.begin();
            // setTimeout(() => {
            //     const paths = this.map.getPath();
            //     res.send({steps: paths.length - 1, paths: paths}).status(200);
            // }, 2000); 
            const paths = this.map.getPath();
            res.send({steps: paths.length - 1, paths: paths}).status(200);
        })
    }
}

export default Server;
import Server from './server/server'
// import express from 'express';
// import bodyParser from 'body-parser';


// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Listening on port ${port}`));


// app.post('/wocao', (req, res) => {
//     console.log(req.body);
//     res.send({express: 'hahaha'});
// });

// app.get('/wocao', (req, res) => {
//     res.send({express: 'what'});
// });
// const m = new Map(5,5);
// m.setStart([0,0]);
// m.setEnd([4,4]);
// m.setCost([{i: 4, j: 3, cost:10}]);
// m.begin();
// m.printPath();
// console.log(m.path);
// console.log(m.grid);

const server = new Server();
server.route();
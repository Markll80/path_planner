import { PORT } from '../constants/constants';

const Adapter = {
    createMap: async (row, col) => {
        const res = await fetch('/api/maps/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({row: row, col: col})
        });
        const msg = await res.json();
        // console.log(body);
        return msg;
    },
    createStart: async (i, j) => {
        const res = await fetch('/api/paths/start/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({i: i, j: j})
        });
        const msg = await res.json();
        return msg;
    },
    createGoal: async (i, j) => {
        const res = await fetch('/api/paths/goal/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({i: i, j: j})
        });
        const msg = await res.json();
        return msg;
    },
    createCost: async (nodes) => {
        const res = await fetch('/api/costs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nodes),
        });
        const msg = await res.json();
        return msg;
    },
    getPath: async () => {
        const res = await fetch('/api/paths', {
            method: 'GET'
        });
        const msg = await res.json();
        return msg;
    }
};

export default Adapter;
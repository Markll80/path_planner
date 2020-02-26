import Map from '../utils/Map';

test('Should create new map', () => {
    for(var i = 1; i < 20; i++) {
        for(var j = 1; j < 20; j++) {
            const map = new Map(i, j);
            expect(map.grid.length).toBe(i);
            expect(map.grid[0].length).toBe(j);
            expect(map.start[0]).toBe(0);
            expect(map.start[1]).toBe(0);
            expect(map.end[0]).toBe(i-1);
            expect(map.end[1]).toBe(j-1);
        }
    }
});

test('Should return path', () => {
    for(var i = 1; i < 20; i++) {
        for(var j = 1; j < 20; j++) {
            const map = new Map(i, j);
            map.begin();
            const ret = map.getPath();
            // console.log(i + ' ' + j);
            expect(ret.length).toBe(i + j - 1);
        }
    }
});

test('Should set costs', () => {
    const map = new Map(7, 8);
    map.setCost([{i: 1, j: 2, value: 10}, {i: 0, j: 0, value: 10}, {i: 6, j: 7, value: 10}, {i: 6, j: 7, value: 10}]);
    expect(map.costs.length).toBe(3);
    map.setCost([{i: 1, j:2, value: 15}]);
    expect(map.costs[0].value).toBe(15);
})

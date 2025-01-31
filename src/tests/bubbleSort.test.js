const bubbleSort = require('../scripts/algorithms/bubbleSort');

test('descend order sequence', () => {
    bubbleSort([3, 2, 1]).toEqual([['swap', 'arr[0]', 'arr[1]'],
    ['swap', 'arr[2]', 'arr[3]'],
    ['swap', 'arr[0]', 'arr[1]']]);
});
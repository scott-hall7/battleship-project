import Gameboard from '../gameboard';
import Ship from '../ship' 

test('tests placeship', () => {
    const player1Gameboard = Gameboard('player');
    let newShip = Ship(5);
    expect(player1Gameboard.placeShip(newShip, [1,1], true)).toStrictEqual([[1,1],[1,2],[1,3],[1,4],[1,5]]);
});
    
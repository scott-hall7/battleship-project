import Gameboard from '../gameboard';
import Ship from '../ship' 

test('tests placeShip function', () => {
    const testGameboard = Gameboard('test');
    testGameboard.initialize();
    const testShip = Ship(5);
    expect(testGameboard.placeShip(testShip, 1, 1, true)).toBeTruthy()
});

test('tests placeShip function when ship has neighboring coordinates', () => {
    const testGameboard = Gameboard('test');
    testGameboard.initialize();

    const testShip1 = Ship(5);
    testGameboard.placeShip(testShip1, 1, 1, true)

    const testShip2 = Ship(3);
    expect(testGameboard.placeShip(testShip2, 2, 1, true)).toBeFalsy()
});

test('tests placeShipsRandomly function', () => {
    const testGameboard = Gameboard('test');
    testGameboard.initialize();
    testGameboard.placeShipsRandomly();
    let count = 0;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(testGameboard.grid[i][j] != null) count++;
        }
    }
    expect(count).toBe(17)
});

test('tests receiveAttack function', () => {
    const testGameboard = Gameboard('test');
    testGameboard.initialize();

    const testShip = Ship(4)
    testGameboard.placeShip(testShip, 1, 1, false)

    testGameboard.receiveAttack(1,1);
    testGameboard.receiveAttack(1,2);
    testGameboard.receiveAttack(1,3);
    testGameboard.receiveAttack(1,4);

    expect(testShip.isSunk()).toBeTruthy();
});

test('tests allSunkfunction', () => {
    const testGameboard = Gameboard('test');
    testGameboard.initialize();

    const testShip = Ship(1)
    testGameboard.placeShip(testShip, 1, 1, false)

    testGameboard.receiveAttack(1,1);

    expect(testGameboard.allSunk()).toBeTruthy();
});



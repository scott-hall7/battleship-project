import Ship from '../ship'; 

test('tests ship length', () => {
    expect(Ship(5).length).toBe(5);
});

test('tests ship status', () => {
    expect(Ship(5).isSunk()).toBeFalsy();;
});

test('tests ship status after receiving hits', () => {
    const newShip = Ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBeTruthy();
});



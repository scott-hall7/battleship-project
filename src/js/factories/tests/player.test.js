import Player from '../player';
import Gameboard from '../gameboard';

test('attacks other gameboard', () => {
    const newPlayer = Player('New Player')
    const enemyGameboard = Gameboard('Enemy')
    enemyGameboard.initialize();
    newPlayer.attackEnemy(1,1,enemyGameboard)

    let missedShotsCount = 0;
    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++)    {
            if (enemyGameboard.missedShots[i][j] === true) missedShotsCount++;
        }
    }
    expect(missedShotsCount).toBe(1);
});

test('attacks random attack', () => {
    const newPlayer = Player('New Player')
    const enemyGameboard = Gameboard('Enemy')
    enemyGameboard.initialize();
    newPlayer.randomAttack(enemyGameboard);
    expect(newPlayer.attackedCoordinates.length).toBe(1);
});



test('hasAttacked function', () => {
    const newPlayer = Player('New Player')
    const enemyGameboard = Gameboard('Enemy')
    enemyGameboard.initialize();
    newPlayer.attackEnemy(1,1,enemyGameboard)

    expect(newPlayer.hasAttacked(1,1)).toBeTruthy();
});

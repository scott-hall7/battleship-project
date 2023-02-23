import Ship from "./ship";

const Gameboard = (player) => {

    const gameboardName = player;
    const grid = [];
    const missedShots = [];

    const initialize = () =>    {
        for (let i = 0; i < 10; i++) {
            grid[i] = []
            missedShots[i] = []
            for (let j = 0; j < 10; j++) {
                grid[i][j] = null
                missedShots[i][j] = false
            }
        }
    }

    const placeShip = (ship, row, column, isVertical) =>    {
        if(!checkCoordinate(ship, row, column, isVertical)) return false;

        if(isVertical){
            for(let i = 0; i < ship.length; i++) {
                grid[row + i][column] = ship;
            }
        } else {
            for(let i = 0; i < ship.length; i++) {
                grid[row][column + i] = ship;
            }
       }
       return true;
    }

    const placeShipsRandomly = () => {
        const allShips = [];
        const carrier = Ship(5, 'carrier');
        const battleship = Ship(4, 'battleship');
        const cruiser = Ship(3, 'cruiser');
        const submarine = Ship(3, 'submarine');
        const destroyer = Ship(2, 'destroyer');
        allShips.push(carrier, battleship, cruiser, submarine, destroyer)

        let successfulPlacements = 0;

        while (successfulPlacements < 5){
            const row = Math.floor(Math.random() * 10);
            const column = Math.floor(Math.random() * 10);
            let isVertical = Math.random() < 0.5;

            if(placeShip(allships[successfulPlacements], row, column, isVertical)) succesfulPlacements++;
        }

        
    }

    const receiveAttack = (row, column) =>   {
        if(grid[row][column]) grid[row][column].hit();
        else missedShots[row][column] = true;
    }

    const allSunk = () =>   {
        for (let i = 0; i < 10; i++)    {
            for(let j = 0; j < 10; j++) {
                if(grid[i][j])  {
                    if(grid[i][j].isSunk() === false) return false;
                }
            }
        }
        return true;
    }

    //  Helper functions
    function checkCoordinate(ship, row, column, isVertical)    {

        //  Check within gameboard border
        if (isVertical){
            if(row + ship.length > 9) return false;
        } else {
            if(column + ship.length > 9) return false;
        }

        //  Check is ship field is already taken
        if (isVertical){
            for(let i = 0; i < ship.length; i++)    {
                if(grid[row + i][column] !== null) return false;
            }
        } else {
            for(let i = 0; i < ship.length; i++)    {
                if(grid[row][column + i] !== null) return false;
            }
        }

        //  Checks adjacent grid fields
        if(isVertical) {
            for(let i = 0; i < ship.length; i++){
                for(let xTest = -1; xTest <= 1; xTest++){
                    for(let yTest = -1; yTest <= 1; yTest++){
                        if(grid[row + xTest + i][column + yTest] === ship) continue;
                        if(grid[row + xTest + i][column + yTest] != null) return false;
                    }
                }
            }
        } else {
            for(let i = 0; i < ship.length; i++){
                for(let yTest = -1; yTest <= 1; yTest++){
                    for(let xTest = -1; xTest <= 1; xTest++){
                        
                        if(grid[row + xTest][column + yTest + i] === ship) continue;
                        if(grid[row + xTest][column + yTest + i] != null) return false;
                    }
                }
            }
        }
        return true;
    }

    return {gameboardName, initialize, placeShip, placeShipsRandomly, receiveAttack, allSunk}
}

export default Gameboard;
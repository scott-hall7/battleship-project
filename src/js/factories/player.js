import Gameboard from "./gameboard";

const Player = (playerName) =>    {

    const name = playerName;
    const attackedCoordinates = [];
    
    const attackEnemy = (row, column, gameboard) =>  {
        if(hasAttacked(row, column)) return;

        attackedCoordinates.push([row, column])
        gameboard.receiveAttack(row, column)
    }

    const randomAttack = (gameboard) => {
        let rowAttack = Math.floor(Math.random() * 10)
        let columnAttack = Math.floor(Math.random() * 10)

        while(hasAttacked(rowAttack, columnAttack)) {
            rowAttack = Math.floor(Math.random() * 10)
            columnAttack = Math.floor(Math.random() * 10)
        }

        attackEnemy(rowAttack, columnAttack, gameboard)
    }

    const hasAttacked = (row, column)  => {
        for(let i = 0; i < attackedCoordinates.length; i++) {
            if(attackedCoordinates[i][0] === row && attackedCoordinates[i][1] === column) return true;
        }
        return false;
    }

    return {name, attackedCoordinates, attackEnemy, randomAttack, hasAttacked}
}

export default Player;
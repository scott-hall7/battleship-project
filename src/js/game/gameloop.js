import { startScreenFunctions, displayGameboard, game } from "./startscreen"


export const gameLoop = () =>  {
    let playerStorage = [];
    let gameboardStorage = [];

    function loadPlayingGameboards()   {
        const gameboards = gameboardStorage;
        const playerGameboard = document.getElementById('player-gameboard');
        const computerGameboard = document.getElementById('computer-gameboard');
        
        for(let i = 0; i < gameboards.length; i++)   {
            if(gameboards[i].gameboardName === "Player")    {
                displayGameboard(gameboards[i], playerGameboard);
            } else  {
                displayGameboard(gameboards[i], computerGameboard);
                addClickFunction(gameboards[i], computerGameboard);
            }
        }
    }

    function addClickFunction(gameboard, domGameboard)  {
        const cells = domGameboard.querySelectorAll('.square');
        cells.forEach(cell =>   {
            cell.addEventListener('click', e => {
                let row = e.target.getAttribute('data-x') * 1;
                let column = e.target.getAttribute('data-y') * 1;
                userAttack(playerStorage[0], row, column, gameboard);
            })
        })
    }

    function userAttack(playerUser, row, column, enemyGameboard) {
        playerUser.attackEnemy(row, column, enemyGameboard);
        checkIfWinner(playerUser, enemyGameboard);
        computerAttack(playerStorage[1], gameboardStorage[0]);
    }
    
    let nextComputerAttack = [];
    function computerAttack(computerUser, enemyGameboard){
        if(nextComputerAttack.length === 0) {
            computerUser.randomAttack(enemyGameboard);
            const lastAttack = computerUser.attackedCoordinates[computerUser.attackedCoordinates.length - 1];
            const row = lastAttack[0];
            const column = lastAttack[1];
            if(enemyGameboard.grid[row][column])   {
                let attackedShip = enemyGameboard.grid[lastAttack[0]][lastAttack[1]];
                if(attackedShip.isVertical) {
                    for(let i = ((attackedShip.length - 1) * -1); i < attackedShip.length; i++ )   {
                        if (i != 0 && row + i < 10 && row + i > -1 && !computerUser.attackedCoordinates.includes([row + i, column])) nextComputerAttack.push([row + i, column]);
                    }
                } else  {
                    for(let i = ((attackedShip.length - 1) * -1); i < attackedShip.length; i++ )   {
                        if (i != 0 && column + i < 10 && column + i > -1 && !computerUser.attackedCoordinates.includes([row, column + i])) nextComputerAttack.push([row, column + i]);
                    } 
                }
            }
        } else  {
            const nextAttack = nextComputerAttack.shift();
            const nextAttackRow = nextAttack[0];
            const nextAttackColumn = nextAttack[1];
            computerUser.attackEnemy(nextAttackRow, nextAttackColumn, enemyGameboard);

            if(enemyGameboard.grid[nextAttackRow][nextAttackColumn] && enemyGameboard.grid[nextAttackRow][nextAttackColumn].isSunk())   {
                nextComputerAttack = [];
            }  
        }
        checkIfWinner(computerUser,enemyGameboard);
    }

    function checkIfWinner(currentUser, enemyGameboard)   {
        if(enemyGameboard.allSunk()) {
            endGameDisplay(currentUser);
        }
        else updateGameboardDisplay(currentUser, enemyGameboard);
    }

    function updateGameboardDisplay(currentUser, enemyGameboard)  {
        const recentAttack = currentUser.attackedCoordinates[currentUser.attackedCoordinates.length - 1];
        const row = recentAttack[0];
        const column = recentAttack[1];
    
        const playerGameboardCells = document.getElementById('player-gameboard').querySelectorAll('.square');
        const computerGameboardCells = document.getElementById('computer-gameboard').querySelectorAll('.square');
        const currentGameboardCells = (currentUser.name === "Player") ? computerGameboardCells : playerGameboardCells;
    
    
        currentGameboardCells.forEach(cell =>  {
            let x = cell.getAttribute('data-x') * 1;
            let y = cell.getAttribute('data-y') * 1;
            if (x === row && y === column) {
                if(enemyGameboard.grid[row][column]) cell.classList.add('hit-shot');
                else cell.classList.add('missed-shot');
                return;
            }
        })
    }


    return {playerStorage, gameboardStorage, loadPlayingGameboards}
}

function endGameDisplay(winner)    {
    const endModal = document.getElementById('end-modal');
    endModal.style.display = "flex";

    const winningText = document.getElementById("winning-text");
    winningText.textContent = `${winner.name} wins!`;

    const playingGameboards = document.querySelectorAll(".playing-gameboard");
    playingGameboards.forEach(gameboard =>  {
        gameboard.classList.add("disableCursor");
    })

    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', () => {
        resetGame();
        endModal.style.display = "none";
        const playingScreen = document.getElementById('playing-screen');
        playingScreen.style.display = "none";
        playingGameboards.forEach(gameboard =>  {
            gameboard.classList.remove("disableCursor");
        })
    })
}

function resetGame()    {
    game.playerStorage = [];
    game.gameboardStorage = [];
    const startingGameboard = document.getElementById('starting-gameboard');
    startingGameboard.remove();
    startScreenFunctions();
}
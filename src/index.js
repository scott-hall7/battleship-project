import './styles/modal.scss';
import './styles/body.scss';
import Gameboard from './js/factories/gameboard';
import Ship from './js/factories/ship'
import Player from './js/factories/player'


//Start Screen Functions
let playerStorage = [];
let gameboardStorage = [];

startScreenFunctions();

function startScreenFunctions() {
    const startScreen = document.getElementById('start-screen')
    startScreen.style.display = "flex";

    const startingGameboard = document.createElement('div');
    startingGameboard.setAttribute("id", "starting-gameboard");
    startScreen.appendChild(startingGameboard)

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', beginGame);

    loadPlayers();
}

function loadPlayers() {
    const newPlayer = Player('Player');
    const computerPlayer = Player('Computer')
    playerStorage.push(newPlayer, computerPlayer)

    loadGameboards(newPlayer, computerPlayer)
}

function loadGameboards(player, computer) {
    const newPlayerGameboard = Gameboard(`${player.name}`);
    const computerGameboard = Gameboard(`${computer.name}`);

    newPlayerGameboard.initialize();
    newPlayerGameboard.placeShipsRandomly();

    computerGameboard.initialize();
    computerGameboard.placeShipsRandomly();

    gameboardStorage.push(newPlayerGameboard)
    gameboardStorage.push(computerGameboard)

    const startingGameboard = document.getElementById('starting-gameboard');
    displayGameboard(newPlayerGameboard, startingGameboard);
}

//  Dom Elements
function displayGameboard(gameboard, domGameboard) {
    domGameboard.innerHTML = "";

    for(let row = 0; row < 10; row++) {
        for(let column = 0; column < 10; column++)  {
            let newSquare = document.createElement('div');
            newSquare.className = 'square';
            newSquare.dataset.x = row;
            newSquare.dataset.y = column;
            if(gameboard.gameboardName === "Player" && gameboard.grid[row][column]) {
                if(domGameboard.id === 'starting-gameboard'){
                    newSquare.classList.add('occupied');
                    newSquare.addEventListener('click', e =>   {
                        findActiveShip(e.target, gameboard, domGameboard);
                    })
                } else {
                    newSquare.classList.add('locked-occupied');
                }
            }
            domGameboard.appendChild(newSquare);
        }
    }
}

function findActiveShip(cell, gameboard, startingGameboard)    {
    let row = cell.getAttribute('data-x')
    let column = cell.getAttribute('data-y')
    let activeShip = gameboard.grid[row][column];
    toggleRotateButton(activeShip);

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(gameboard.grid[i][j] === activeShip) gameboard.grid[i][j] = null;
        }
    }
    displayGameboard(gameboard, startingGameboard);
    selectNewPosition(activeShip, gameboard);
}

function selectNewPosition(activeShip, gameboard){
    const occupiedPositions = document.querySelectorAll('.occupied')
    occupiedPositions.forEach(cell => cell.style.pointerEvents = "none");

    const startButton = document.getElementById('start-button');
    startButton.style.pointerEvents = "none";

    const startingGameboard = document.getElementById('starting-gameboard');
    const startingGameboardCells = startingGameboard.querySelectorAll('.square')

    startingGameboardCells.forEach(cell =>    {
        let row = cell.getAttribute('data-x') * 1;
        let column = cell.getAttribute('data-y') * 1;

        cell.addEventListener('mouseover', () =>    {
            if(gameboard.checkCoordinate(activeShip, row, column, activeShip.isVertical))   {
                cell.addEventListener('click', () => {
                    gameboard.placeShip(activeShip,row,column)
                    displayGameboard(gameboard, startingGameboard)
                    startButton.style.pointerEvents = "auto";
                })
                if(activeShip.isVertical)   {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row + i) + "][data-y=" + CSS.escape(column) + "]");
                        if(additionalCell) additionalCell.classList.add('placement-hover')
                    }
                } else  {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + i) + "]");
                        if(additionalCell) additionalCell.classList.add('placement-hover')
                    }
                }
            } else  {
                if(activeShip.isVertical)   {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row + i) + "][data-y=" + CSS.escape(column) + "]");
                        if(additionalCell) additionalCell.classList.add('no-placement-hover')
                    }
                } else  {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + i) + "]");
                        if(additionalCell) additionalCell.classList.add('no-placement-hover')
                    }
                }
                
            }
        });

        cell.addEventListener('mouseout', () =>    {
            for(let i = 0; i < startingGameboardCells.length; i++)  {
                startingGameboardCells[i].classList.remove('placement-hover')
                startingGameboardCells[i].classList.remove('no-placement-hover')
            }
        });
    }) 
}



function toggleRotateButton(ship)   {
    if (document.getElementById('rotate-button')){
        const rotateButton = document.getElementById('rotate-button')
        rotateButton.remove();
    }
    const rotateButton = document.createElement('button');
    rotateButton.id = "rotate-button";
    rotateButton.classList.add('button');
    rotateButton.textContent = "Rotate Button"
    rotateButton.addEventListener('click', () =>    {
        rotateCurrentShip(ship)
    })

    const startScreenButtons = document.getElementById('start-screen-buttons')
    startScreenButtons.appendChild(rotateButton);
}

function rotateCurrentShip(ship)    {
    ship.isVertical = !ship.isVertical;
}

function beginGame()    {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = "none";

    const playingScreen = document.getElementById('playing-screen')
    playingScreen.style.display = "flex";
    
    const game = gameloop();
    game.loadPlayingGameboards();
}

//  Playing Screen Functions
const gameloop = () =>  {
    function loadPlayingGameboards()   {
        const gameboards = gameboardStorage;
        const playerGameboard = document.getElementById('player-gameboard')
        const computerGameboard = document.getElementById('computer-gameboard')
        
        for(let i = 0; i < gameboards.length; i++)   {
            if(gameboards[i].gameboardName === "Player")    {
                displayGameboard(gameboards[i], playerGameboard)
            } else  {
                displayGameboard(gameboards[i], computerGameboard) 
                addClickFunction(gameboards[i], computerGameboard)
            }
        }
    }

    function addClickFunction(gameboard, domGameboard)  {
        const cells = domGameboard.querySelectorAll('.square');
        cells.forEach(cell =>   {
            cell.addEventListener('click', e => {
                let row = e.target.getAttribute('data-x') * 1;
                let column = e.target.getAttribute('data-y') * 1;
                userAttack(playerStorage[0], row, column, gameboard)
            })
        })
    }

    function userAttack(playerUser, row, column, enemyGameboard) {
        playerUser.attackEnemy(row, column, enemyGameboard)
        checkIfWinner(playerUser, enemyGameboard);
        computerAttack(playerStorage[1], gameboardStorage[0])
    }
    
    let nextComputerAttack = [];
    function computerAttack(computerUser, enemyGameboard){
        if(nextComputerAttack.length === 0) {
            computerUser.randomAttack(enemyGameboard)
            const lastAttack = computerUser.attackedCoordinates[computerUser.attackedCoordinates.length - 1];
            const row = lastAttack[0]
            const column = lastAttack[1]
            if(enemyGameboard.grid[row][column])   {
                let attackedShip = enemyGameboard.grid[lastAttack[0]][lastAttack[1]];
                if(attackedShip.isVertical) {
                    for(let i = ((attackedShip.length - 1) * -1); i < attackedShip.length; i++ )   {
                        if (i != 0 && row + i < 10 && row + i > -1 && !computerUser.attackedCoordinates.includes([row + i, column])) nextComputerAttack.push([row + i, column])
                    }
                } else  {
                    for(let i = ((attackedShip.length - 1) * -1); i < attackedShip.length; i++ )   {
                        if (i != 0 && column + i < 10 && column + i > -1 && !computerUser.attackedCoordinates.includes([row, column + i])) nextComputerAttack.push([row, column + i])
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
        console.log(currentUser, enemyGameboard.name)
        if(enemyGameboard.allSunk()) {
            endGameDisplay(currentUser)
        }
        else updateGameboardDisplay(currentUser, enemyGameboard)
    }


    return {loadPlayingGameboards}
}

function updateGameboardDisplay(currentUser, enemyGameboard)  {
    const recentAttack = currentUser.attackedCoordinates[currentUser.attackedCoordinates.length - 1];
    const row = recentAttack[0];
    const column = recentAttack[1]

    const playerGameboardCells = document.getElementById('player-gameboard').querySelectorAll('.square')
    const computerGameboardCells = document.getElementById('computer-gameboard').querySelectorAll('.square')
    const currentGameboardCells = (currentUser.name === "Player") ? computerGameboardCells : playerGameboardCells;


    currentGameboardCells.forEach(cell =>  {
        let x = cell.getAttribute('data-x') * 1;
        let y = cell.getAttribute('data-y') * 1;
        if (x === row && y === column) {
            if(enemyGameboard.grid[row][column]) cell.classList.add('hit-shot')
            else cell.classList.add('missed-shot')
            return;
        }
    })
}




//  End Game Modal
function endGameDisplay(winner)    {
    const endModal = document.getElementById('end-modal')
    endModal.style.display = "flex";

    const winningText = document.getElementById("winning-text")
    winningText.textContent = `${winner.name} wins!`

    const playingGameboards = document.querySelectorAll(".playing-gameboard")
    playingGameboards.forEach(gameboard =>  {
        gameboard.classList.add("disableCursor")
    })

    const resetButton = document.getElementById('reset-button')

    resetButton.addEventListener('click', () => {
        resetGame();
        endModal.style.display = "none";
        const playingScreen = document.getElementById('playing-screen')
        playingScreen.style.display = "none";
        playingGameboards.forEach(gameboard =>  {
            gameboard.classList.remove("disableCursor")
        })
    })
}

function resetGame()    {
    playerStorage = [];
    gameboardStorage = [];
    const startingGameboard = document.getElementById('starting-gameboard');
    startingGameboard.remove();
    startScreenFunctions();
}
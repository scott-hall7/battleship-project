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
    for(let row = 0; row < 10; row++) {
        for(let column = 0; column < 10; column++)  {
            let newSquare = document.createElement('div');
            newSquare.className = 'square';
            newSquare.dataset.x = row;
            newSquare.dataset.y = column;

            if(gameboard.gameboardName === "Player" && gameboard.grid[row][column]) newSquare.classList.add('occupied');
        
            domGameboard.appendChild(newSquare)
        }
    }
}

function beginGame()    {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.display = "none";

    const playingScreen = document.getElementById('playing-screen')
    playingScreen.style.display = "flex";
    loadPlayingGameboards();
}



//  Playing Screen Functions
function loadPlayingGameboards()   {
    const gameboards = gameboardStorage;
    const playerGameboard = document.getElementById('player-gameboard')
    const computerGameboard = document.getElementById('computer-gameboard')
    
    for(let i = 0; i < gameboards.length; i++)   {
        /*  !!! --- Updated below to switch */
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
    randomComputerAttack(playerStorage[1],gameboardStorage[0])
}

function randomComputerAttack(computerUser, enemyGameboard){
    computerUser.randomAttack(enemyGameboard)
    checkIfWinner(computerUser,enemyGameboard);
}

function checkIfWinner(currentUser, enemyGameboard)   {
    if(enemyGameboard.allSunk()) {
        endGameDisplay(currentUser)
    }
    else updateGameboardDisplay(currentUser, enemyGameboard)
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
            gameboard.innerHTML = "";
        })
    })
}

function resetGame()    {
    playerStorage = [];
    gameboardStorage = [];
    const startingGameboard = document.getElementById('starting-gameboard');
    startingGameboard.remove();
    startScreenFunctions();
    //
}
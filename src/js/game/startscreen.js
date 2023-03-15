import { gameLoop } from "./gameloop";
import Gameboard from '../factories/gameboard';
import Player from "../factories/player"

export let game;
export function startScreenFunctions() {
    game = gameLoop();
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
    game.playerStorage.push(newPlayer, computerPlayer)

    loadGameboards(newPlayer, computerPlayer)
}

function loadGameboards(player, computer) {
    const newPlayerGameboard = Gameboard(`${player.name}`);
    const computerGameboard = Gameboard(`${computer.name}`);

    newPlayerGameboard.initialize();
    newPlayerGameboard.placeShipsRandomly();

    computerGameboard.initialize();
    computerGameboard.placeShipsRandomly();

    game.gameboardStorage.push(newPlayerGameboard, computerGameboard)

    const startingGameboard = document.getElementById('starting-gameboard');
    displayGameboard(newPlayerGameboard, startingGameboard);
}

function findActiveShip(cell, gameboard, startingGameboard)    {
    let row = cell.getAttribute('data-x');
    let column = cell.getAttribute('data-y');
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
    const occupiedPositions = document.querySelectorAll('.occupied');
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
                    gameboard.placeShip(activeShip,row,column);
                    displayGameboard(gameboard, startingGameboard);
                    startButton.style.pointerEvents = "auto";
                })
                if(activeShip.isVertical)   {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row + i) + "][data-y=" + CSS.escape(column) + "]");
                        if(additionalCell) additionalCell.classList.add('placement-hover');
                    }
                } else  {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + i) + "]");
                        if(additionalCell) additionalCell.classList.add('placement-hover');
                    }
                }
            } else  {
                if(activeShip.isVertical)   {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row + i) + "][data-y=" + CSS.escape(column) + "]");
                        if(additionalCell) additionalCell.classList.add('no-placement-hover');
                    }
                } else  {
                    for(let i = 0; i < activeShip.length; i++)  {
                        let additionalCell = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + i) + "]");
                        if(additionalCell) additionalCell.classList.add('no-placement-hover');
                    }
                }
                
            }
        });

        cell.addEventListener('mouseout', () =>    {
            for(let i = 0; i < startingGameboardCells.length; i++)  {
                startingGameboardCells[i].classList.remove('placement-hover');
                startingGameboardCells[i].classList.remove('no-placement-hover');
            }
        });
    }) 
}

function toggleRotateButton(ship)   {
    if (document.getElementById('rotate-button')){
        const rotateButton = document.getElementById('rotate-button');
        rotateButton.remove();
    }

    const rotateButton = document.createElement('button');
    rotateButton.id = "rotate-button";
    rotateButton.classList.add('button');
    rotateButton.textContent = "Rotate Ship";
    rotateButton.addEventListener('click', () =>    {
        rotateCurrentShip(ship);
    });

    const startScreenButtons = document.getElementById('start-screen-buttons');
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
    
    game.loadPlayingGameboards();
}

export function displayGameboard(gameboard, domGameboard) {
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
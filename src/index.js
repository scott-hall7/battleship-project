import './styles/modal.scss';
import './styles/body.scss';
import Gameboard from './js/factories/gameboard';
import Ship from './js/factories/ship'

//On Load
//const player1 = Player('Scott');
//const computer = Player('Computer');



let gameboard = document.getElementById("starting-gameboard")
let playerGameboard = document.getElementById("player-gameboard")
let computerGameboard = document.getElementById("computer-gameboard")


//  Dom Elements
const startButton = document.getElementById("start-button")
startButton.addEventListener("click", startGame);

function startGame()    {
    document.getElementById("start-modal").style.display = "none";
    document.getElementById("playing-modal").style.display = "flex";
}

for(let x = 1; x <= 10; x++) {
    for(let y = 1; y <= 10; y++)    {
        let newSquare = document.createElement("div"); 
        newSquare.classList.add("square")
        newSquare.dataset.x = x;
        newSquare.dataset.y = y;
        gameboard.appendChild(newSquare);
    }
}



const player1Gameboard = Gameboard('player')
player1Gameboard.initialize();
player1Gameboard.placeShipsRandomly();
console.log(player1Gameboard.grid)







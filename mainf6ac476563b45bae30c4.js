/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/factories/gameboard.js":
/*!***************************************!*\
  !*** ./src/js/factories/gameboard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/js/factories/ship.js");

var Gameboard = function Gameboard(player) {
  var gameboardName = player;
  var grid = [];
  var missedShots = [];
  var initialize = function initialize() {
    for (var i = 0; i < 10; i++) {
      grid[i] = [];
      missedShots[i] = [];
      for (var j = 0; j < 10; j++) {
        grid[i][j] = null;
        missedShots[i][j] = false;
      }
    }
  };
  var placeShip = function placeShip(ship, row, column) {
    if (!checkCoordinate(ship, row, column, ship.isVertical)) return false;
    if (ship.isVertical) {
      for (var i = 0; i < ship.length; i++) {
        grid[row + i][column] = ship;
      }
    } else {
      for (var _i = 0; _i < ship.length; _i++) {
        grid[row][column + _i] = ship;
      }
    }
    return true;
  };
  var placeShipsRandomly = function placeShipsRandomly() {
    var ships = [];
    var carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(5, Math.random() < 0.5);
    var battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(4, Math.random() < 0.5);
    var cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3, Math.random() < 0.5);
    var submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3, Math.random() < 0.5);
    var destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(2, Math.random() < 0.5);
    ships.push(carrier, battleship, cruiser, submarine, destroyer);
    var successfulPlacements = 0;
    while (successfulPlacements < 5) {
      var row = Math.floor(Math.random() * 10);
      var column = Math.floor(Math.random() * 10);
      if (placeShip(ships[successfulPlacements], row, column)) successfulPlacements++;
    }
  };
  var receiveAttack = function receiveAttack(row, column) {
    if (grid[row][column]) grid[row][column].hit();else missedShots[row][column] = true;
  };
  var allSunk = function allSunk() {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        if (grid[i][j]) {
          if (grid[i][j].isSunk() === false) return false;
        }
      }
    }
    return true;
  };

  //  Helper functions
  function checkCoordinate(ship, row, column, isVertical) {
    //  Check within gameboard border
    if (isVertical) {
      if (row + ship.length > 10) return false;
    } else {
      if (column + ship.length > 10) return false;
    }

    //  Check is ship field is already taken
    if (isVertical) {
      for (var i = 0; i < ship.length; i++) {
        if (grid[row + i][column] !== null) return false;
      }
    } else {
      for (var _i2 = 0; _i2 < ship.length; _i2++) {
        if (grid[row][column + _i2] !== null) return false;
      }
    }

    //  Checks adjacent grid fields
    if (isVertical) {
      for (var _i3 = 0; _i3 < ship.length; _i3++) {
        for (var xTest = -1; xTest <= 1; xTest++) {
          for (var yTest = -1; yTest <= 1; yTest++) {
            if (row + xTest + _i3 < 0 || row + xTest + _i3 > 9 || column + yTest < 0 || column + yTest > 9) continue;
            if (grid[row + xTest + _i3][column + yTest] === ship) continue;
            if (grid[row + xTest + _i3][column + yTest] != null) return false;
          }
        }
      }
    } else {
      for (var _i4 = 0; _i4 < ship.length; _i4++) {
        for (var _yTest = -1; _yTest <= 1; _yTest++) {
          for (var _xTest = -1; _xTest <= 1; _xTest++) {
            if (row + _xTest < 0 || row + _xTest > 9 || column + _yTest + _i4 < 0 || column + _yTest + _i4 > 9) continue;
            if (grid[row + _xTest][column + _yTest + _i4] === ship) continue;
            if (grid[row + _xTest][column + _yTest + _i4] != null) return false;
          }
        }
      }
    }
    return true;
  }
  return {
    gameboardName: gameboardName,
    grid: grid,
    missedShots: missedShots,
    initialize: initialize,
    placeShip: placeShip,
    placeShipsRandomly: placeShipsRandomly,
    receiveAttack: receiveAttack,
    checkCoordinate: checkCoordinate,
    allSunk: allSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/js/factories/player.js":
/*!************************************!*\
  !*** ./src/js/factories/player.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/js/factories/gameboard.js");

var Player = function Player(playerName) {
  var name = playerName;
  var attackedCoordinates = [];
  var attackEnemy = function attackEnemy(row, column, gameboard) {
    if (hasAttacked(row, column)) return;
    attackedCoordinates.push([row, column]);
    gameboard.receiveAttack(row, column);
  };
  var randomAttack = function randomAttack(gameboard) {
    var rowAttack = Math.floor(Math.random() * 10);
    var columnAttack = Math.floor(Math.random() * 10);
    while (hasAttacked(rowAttack, columnAttack)) {
      rowAttack = Math.floor(Math.random() * 10);
      columnAttack = Math.floor(Math.random() * 10);
    }
    attackEnemy(rowAttack, columnAttack, gameboard);
  };
  var hasAttacked = function hasAttacked(row, column) {
    for (var i = 0; i < attackedCoordinates.length; i++) {
      if (attackedCoordinates[i][0] === row && attackedCoordinates[i][1] === column) return true;
    }
    return false;
  };
  return {
    name: name,
    attackedCoordinates: attackedCoordinates,
    attackEnemy: attackEnemy,
    randomAttack: randomAttack,
    hasAttacked: hasAttacked
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/js/factories/ship.js":
/*!**********************************!*\
  !*** ./src/js/factories/ship.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(l, vertical) {
  var length = l;
  var isVertical = vertical;
  var hits = 0;
  var hit = function hit() {
    hits++;
  };
  var isSunk = function isSunk() {
    if (hits === length) return true;
    return false;
  };
  return {
    length: length,
    isVertical: isVertical,
    hits: hits,
    hit: hit,
    isSunk: isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/js/game/gameloop.js":
/*!*********************************!*\
  !*** ./src/js/game/gameloop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _startscreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startscreen */ "./src/js/game/startscreen.js");

var gameLoop = function gameLoop() {
  var playerStorage = [];
  var gameboardStorage = [];
  function loadPlayingGameboards() {
    var gameboards = gameboardStorage;
    var playerGameboard = document.getElementById('player-gameboard');
    var computerGameboard = document.getElementById('computer-gameboard');
    for (var i = 0; i < gameboards.length; i++) {
      if (gameboards[i].gameboardName === "Player") {
        (0,_startscreen__WEBPACK_IMPORTED_MODULE_0__.displayGameboard)(gameboards[i], playerGameboard);
      } else {
        (0,_startscreen__WEBPACK_IMPORTED_MODULE_0__.displayGameboard)(gameboards[i], computerGameboard);
        addClickFunction(gameboards[i], computerGameboard);
      }
    }
  }
  function addClickFunction(gameboard, domGameboard) {
    var cells = domGameboard.querySelectorAll('.square');
    cells.forEach(function (cell) {
      cell.addEventListener('click', function (e) {
        var row = e.target.getAttribute('data-x') * 1;
        var column = e.target.getAttribute('data-y') * 1;
        userAttack(playerStorage[0], row, column, gameboard);
      });
    });
  }
  function userAttack(playerUser, row, column, enemyGameboard) {
    playerUser.attackEnemy(row, column, enemyGameboard);
    checkIfWinner(playerUser, enemyGameboard);
    computerAttack(playerStorage[1], gameboardStorage[0]);
  }
  var nextComputerAttack = [];
  function computerAttack(computerUser, enemyGameboard) {
    if (nextComputerAttack.length === 0) {
      computerUser.randomAttack(enemyGameboard);
      var lastAttack = computerUser.attackedCoordinates[computerUser.attackedCoordinates.length - 1];
      var row = lastAttack[0];
      var column = lastAttack[1];
      if (enemyGameboard.grid[row][column]) {
        var attackedShip = enemyGameboard.grid[lastAttack[0]][lastAttack[1]];
        if (attackedShip.isVertical) {
          for (var i = (attackedShip.length - 1) * -1; i < attackedShip.length; i++) {
            if (i != 0 && row + i < 10 && row + i > -1 && !computerUser.attackedCoordinates.includes([row + i, column])) nextComputerAttack.push([row + i, column]);
          }
        } else {
          for (var _i = (attackedShip.length - 1) * -1; _i < attackedShip.length; _i++) {
            if (_i != 0 && column + _i < 10 && column + _i > -1 && !computerUser.attackedCoordinates.includes([row, column + _i])) nextComputerAttack.push([row, column + _i]);
          }
        }
      }
    } else {
      var nextAttack = nextComputerAttack.shift();
      var nextAttackRow = nextAttack[0];
      var nextAttackColumn = nextAttack[1];
      computerUser.attackEnemy(nextAttackRow, nextAttackColumn, enemyGameboard);
      if (enemyGameboard.grid[nextAttackRow][nextAttackColumn] && enemyGameboard.grid[nextAttackRow][nextAttackColumn].isSunk()) {
        nextComputerAttack = [];
      }
    }
    checkIfWinner(computerUser, enemyGameboard);
  }
  function checkIfWinner(currentUser, enemyGameboard) {
    if (enemyGameboard.allSunk()) {
      endGameDisplay(currentUser);
    } else updateGameboardDisplay(currentUser, enemyGameboard);
  }
  function updateGameboardDisplay(currentUser, enemyGameboard) {
    var recentAttack = currentUser.attackedCoordinates[currentUser.attackedCoordinates.length - 1];
    var row = recentAttack[0];
    var column = recentAttack[1];
    var playerGameboardCells = document.getElementById('player-gameboard').querySelectorAll('.square');
    var computerGameboardCells = document.getElementById('computer-gameboard').querySelectorAll('.square');
    var currentGameboardCells = currentUser.name === "Player" ? computerGameboardCells : playerGameboardCells;
    currentGameboardCells.forEach(function (cell) {
      var x = cell.getAttribute('data-x') * 1;
      var y = cell.getAttribute('data-y') * 1;
      if (x === row && y === column) {
        if (enemyGameboard.grid[row][column]) cell.classList.add('hit-shot');else cell.classList.add('missed-shot');
        return;
      }
    });
  }
  return {
    playerStorage: playerStorage,
    gameboardStorage: gameboardStorage,
    loadPlayingGameboards: loadPlayingGameboards
  };
};
function endGameDisplay(winner) {
  var endModal = document.getElementById('end-modal');
  endModal.style.display = "flex";
  var winningText = document.getElementById("winning-text");
  winningText.textContent = "".concat(winner.name, " wins!");
  var playingGameboards = document.querySelectorAll(".playing-gameboard");
  playingGameboards.forEach(function (gameboard) {
    gameboard.classList.add("disableCursor");
  });
  var resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function () {
    resetGame();
    endModal.style.display = "none";
    var playingScreen = document.getElementById('playing-screen');
    playingScreen.style.display = "none";
    playingGameboards.forEach(function (gameboard) {
      gameboard.classList.remove("disableCursor");
    });
  });
}
function resetGame() {
  _startscreen__WEBPACK_IMPORTED_MODULE_0__.game.playerStorage = [];
  _startscreen__WEBPACK_IMPORTED_MODULE_0__.game.gameboardStorage = [];
  var startingGameboard = document.getElementById('starting-gameboard');
  startingGameboard.remove();
  (0,_startscreen__WEBPACK_IMPORTED_MODULE_0__.startScreenFunctions)();
}

/***/ }),

/***/ "./src/js/game/startscreen.js":
/*!************************************!*\
  !*** ./src/js/game/startscreen.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGameboard": () => (/* binding */ displayGameboard),
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "startScreenFunctions": () => (/* binding */ startScreenFunctions)
/* harmony export */ });
/* harmony import */ var _gameloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameloop */ "./src/js/game/gameloop.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/gameboard */ "./src/js/factories/gameboard.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/player */ "./src/js/factories/player.js");



var game;
function startScreenFunctions() {
  game = (0,_gameloop__WEBPACK_IMPORTED_MODULE_0__.gameLoop)();
  var startScreen = document.getElementById('start-screen');
  startScreen.style.display = "flex";
  var startingGameboard = document.createElement('div');
  startingGameboard.setAttribute("id", "starting-gameboard");
  startScreen.appendChild(startingGameboard);
  var startButton = document.getElementById('start-button');
  startButton.addEventListener('click', beginGame);
  loadPlayers();
}
function loadPlayers() {
  var newPlayer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_2__["default"])('Player');
  var computerPlayer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_2__["default"])('Computer');
  game.playerStorage.push(newPlayer, computerPlayer);
  loadGameboards(newPlayer, computerPlayer);
}
function loadGameboards(player, computer) {
  var newPlayerGameboard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("".concat(player.name));
  var computerGameboard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])("".concat(computer.name));
  newPlayerGameboard.initialize();
  newPlayerGameboard.placeShipsRandomly();
  computerGameboard.initialize();
  computerGameboard.placeShipsRandomly();
  game.gameboardStorage.push(newPlayerGameboard, computerGameboard);
  var startingGameboard = document.getElementById('starting-gameboard');
  displayGameboard(newPlayerGameboard, startingGameboard);
}
function findActiveShip(cell, gameboard, startingGameboard) {
  var row = cell.getAttribute('data-x');
  var column = cell.getAttribute('data-y');
  var activeShip = gameboard.grid[row][column];
  toggleRotateButton(activeShip);
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (gameboard.grid[i][j] === activeShip) gameboard.grid[i][j] = null;
    }
  }
  displayGameboard(gameboard, startingGameboard);
  selectNewPosition(activeShip, gameboard);
}
function selectNewPosition(activeShip, gameboard) {
  var occupiedPositions = document.querySelectorAll('.occupied');
  occupiedPositions.forEach(function (cell) {
    return cell.style.pointerEvents = "none";
  });
  var startButton = document.getElementById('start-button');
  startButton.style.pointerEvents = "none";
  var startingGameboard = document.getElementById('starting-gameboard');
  var startingGameboardCells = startingGameboard.querySelectorAll('.square');
  startingGameboardCells.forEach(function (cell) {
    var row = cell.getAttribute('data-x') * 1;
    var column = cell.getAttribute('data-y') * 1;
    cell.addEventListener('mouseover', function () {
      if (gameboard.checkCoordinate(activeShip, row, column, activeShip.isVertical)) {
        cell.addEventListener('click', function () {
          gameboard.placeShip(activeShip, row, column);
          displayGameboard(gameboard, startingGameboard);
          startButton.style.pointerEvents = "auto";
        });
        if (activeShip.isVertical) {
          for (var i = 0; i < activeShip.length; i++) {
            var additionalCell = document.querySelector("[data-x=" + CSS.escape(row + i) + "][data-y=" + CSS.escape(column) + "]");
            if (additionalCell) additionalCell.classList.add('placement-hover');
          }
        } else {
          for (var _i = 0; _i < activeShip.length; _i++) {
            var _additionalCell = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + _i) + "]");
            if (_additionalCell) _additionalCell.classList.add('placement-hover');
          }
        }
      } else {
        if (activeShip.isVertical) {
          for (var _i2 = 0; _i2 < activeShip.length; _i2++) {
            var _additionalCell2 = document.querySelector("[data-x=" + CSS.escape(row + _i2) + "][data-y=" + CSS.escape(column) + "]");
            if (_additionalCell2) _additionalCell2.classList.add('no-placement-hover');
          }
        } else {
          for (var _i3 = 0; _i3 < activeShip.length; _i3++) {
            var _additionalCell3 = document.querySelector("[data-x=" + CSS.escape(row) + "][data-y=" + CSS.escape(column + _i3) + "]");
            if (_additionalCell3) _additionalCell3.classList.add('no-placement-hover');
          }
        }
      }
    });
    cell.addEventListener('mouseout', function () {
      for (var i = 0; i < startingGameboardCells.length; i++) {
        startingGameboardCells[i].classList.remove('placement-hover');
        startingGameboardCells[i].classList.remove('no-placement-hover');
      }
    });
  });
}
function toggleRotateButton(ship) {
  if (document.getElementById('rotate-button')) {
    var _rotateButton = document.getElementById('rotate-button');
    _rotateButton.remove();
  }
  var rotateButton = document.createElement('button');
  rotateButton.id = "rotate-button";
  rotateButton.classList.add('button');
  rotateButton.textContent = "Rotate Button";
  rotateButton.addEventListener('click', function () {
    rotateCurrentShip(ship);
  });
  var startScreenButtons = document.getElementById('start-screen-buttons');
  startScreenButtons.appendChild(rotateButton);
}
function rotateCurrentShip(ship) {
  ship.isVertical = !ship.isVertical;
}
function beginGame() {
  var startScreen = document.getElementById('start-screen');
  startScreen.style.display = "none";
  var playingScreen = document.getElementById('playing-screen');
  playingScreen.style.display = "flex";
  game.loadPlayingGameboards();
}
function displayGameboard(gameboard, domGameboard) {
  domGameboard.innerHTML = "";
  for (var row = 0; row < 10; row++) {
    for (var column = 0; column < 10; column++) {
      var newSquare = document.createElement('div');
      newSquare.className = 'square';
      newSquare.dataset.x = row;
      newSquare.dataset.y = column;
      if (gameboard.gameboardName === "Player" && gameboard.grid[row][column]) {
        if (domGameboard.id === 'starting-gameboard') {
          newSquare.classList.add('occupied');
          newSquare.addEventListener('click', function (e) {
            findActiveShip(e.target, gameboard, domGameboard);
          });
        } else {
          newSquare.classList.add('locked-occupied');
        }
      }
      domGameboard.appendChild(newSquare);
    }
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/fonts/Unbounded-VariableFont_wght.ttf */ "./src/assets/fonts/Unbounded-VariableFont_wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"MyFont\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\n}\n*,\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: inherit;\n}\n\nhtml {\n  font-size: 62.5%;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  gap: 50px;\n  align-items: center;\n  font-size: 1.6rem;\n  margin: 0, auto;\n  margin-top: 30px;\n}\n\nheader {\n  font-size: 5rem;\n  font-family: \"MyFont\", \"Courier New\", Courier, monospace;\n}\n\n.square {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 20px;\n  border: 1px solid rgb(0, 0, 0);\n  background-color: #c3d2e0;\n}\n\n.occupied {\n  background-color: grey;\n}\n\n.occupied:hover {\n  cursor: pointer;\n}\n\n.locked-occupied {\n  background-color: rgb(97, 96, 96);\n}\n\n.placement-hover {\n  background-color: green;\n}\n\n.no-placement-hover {\n  background-color: red;\n}\n\n.gameboard {\n  display: grid;\n  grid-template: repeat(10, 1fr)/repeat(10, 1fr);\n  border: 1px solid black;\n  height: 400px;\n  width: 400px;\n}\n\n#computer-gameboard .square:hover {\n  cursor: pointer;\n}\n\n#playing-screen {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  gap: 30px;\n}\n\n#end-modal {\n  display: none;\n  flex-direction: column;\n  gap: 30px;\n  align-items: center;\n  background-color: rgb(218, 214, 207);\n  padding: 40px;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n  border-radius: 20px;\n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  font-size: 45px;\n}\n\n.button {\n  font-size: 2rem;\n  color: white;\n  background-color: rgb(63, 60, 60);\n  border-radius: 20px;\n  border: none;\n  padding: 10px 20px;\n}\n\n.button:hover {\n  cursor: pointer;\n  transform: scale(1.05);\n}\n\n.missed-shot {\n  background-color: rgb(164, 199, 164) !important;\n  pointer-events: none;\n}\n\n.hit-shot {\n  background-color: rgb(192, 113, 113) !important;\n}\n\n.disableCursor {\n  pointer-events: none;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACI,qBAAA;EACA,+DAAA;AACJ;AAEA;;;EAGI,SAAA;EACA,UAAA;EACA,mBAAA;AAAJ;;AAGA;EACI,gBAAA;AAAJ;;AAGA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;EACA,mBAAA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;AAAJ;;AAGA;EACI,eAAA;EACA,wDAAA;AAAJ;;AAGA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,8BAAA;EACA,yBAAA;AAAJ;;AAGA;EACI,sBAAA;AAAJ;;AAGA;EACI,eAAA;AAAJ;;AAGA;EACI,iCAAA;AAAJ;;AAGA;EACI,uBAAA;AAAJ;;AAGA;EACI,qBAAA;AAAJ;;AAGA;EACI,aAAA;EACA,8CAAA;EACA,uBAAA;EACA,aAAA;EACA,YAAA;AAAJ;;AAGA;EACI,eAAA;AAAJ;;AAGA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,SAAA;AAAJ;;AAGA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;EACA,mBAAA;EACA,oCAAA;EACA,aAAA;EACA,4CAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AAAJ;;AAGA;EACI,eAAA;EACA,YAAA;EACA,iCAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;AAAJ;;AAGA;EACI,eAAA;EACA,sBAAA;AAAJ;;AAGA;EACI,+CAAA;EACA,oBAAA;AAAJ;;AAGA;EACI,+CAAA;AAAJ;;AAGA;EACI,oBAAA;AAAJ","sourcesContent":["@font-face {\n    font-family: 'MyFont';\n    src: url('../assets/fonts/Unbounded-VariableFont_wght.ttf') format('truetype');\n}\n\n*,\n*::before,\n*::after {\n    margin: 0;\n    padding: 0;\n    box-sizing: inherit;\n}\n\nhtml {\n    font-size: 62.5%;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    gap: 50px;\n    align-items: center;\n    font-size: 1.6rem;\n    margin: 0, auto;\n    margin-top: 30px;\n}\n\nheader  {\n    font-size: 5rem;\n    font-family:'MyFont', 'Courier New', Courier, monospace;\n}\n\n.square {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: 20px;\n    border: 1px solid rgb(0, 0, 0);\n    background-color: #c3d2e0;\n}\n\n.occupied  {\n    background-color: grey;\n}\n\n.occupied:hover {\n    cursor: pointer;\n}\n\n.locked-occupied    {\n    background-color: rgb(97, 96, 96);\n}\n\n.placement-hover    {\n    background-color: green;\n}\n\n.no-placement-hover {\n    background-color: red;\n}\n\n.gameboard  {\n    display: grid;\n    grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n    border: 1px solid black;\n    height: 400px;\n    width: 400px;\n}\n\n#computer-gameboard .square:hover {\n    cursor: pointer;\n}\n\n#playing-screen   {\n    display: none;\n    justify-content: center;\n    align-items: center;\n    gap: 30px;\n}\n\n#end-modal   {\n    display: none;\n    flex-direction: column;\n    gap: 30px;\n    align-items: center;\n    background-color: rgb(218, 214, 207);\n    padding: 40px;\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n    border-radius: 20px;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    font-size: 45px;\n}\n\n.button {\n    font-size: 2rem;\n    color: white;\n    background-color: rgb(63, 60, 60);\n    border-radius: 20px;\n    border: none;\n    padding: 10px 20px;\n}\n\n.button:hover   {\n    cursor: pointer;\n    transform: scale(1.05);\n}\n\n.missed-shot    {\n    background-color: rgb(164, 199, 164) !important;\n    pointer-events: none;\n}\n\n.hit-shot   {\n    background-color: rgb(192, 113, 113) !important;\n}\n\n.disableCursor {\n    pointer-events: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/startscreen.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/startscreen.scss ***!
  \******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#starting-gameboard {\n  display: grid;\n  grid-template: repeat(10, 1fr)/repeat(10, 1fr);\n  border: 1px solid black;\n  height: 400px;\n  width: 400px;\n}\n\n#start-screen {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n  align-items: center;\n  background-color: rgb(218, 214, 207);\n  padding: 40px;\n  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n  border-radius: 20px;\n}\n\n.starting-buttons {\n  display: flex;\n  justify-content: space-evenly;\n  width: 100%;\n}\n\n#start-screen-buttons {\n  display: flex;\n  gap: 30px;\n}", "",{"version":3,"sources":["webpack://./src/styles/startscreen.scss"],"names":[],"mappings":"AACA;EACI,aAAA;EACA,8CAAA;EACA,uBAAA;EACA,aAAA;EACA,YAAA;AAAJ;;AAGA;EACI,aAAA;EACA,sBAAA;EACA,SAAA;EACA,mBAAA;EACA,oCAAA;EACA,aAAA;EACA,4CAAA;EACA,mBAAA;AAAJ;;AAIA;EACI,aAAA;EACA,6BAAA;EACA,WAAA;AADJ;;AAIA;EACI,aAAA;EACA,SAAA;AADJ","sourcesContent":["\n#starting-gameboard {\n    display: grid;\n    grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n    border: 1px solid black;\n    height: 400px;\n    width: 400px;\n}\n\n#start-screen    {\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n    align-items: center;\n    background-color: rgb(218, 214, 207);\n    padding: 40px;\n    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n    border-radius: 20px;\n}\n\n\n.starting-buttons {\n    display: flex;\n    justify-content: space-evenly;\n    width: 100%;\n}\n\n#start-screen-buttons   {\n    display: flex;\n    gap: 30px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/startscreen.scss":
/*!*************************************!*\
  !*** ./src/styles/startscreen.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_startscreen_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./startscreen.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/startscreen.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_startscreen_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_startscreen_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_startscreen_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_startscreen_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/fonts/Unbounded-VariableFont_wght.ttf":
/*!**********************************************************!*\
  !*** ./src/assets/fonts/Unbounded-VariableFont_wght.ttf ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "db84d8db427d8dff17c3.ttf";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _styles_startscreen_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/startscreen.scss */ "./src/styles/startscreen.scss");
/* harmony import */ var _js_game_startscreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/game/startscreen */ "./src/js/game/startscreen.js");



(0,_js_game_startscreen__WEBPACK_IMPORTED_MODULE_2__.startScreenFunctions)();
})();

/******/ })()
;
//# sourceMappingURL=mainf6ac476563b45bae30c4.js.map
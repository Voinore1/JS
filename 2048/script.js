import { Grid } from './Grid.js';
import { Tile } from './Tile.js';

const gameBoard = document.getElementById('game-board');
const startNewGameButton = document.getElementById('start-new-game');
const currentScoreElement = document.getElementById('current-score');
const topScoreElement = document.getElementById('top-score');

let grid;
let currentScore = 0;
let topScore = 0;

startNewGameButton.addEventListener('click', startNewGame);

function startNewGame() {
    gameBoard.innerHTML = '';
    grid = new Grid(gameBoard);
    currentScore = 0;
    loadTopScore();
    updateScore();
    grid.randomEmptyCell().tile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = new Tile(gameBoard);
    setupInput();
}

function updateScore() {
    currentScoreElement.textContent = currentScore;
    topScoreElement.textContent = topScore;
    saveScores();
}

function saveScores() {
    localStorage.setItem('topScore', topScore);
}

function loadTopScore() {
    const savedTopScore = localStorage.getItem('topScore');
    if (savedTopScore !== null) {
        topScore = parseInt(savedTopScore, 10);
    }
}

function setupInput() {
    window.addEventListener('keydown', handleInput, { once: true });
}

function handleInput(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (!canMoveUp()) {
                setupInput();
                return;
            }
            moveUp();
            break;
        case 'ArrowDown':
            if (!canMoveDown()) {
                setupInput();
                return;
            }
            moveDown();
            break;
        case 'ArrowLeft':
            if (!canMoveLeft()) {
                setupInput();
                return;
            }
            moveLeft();
            break;
        case 'ArrowRight':
            if (!canMoveRight()) {
                setupInput();
                return;
            }
            moveRight();
            break;
        default:
            setupInput();
            return;
    }

    grid.cells.forEach(cell => cell.mergeTiles());

    const newTile = new Tile(gameBoard);
    grid.randomEmptyCell().tile = newTile;

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        setTimeout(() => {
            alert('Game Over');
        }, 100);
        return;
    }

    setupInput();
}

function moveUp() {
    slideTiles(grid.cellsByColumn);
}

function moveDown() {
    slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
}

function moveLeft() {
    slideTiles(grid.cellsByRow);
}

function moveRight() {
    slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function slideTiles(cells) {
    cells.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null) continue;
            let lastValidCell;
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if (!moveToCell.canAccept(cell.tile)) break;
                lastValidCell = moveToCell;
            }

            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                    currentScore += lastValidCell.tile.value;
                    if (currentScore > topScore) {
                        topScore = currentScore;
                    }
                    updateScore();
                } else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
    });
}

function canMoveUp() {
    return canMove(grid.cellsByColumn);
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
}

function canMoveLeft() {
    return canMove(grid.cellsByRow);
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()));
}

function canMove(cells) {
    for (let group of cells) {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null) continue;
            const moveToCell = group[i - 1];
            if (moveToCell.canAccept(cell.tile)) {
                return true;
            }
        }
    }
    return false;
}

startNewGame();
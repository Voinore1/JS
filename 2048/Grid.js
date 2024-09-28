const gridSize = 4;

export class Grid {
    #cells;

  constructor(gridElement) {
        this.#cells = createGridElements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % gridSize, Math.floor(index / gridSize));
        });
    }

    get cells() {
        return this.#cells;
    }

    get #emptyCells(){
        return this.#cells.filter(cell => cell.tile == null);
    }

    get cellsByRow(){
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell;
            return cellGrid;
        }, []);
    }

    get cellsByColumn(){
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }

    randomEmptyCell(){
        const random = Math.floor(Math.random() * this.#emptyCells.length);
        console.log(this.#emptyCells[random]);
        return this.#emptyCells[random];
    }
}

class Cell {
    #cellElement;
    #x;
    #y;
    #tile;
    #mergeTile;

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y
    }

    get tile() {
        return this.#tile;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get mergeTile() {
        return this.#mergeTile;
    }
    
    set mergeTile(value) {
        this.#mergeTile = value;
        if (value == null) return;
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }

    set tile(value) {
        this.#tile = value;
        if (value == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }

    canAccept(tile) {
        return (this.tile == null || (this.mergeTile == null && this.tile.value === tile.value));
    }

    mergeTiles(){
        if (this.tile == null  || this.mergeTile == null) return;
        this.tile.value *= 2;
        this.mergeTile.remove();
        this.mergeTile = null;
    }
}



function createGridElements(gridElement) {
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.appendChild(cell);
    }
    return cells;
}
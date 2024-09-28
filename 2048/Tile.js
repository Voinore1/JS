export class Tile{
    #tileElement;
    #x;
    #y;
    #value;

    constructor(gameBoard){
        const value = Math.random() > 0.5 ? 2 : 4;
        this.#tileElement = document.createElement('div');
        this.#tileElement.classList.add('tile');
        gameBoard.append(this.#tileElement);
        this.value = value;
    }

    set value(value){
        this.#value = value;
        this.#tileElement.textContent = value;
        setColor(value, this.#tileElement);
    }

    get value(){
        return this.#value;
    }

    set x(value){
        this.#x = value;
        this.#tileElement.style.setProperty('--x', value);
    }

    set y(value){
        this.#y = value;
        this.#tileElement.style.setProperty('--y', value);
    }

    remove(){
        this.#tileElement.remove();
    }
}

function setColor(value, tile){
    switch(value){
        case 2:
            tile.style.backgroundColor = '#fbfced';
            break;
        case 4:
            tile.style.backgroundColor = '#ecefc6';
            break;
        case 8:
            tile.style.backgroundColor = '#ffb296';
            break;
        case 16:
            tile.style.backgroundColor = '#ff7373';
            break;
        case 32:
            tile.style.backgroundColor = '#f6546a';
            break;
        case 64:
            tile.style.backgroundColor = '#8b0000';
            break;
        case 128:
            tile.style.backgroundColor = '#794044';
            break;
        case 256:
            tile.style.backgroundColor = '#31698a';
            break;
        case 512:
            tile.style.backgroundColor = '#297A76';
            break;
        case 1024:
            tile.style.backgroundColor = '#2D8A68';
            break;
        case 2048:
            tile.style.backgroundColor = '#1C9F4E';
            break;
    }

}
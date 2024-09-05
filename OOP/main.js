class Selector{
    #name;
    #styles;

    constructor(name) {
        this.#name = name;
        this.#styles = [];        
    }

    addProperty(name, value) {
        this.#styles.push({name, value});
    }

    removeProperty(name){
        this.#styles = this.#styles.filter(style => style.name !== name);
    }

    getCSS(){
        let css = '.' + this.#name + ' { ';
        this.#styles.forEach(style => {
            css += style.name + ': ' + style.value + '; ';
        });
        css += '}';
        console.log(css);
    }
}

const selector = new Selector('myClass');
selector.addProperty('color', 'red');
selector.addProperty('font-size', '16px');
selector.addProperty('margin', '10px');
selector.removeProperty('font-size');
selector.getCSS();

class Button {
    constructor(text, height, width) {
        this.text = text;
        this.height = height;
        this.width = width;
    }

    showBtn() {
        const btnHTML = `<button style="height: ${this.height}; width: ${this.width};">${this.text}</button>`;
        document.write(btnHTML);
    }
}


class BootStrapButton extends Button {
    constructor(text, height, width, color) {
        super(text, height, width);
        this.color = color;
    }
    
    showBtn() {
        const btnHTML = `<button style="height: ${this.height}; width: ${this.width}; background-color: ${this.color};">${this.text}</button>`;
        document.write(btnHTML);
    }
}

//const button = new Button('Click me', '50px', '100px');
//button.showBtn();

const bootStrapButton = new BootStrapButton('Click me', '50px', '100px', 'red');
bootStrapButton.showBtn();
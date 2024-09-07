function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getColor(counter){
    switch(counter % 3)
    {
        case 0: return 'Green';
        case 1: return 'Yellow';
        case 2: return 'Red';
    }
}

function Load(){
    if(localStorage.getItem('colors') != null){
        colors = JSON.parse(localStorage.getItem('colors'));
        colors.forEach(color => {
            const newItem = document.createElement('button');
            newItem.classList.add('delete');
            newItem.style.backgroundColor = color;
            newItem.addEventListener('dblclick', function () {
                this.remove();
                if (colors.indexOf(color) != -1) {
                    colors.splice(colors.indexOf(color), 1);
                }
            });
            list.appendChild(newItem);
        });
    }
    if(localStorage.getItem('counter') != null){
        counter = parseInt(localStorage.getItem('counter'));
    }
    else{
        counter = 1;
    }
    changeColor();
}

function Save(){
    localStorage.setItem('colors', JSON.stringify(colors));
    localStorage.setItem('counter', counter);
}

function changeColor(){
    listB[counter % listB.length].style.backgroundColor = getColor(counter);
    listB[(counter - 1) % listB.length].style.backgroundColor = 'gray';

}


const list = document.querySelector('div.container');
const btn = document.querySelector('button.add');
let colors = [];

btn.addEventListener('click', function () {
    const newItem = document.createElement('button');
    const color = getRandomColor();

    newItem.classList.add('delete');
    newItem.style.backgroundColor = color;
    colors.push(color);
    newItem.addEventListener('dblclick', function () {
        this.remove();
        if (colors.indexOf(color) != -1) {
            colors.splice(colors.indexOf(color), 1);
        }
    });
    list.appendChild(newItem);
});


let counter;
let listB = document.querySelectorAll('div.light div.element');

const btnB = document.querySelector('button.change');

btnB.addEventListener('click', function () {
    counter++;
    changeColor();
});

window.addEventListener('beforeunload', Save);
window.addEventListener('load', Load);
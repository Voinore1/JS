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


const list = document.querySelector('div.container');
const btn = document.querySelector('button.add');


btn.addEventListener('click', function () {
    const newItem = document.createElement('button');

    newItem.classList.add('delete');
    newItem.style.backgroundColor = getRandomColor();
    newItem.addEventListener('dblclick', function () {
        this.remove();
    });
    list.appendChild(newItem);
});



let counter = 1;
let listB = document.querySelectorAll('div.light div.element');
listB[0].style.backgroundColor = 'green';

const btnB = document.querySelector('button.change');

btnB.addEventListener('click', function () {
    listB[counter % listB.length].style.backgroundColor = getColor(counter);
    listB[(counter - 1) % listB.length].style.backgroundColor = 'gray';
    counter++;
});

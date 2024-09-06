function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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


// ----------------- add elements to DOM 
// list.append(newItem);
list.appendChild(newItem);

list.prepend("Prepended item"); // insert first list item
list.append("Appended item");   // insert last list item

list.before("Before item");       // insert outside the list before
list.after("After item");         // insert outside the list after

// ----------------- working with CSS classes
// 1 - using style property
// newItem.style.textTransform = "uppercase";
// newItem.style.fontSize = "24px";

// 2 - using CSS classes
newItem.classList.remove('important');
newItem.classList.add('important');

// ------- set event handler
list.lastElementChild.onclick = function (e) {
    // executes when the item was clicked
    //debugger;
    //alert("afrae");

    //newItem.classList.toggle('important');
    //e.target.classList.toggle('important'); 
    this.classList.toggle('important');         // e.target === this
}

// ----------------- working with attributes
newItem.setAttribute("name", 'test');
newItem.getAttribute('name'); // test
newItem.removeAttribute('name');

// ----------------- get items by hierarchy
const secondItem = list.children[1];

console.log("Next sibling:", secondItem.nextSibling);         // include elements and text nodes
console.log("Previous sibling:", secondItem.previousSibling); // include elements and text nodes

console.log("Next sibling element:", secondItem.nextElementSibling); // include elements only
console.log("Previous sibling element:", secondItem.previousElementSibling); // include elements only

console.log('Parent item:', secondItem.parentNode);

// ------ remove item from DOM
newItem.remove();
const tasks = document.querySelectorAll('li');
const cards = document.querySelectorAll('.card');
const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelectorAll('.list');
let target = '';
// let ar?rays;
let storedItems;

let arrays = [['example1'], ['example2'], ['example3'], ['example4']];

if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify(arrays));
} else {
    storedItems = JSON.parse(localStorage.items);
    arrays = storedItems;
}

uList.forEach((list, i) => {
    if (localStorage) {
        storedItems = JSON.parse(localStorage.items);
        storedItems[i].forEach((arrayItem, i) => {
            list.appendChild(createNewTask(arrayItem, i));
        });
    } else {
        arrays[i].forEach((arrayItem) => {
            list.appendChild(createNewTask(arrayItem));
        });
    }
});

forms.forEach((form, i) => {
    form.addEventListener('submit', function addTask(e) {
        e.preventDefault();
        uList[i].appendChild(createNewTask(inputs[i].value));
        arrays[i].push(inputs[i].value);
        localStorage.setItem('items', JSON.stringify(arrays));
        storedItems = JSON.parse(localStorage.items);

        inputs[i].value = '';
    });
});

cards.forEach((desc) => {
    desc.setAttribute('draggable', 'true');
    desc.addEventListener('dragover', dragOver);
    desc.addEventListener('drop', dragDrop);
});

function createNewTask(item, i) {
    let newItem = document.createElement('li');
    newItem.textContent = item;
    newItem.setAttribute('draggable', 'true');
    newItem.setAttribute('data-index', `${i}`);
    newItem.addEventListener('dragstart', dragStart);
    newItem.addEventListener('dragend', dragEnd);
    newItem.addEventListener('dragover', dragOver);
    newItem.addEventListener('dragenter', dragEnter);
    newItem.addEventListener('dragleave', dragLeave);
    newItem.addEventListener('dropover', dragOver);
    newItem.addEventListener('drop', dragDrop);
    return newItem;
}

function dragStart(e) {
    target = this;
    console.log(this);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this);
}

function dragEnd() {
    console.log('end');
}

function dragOver(e) {
    e.preventDefault();
    console.log('over');
}

function dragEnter(e) {
    e.preventDefault();
    console.log('enter');
}

function dragLeave() {
    console.log('leave');
}

function dragDrop(e) {
    e.preventDefault();
    console.log('drop');
    console.log(`this: ${this} -- target: ${target}`);
    if (target !== this) {
        console.log(e.target);
        if (
            e.target.classList[0] === 'taskDescription' ||
            e.target.classList[0] === 'card' ||
            e.target.classList[0] === 'addTask' ||
            e.target.classList[0] === 'list' ||
            e.target.classList[0] === 'form'
        ) {
            console.log(arrays);
            console.log(target);
            this.children[3].childNodes[1].appendChild(target);
        } else {
            this.children[3].childNodes[1].insertBefore(target, e.target);
        }
    }
    return false;
}

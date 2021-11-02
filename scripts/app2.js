const tasks = document.querySelectorAll('li');
const cards = document.querySelectorAll('.card');
const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelectorAll('.list');
let target = '';
let storedItems;
let dragStartIndex;
let arrays = [['example1'], ['example2'], ['example3'], ['example4']];

if (!localStorage.getItem('items')) {
    localStorage.setItem('items', JSON.stringify(arrays));
} else {
    storedItems = JSON.parse(localStorage.items);
    arrays = storedItems;
}

uList.forEach((list, i) => {
    list.addEventListener('drop', dragDrop);

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
        let index = uList[i].children.length;
        uList[i].appendChild(createNewTask(inputs[i].value, index));
        arrays[i].push(inputs[i].value);
        localStorage.setItem('items', JSON.stringify(arrays));
        storedItems = JSON.parse(localStorage.items);
        inputs[i].value = '';
    });
});

cards.forEach((desc) => {
    desc.setAttribute('draggable', 'true');
    desc.addEventListener('dragover', dragOver);
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
    dragStartIndex = +this.getAttribute('data-index');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this);
}

function dragEnd() {}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop(e) {
    console.log('drop');
    e.preventDefault();
    const dragEndIndex = +this.getAttribute('data-index');
    if (this.classList[0] === 'list') {
        localStorage.setItem('items', JSON.stringify(arrays));
        storedItems = JSON.parse(localStorage.items);
        this.appendChild(target, e.target);
    }
    if (this.getAttribute('data-index')) {
        localStorage.setItem('items', JSON.stringify(arrays));
        storedItems = JSON.parse(localStorage.items);
        this.insertAdjacentElement('beforebegin', target);
        uList.forEach((list) => {
            list.childNodes.forEach((li, i) => {
                li.setAttribute('data-index', i);
            });
        });
    }
}

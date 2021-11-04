const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelector('.list');
let dragStartIndex;
let arrayStartIndex;

const taskList = [`example1`, `2`, `3`, `4`, `5`];

const listItems = [];
uList.addEventListener('dragstart', dragStart);

makeLists();
// setAttributes();

function makeLists() {
    [...taskList].forEach((task, i) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', i);
        listItem.innerHTML = `${task}`;
        listItems.push(listItem);
        uList.appendChild(listItem);
    });
    setAttributes();
}

function setAttributes() {
    uList.childNodes.forEach((li, i) => {
        li.setAttribute('draggable', 'true');
        li.setAttribute('data-index', i);
        li.setAttribute('class', 'draggables');
        li.addEventListener('drop', dragDrop);
        li.addEventListener('dragover', dragOver);
        // li.addEventListener('dragenter', dragEnter);
        li.addEventListener('drop', dragDrop);
        // li.addEventListener('dragleave', dragLeave);
    });
}
forms.forEach((form, i) => {
    // Adding Task
    form.addEventListener('submit', function addTask(e) {
        e.preventDefault();
    });
});

function dragStart(e) {
    // dragStartIndex = this.closest('li').getAttribute('data-index');
    dragStartIndex = +e.target.getAttribute('data-index');

    console.log(dragStartIndex);
}

function dragEnd() {}

function dragOver(e) {
    e.preventDefault();
    console.log('DragOver');
}

function dragEnter(e) {
    e.preventDefault();
    console.log('DragEnter');
}

function dragLeave() {
    console.log('dragLeave');
}

function dragDrop(e) {
    e.preventDefault();
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
}
function swapItems(fromIndex, toIndex) {
    console.log(listItems[fromIndex]);
    console.log(listItems[toIndex]);

    const itemOne = listItems[fromIndex];
    const itemTwo = listItems[toIndex];
    console.log(itemOne, itemTwo);
    uList.insertBefore(itemTwo, uList.children[fromIndex]);
    uList.insertBefore(itemOne, uList.children[toIndex]);
}

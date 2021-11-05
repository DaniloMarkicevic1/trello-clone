const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelectorAll('.list');
let dragStartIndex;
let arrayStartIndex;
let storedList;
const taskList = [
    [`1`, `2`, `3`, `4`, `5`],
    [`6`, `7`, `8`, `9`, `10`],
    [`11`, `12`, `13`, `14`, `15`],
    [`16`, `17`, `18`, `19`, `20`],
];

const listItems = [[], [], [], []];
makeLists();
setEventListeners();
setAttributes();

forms.forEach((form, i) => {
    // Adding Task
    form.addEventListener('submit', function addTask(e) {
        e.preventDefault();
        if (inputs[i].value === '') {
            return;
        } else {
            const listItem = document.createElement('li');
            const index = listItems[i].length;
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `<div class="draggable" draggable="true">${inputs[i].value}</div>`;
            listItems[i].push(listItem);
            uList[i].appendChild(listItem);
            storedList[i].push(inputs[i].value);
            inputs[i].value = '';
            localStorage.setItem('taskList', JSON.stringify(storedList));
            console.log(storedList[i]);
            setAttributes();
        }
    });
});

function fillLists(items) {
    items.forEach((innerList, index) => {
        innerList.forEach((task, i) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', i);
            listItem.innerHTML = `<div class="draggable" draggable="true">${task}</div>`;
            listItems[index].push(listItem);
            uList[index].appendChild(listItem);
        });
    });
}

function makeLists() {
    if (localStorage.getItem('taskList')) {
        storedList = JSON.parse(localStorage.taskList);
        localStorage.setItem('taskList', JSON.stringify(storedList));
        fillLists(storedList);
    } else {
        fillLists([...taskList]);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        storedList = JSON.parse(localStorage.taskList);
    }
}

function setAttributes() {
    uList.forEach((list, i) => {
        list.setAttribute('data-index', i);
        list.childNodes.forEach((li, i) => {
            li.setAttribute('data-index', i);
            li.setAttribute('class', 'draggables');
        });
    });
}

function setEventListeners() {
    uList.forEach((list) => {
        list.addEventListener('dragstart', dragStart);
        list.addEventListener('dragover', dragOver);
        list.childNodes.forEach((li, i) => {
            li.addEventListener('drop', dragDrop);
            li.addEventListener('dragover', dragOver);
        });
    });
}

function dragStart(e) {
    listStartIndex = +this.getAttribute('data-index');
    dragStartIndex = +e.target.closest('li').getAttribute('data-index');
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
    e.preventDefault();
    console.log(e.target);
    const dragEndIndex = +this.getAttribute('data-index');
    const listEndIndex = +this.parentElement.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex, listStartIndex, listEndIndex);
    setAttributes();
    setEventListeners();
    localStorage.setItem('taskList', JSON.stringify(storedList));
}

function swapItems(fromIndex, toIndex, startIndex, endIndex) {
    if (startIndex === endIndex) {
        // Swap items in a list
        let itemOne =
            listItems[startIndex][fromIndex].querySelector('.draggable');
        let itemTwo = listItems[endIndex][toIndex].querySelector('.draggable');
        let storedItem = listItems[endIndex][toIndex].appendChild(itemOne);
        listItems[startIndex][fromIndex].appendChild(itemTwo);

        //Local Storage Swap
        [storedList[startIndex][fromIndex], storedList[startIndex][toIndex]] = [
            storedList[startIndex][toIndex],
            storedList[startIndex][fromIndex],
        ];
    }
    // Move item to another list
    if (startIndex !== endIndex) {
        listItems[endIndex].splice(
            toIndex,
            0,
            listItems[startIndex][fromIndex]
        );
        listItems[startIndex].splice(fromIndex, 1);

        // Local Storage List
        storedList[endIndex].splice(
            toIndex,
            0,
            storedList[startIndex][fromIndex]
        );
        storedList[startIndex].splice(fromIndex, 1);

        // Change position of Item
        let listItem = uList[startIndex].childNodes[fromIndex];
        uList[endIndex].insertBefore(
            listItem,
            uList[endIndex].childNodes[toIndex]
        );
    }
    // Set local storage to new list arrangement
    localStorage.setItem('taskList', JSON.stringify(storedList));
}

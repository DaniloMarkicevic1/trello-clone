const cards = document.querySelectorAll('.card');
const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelectorAll('.list');
let target = '';
let storedItems;
let dragStartIndex;
let arrayStartIndex;
let arrays = [['example1'], ['example2'], ['example3'], ['example4']];

// if (!localStorage.getItem('items')) {
//     localStorage.setItem('items', JSON.stringify(arrays));
// } else {
//     storedItems = JSON.parse(localStorage.items);
//     arrays = storedItems;
// }

makeLists();

function makeLists() {
    uList.forEach((list, i) => {
        list.setAttribute('draggable', 'true');
        list.setAttribute('data-index', i);
        list.addEventListener('dragover', dragOver);
        list.addEventListener('drop', dragDrop);

        arrays[i].map((item, i) => {
            let listItem = createNewTask(item, i);
            list.appendChild(listItem);
        });
    });
}

forms.forEach((form, i) => {
    // Adding Task
    form.addEventListener('submit', function addTask(e) {
        e.preventDefault();
        let index = uList[i].children.length;
        uList[i].appendChild(createNewTask(inputs[i].value, index));
        arrays[i].push(inputs[i].value);
        // setLocalStorage();
        inputs[i].value = '';
    });
});

// function setLocalStorage() {
//     localStorage.setItem('items', JSON.stringify(arrays));
//     storedItems = JSON.parse(localStorage.items);
//     arrays = storedItems;
// }
//Create new Task, Item
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
    return newItem;
}

function dragStart(e) {
    target = this;
    arrayStartIndex = +this.parentElement.getAttribute('data-index');
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
    e.preventDefault();
    //Item Index
    const dragEndIndex = +this.getAttribute('data-index');
    // List Array Index
    const arrayEndIndex = +this.getAttribute('data-index');
    console.log(e.target);
    if (e.target.classList[0] === 'list') {
        uList[arrayEndIndex].appendChild(
            uList[arrayStartIndex].childNodes[dragStartIndex]
        );
        return;
    }
    if (e.target.classList !== 'list') {
        //Add Item to Target List
        addItemToTarget(
            arrayStartIndex,
            arrayEndIndex,
            dragStartIndex,
            dragEndIndex
        );

        // Remove Item from clicked List
        removeItem(arrayStartIndex, dragStartIndex);
        // setLocalStorage();
        uList.forEach((list) => {
            list.childNodes.forEach((li, i) => {
                li.setAttribute('data-index', i);
            });
        });
        return;
    }
    return;
}

function addItemToTarget(
    arrayStartIndex,
    arrayEndIndex,
    dragStartIndex,
    dragEndIndex
) {
    console.log(arrayStartIndex, arrayEndIndex);
    arrays[arrayEndIndex].splice(
        dragEndIndex,
        0,
        arrays[arrayStartIndex][dragStartIndex]
    );
    if (arrayEndIndex !== arrayStartIndex) {
        uList[arrayEndIndex].prepend(
            uList[arrayStartIndex].childNodes[dragStartIndex]
        );
    } else {
    }
}
function removeItem(arrayStart, dragStart) {
    arrays[arrayStart].splice(dragStart, 1);
}

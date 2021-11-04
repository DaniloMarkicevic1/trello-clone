const cards = document.querySelectorAll('.card');
const forms = document.querySelectorAll('form');
const inputs = document.querySelectorAll('.addTask');
const uList = document.querySelectorAll('.list');
let target = '';
let storedItems;
let dragStartIndex;
let arrayStartIndex;
let arrays = [
    [
        `<li>example1</li>`,
        `<li>2</li>`,
        `<li>3</li>`,
        `<li>4</li>`,
        `<li>5</li>`,
    ],
    [
        `<li>example2</li>`,
        `<li>2</li>`,
        `<li>3</li>`,
        `<li>4</li>`,
        `<li>5</li>`,
    ],
    [`<li>example3</li>`],
    [`<li>example4</li>`],
];

makeLists();
setAttributes();

function makeLists() {
    uList.forEach((list, i) => {
        list.setAttribute('draggable', 'true');
        list.setAttribute('data-index', i);
        list.addEventListener('dragover', dragOver);
        list.addEventListener('drop', dragDrop);
        let helpList = '';
        arrays[i].map((item) => {
            helpList += item;
        });
        list.innerHTML = helpList;
    });
}

function setAttributes() {
    uList.forEach((list, i) => {
        list.childNodes.forEach((li, i) => {
            li.setAttribute('draggable', 'true');
            li.setAttribute('data-index', i);
            li.addEventListener('dragstart', dragStart);
        });
    });
}
forms.forEach((form, i) => {
    // Adding Task
    form.addEventListener('submit', function addTask(e) {
        e.preventDefault();
        uList[i].innerHTML += `<li>${inputs[i].value}</li>`;
        arrays[i].push(`<li>${inputs[i].value}</li>`);

        setAttributes();
        inputs[i].value = '';
        console.log(arrays);
    });
});

function dragStart(e) {
    target = this;
    arrayStartIndex = +this.parentElement.getAttribute('data-index');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
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
    const dragEndIndex = +e.target.closest('li').getAttribute('data-index');
    // List Array Index
    const arrayEndIndex = +this.getAttribute('data-index');
    if (e.target.classList[0] === 'list') {
        uList[arrayEndIndex].appendChild(
            uList[arrayStartIndex].childNodes[dragStartIndex]
        );
        setAttributes();
        console.log(arrays);

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
        setAttributes();

        // setLocalStorage();
        console.log(arrays);

        return;
    }
    console.log(arrays);

    return;
}

function addItemToTarget(
    arrayStartIndex,
    arrayEndIndex,
    dragStartIndex,
    dragEndIndex
) {
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
        arrays[arrayEndIndex].splice(
            dragEndIndex,
            0,
            arrays[arrayStartIndex][dragStartIndex]
        );

        arrays[arrayEndIndex].splice(
            dragEndIndex,
            0,
            arrays[arrayStartIndex][dragEndIndex]
        );
    }
}
function removeItem(arrayStart, dragStart) {
    arrays[arrayStart].splice(dragStart, 1);
}

function swapItems(fromIndex, toIndex) {
    console.log(listItems[fromIndex]);
    console.log(listItems[toIndex]);

    const itemOne = listItems[fromIndex];
    const itemTwo = listItems[toIndex];
    console.log(itemOne, itemTwo);
    uList.insertBefore(itemTwo, uList.children[fromIndex]);
    uList.insertBefore(itemOne, uList.children[toIndex]);
    setAttributes();
}

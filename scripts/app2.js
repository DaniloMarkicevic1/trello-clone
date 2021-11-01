const tasks = document.querySelectorAll('li');
const cards = document.querySelectorAll('.card');
let target = '';

cards.forEach((desc) => {
    desc.setAttribute('draggable', 'true');
    desc.addEventListener('dragover', dragOver);
    desc.addEventListener('drop', dragDrop);
});

tasks.forEach((task) => {
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
    task.addEventListener('dragover', dragOver);
    task.addEventListener('dragenter', dragEnter);
    task.addEventListener('dragleave', dragLeave);
    task.addEventListener('dropover', dragOver);
    task.addEventListener('drop', dragDrop);
});

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
    if (target !== this) {
        console.log(this.children[3].childNodes);
        this.children[3].childNodes[1].appendChild(target);
    }
    return false;
}

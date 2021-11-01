const cards = document.querySelectorAll('.card');
// const tasks = document.querySelectorAll('.taskDescription');
let target = '';
let position1 = 'one';
let position2 = 'two';
let position3 = 'three';
let position4 = 'four';

const positions = [position1, position2, position3, position4];

cards.forEach((card, i) => {
    card.classList.replace(
        card.classList[1],
        localStorage.getItem(positions[i])
    );
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
    card.addEventListener('dragover', dragOver);
    card.addEventListener('dragenter', dragEnter);
    card.addEventListener('dragleave', dragLeave);
    card.addEventListener('dropover', dragOver);
    card.addEventListener('drop', dragDrop);
});

function dragStart(e) {
    cards.forEach((card, i) => {
        positions[i];
        localStorage.setItem(`${positions[i]}`, card.classList[1]);
    });
    target = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
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

    if (target !== this) {
        let classListItem = target.classList[1];
        target.classList.replace(target.classList[1], this.classList[1]);
        this.classList.replace(this.classList[1], classListItem);
        cards.forEach((card, i) => {
            positions[i];
            localStorage.setItem(`${positions[i]}`, card.classList[1]);
        });
    }
    return false;
}

let counter = 0;

window.addEventListener('state-update', (e) => {
    updateCounter(e.detail);
})

const manager = new StateManager(counter);

function plusOne() {
    // manager.addOne();
    // updateCounter()
    dispatchEvent(new CustomEvent('plus-one'));
}

function minusOne() {
    // manager.removeOne();
    // updateCounter()
    dispatchEvent(new CustomEvent('minus-one'));
}

function updateCounter(state) {
    const counterLabel = document.getElementById('counter');
    counterLabel.innerHTML = state;
}

function undo() {
    // manager.undo();
    // updateCounter();
    dispatchEvent(new CustomEvent('undo-action'));
}

function redo() {
    // manager.redo();
    // updateCounter();
    dispatchEvent(new CustomEvent('redo-action'));
}

function reset() {
    manager.reset();
    updateCounter();
}
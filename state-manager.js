class StateManager {

    actions = {
        'ADD_ONE': (state) => {
            return state + 1;
        },
        'REMOVE_ONE': (state) => {
            return state - 1;
        }
    }

    constructor(startingState) {
        this.startingState = startingState;
        this.state = startingState;
        this.actionsList = [];
        this.actionIndex = 0;

        window.addEventListener('plus-one', (e) => this.addOne());
        window.addEventListener('minus-one', (e) => this.removeOne());
        window.addEventListener('undo-action', (e) => this.undo());
        window.addEventListener('redo-action', (e) => this.redo());
    }

    addOne() {
        this.resetFuture();
        this.actionsList.push('ADD_ONE');
        this.actionIndex++;
        this.limitActionsList();
        console.log(this.actionsList);
        this.reducer();
    }

    removeOne() {
        this.resetFuture();
        this.actionsList.push('REMOVE_ONE');
        this.actionIndex--;
        console.log(this.actionsList);
        this.reducer();
    }

    resetFuture() {
        this.actionsList = this.actionsList.slice(0, this.actionIndex);
    }

    undo() {
        if (this.actionIndex > 0) {
            this.actionIndex--;
            this.reducer();
        }
    }

    redo() {
        if (this.actionIndex < this.actionsList.length) {
            this.actionIndex++;
            this.reducer();
        }
    }

    reducer() {
        this.state = this.actionsList.reduce((state, action, index) => {
            return index < this.actionIndex ? this.actions[action](state) : state;
        }, this.startingState);
        console.log(this.state);
        dispatchEvent(new CustomEvent('state-update', { detail: this.state }));
    }

    limitActionsList() {
        if (this.actionsList.length > 3) {
            this.lostActions = this.actionsList.slice(0, 1);
            this.actionsList = this.actionsList.slice(1, this.actionsList.length);
            this.actionIndex--;
            const actionName = this.lostActions[0];
            this.startingState = this.actions[actionName](this.startingState);
        }
    }

    reset() {
        this.actionsList = [];
        this.actionIndex = 0;
        this.startingState = this.state;
    }

}
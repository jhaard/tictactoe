export class Player {
    constructor(name, list = [], turn) {
        this.name = name
        this.list = list
        this.turn = turn
    }

    displayName() {
        return this.name
    }

    addToList(newNumber) {
        this.list.push(newNumber)

    }

    playerTurn() {
        return this.turn
    }
}
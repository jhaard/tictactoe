export class Combinations {
    constructor(h1, h2, h3, v1, v2, v3, d1, d2, sIds) {
        this.h1 = h1
        this.h2 = h2
        this.h3 = h3
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3
        this.d1 = d1
        this.d2 = d2
        this.sIds = sIds
    }

    checkCombinations(list) {
        if (this.h1.every(value => list.includes(value))) {
            for (let i = 0; i < 3; i++) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }
        if (this.h2.every(value => list.includes(value))) {
            for (let i = 3; i < 6; i++) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }
        if (this.h3.every(value => list.includes(value))) {
            for (let i = 6; i < 9; i++) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }

        if (this.v1.every(value => list.includes(value))) {
            for (let i = 0; i < 7; i += 3) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }

        if (this.v2.every(value => list.includes(value))) {
            for (let i = 1; i < 8; i += 3) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }
        if (this.v3.every(value => list.includes(value))) {
            for (let i = 2; i < 9; i += 3) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }

        if (this.d1.every(value => list.includes(value))) {
            for (let i = 0; i < 9; i += 4) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }
        if (this.d2.every(value => list.includes(value))) {
            for (let i = 2; i < 7; i += 2) {
                document.getElementById(this.sIds[i]).style.backgroundColor = "green"
            }
            return true
        }
        return false

    }


}
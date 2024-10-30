if(`serviceWorker` in navigator){
    console.log("Found serviceWorker")
    navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => console.log("Serviceworker registered", reg))
    .catch((err) => console.log("Serviceworker not registered", err))
    
}

import { Player } from "./playerscript.js";
import { Combinations } from "./comboscript.js";

// Players
const playerX = new Player("X", [], true)
const playerO = new Player("O", [], false)

// SquareIDs from HTML
const squareIds = ['sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8', 'sq9'];

// Fetch all elements from HTML
const squares = squareIds.map(id => document.getElementById(id));

// Restart button
const restartButton = document.getElementById('restart')

// Infotext
const info = document.getElementById("turn-info")

// When playing against cpu
const totalSquareList = []

// Check if game is on
var closeGame = false

// Win-combinations
const combos = new Combinations([1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7], squareIds)

// Playing against smartest cpu ever?
var cpuGame

// Maximum turns
var turns = 9

let confirmTypeOfPlay = confirm("VARNING! Vill du spela mot en omöjlig CPU som inte alls väljer random box? ")

if(confirmTypeOfPlay) {
    cpuGame = true
} else {
    cpuGame = false
}

if(!cpuGame) {
    playerGameplay(playerX, playerO)

} else {
    cpuGamePlay(playerX, playerO)

}

function playerGameplay(plX, plO) {
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if (plX.playerTurn()) {
                info.innerHTML = ` Spelare ${plO.displayName()}'s tur!`;
                currentPlayer(plX, square)
                plO.turn = true
                plX.turn = false
            } else if (plO.playerTurn()) {
                info.innerHTML = ` Spelare ${plX.displayName()}'s tur!`;
                currentPlayer(plO, square)
                plX.turn = true
                plO.turn = false
            }
        }
        );
    })

}

function cpuGamePlay(player, cpu) {
    squares.forEach(square => {
        square.addEventListener('click', () => {

            if (player.playerTurn()) {
                info.innerHTML = ` Spelare ${cpu.displayName()}'s tur!`;
                currentPlayer(player, square)
                player.turn = false
                cpu.turn = true

            }

            if (!closeGame && turnCheck()) {
                setTimeout(() => {

                    cpuPlay()
                    playerX.turn = true
                    playerO.turn = false
                }, 500);

            }

        });
    })

}

function currentPlayer(player, square) {
    let squareNumber = square.id.charAt(2)
    let intNumber = parseInt(squareNumber)
    player.addToList(intNumber)
    totalSquareList.push(intNumber)
    document.getElementById(square.id).innerHTML = player.displayName();
    closeGame = combos.checkCombinations(player.list)
    document.getElementById(square.id).style.pointerEvents = 'none';

    checkIfGameOver(player)

    turns--

    restartButton.addEventListener('click', () => {
        location.reload();
    });

}

function turnCheck() {
    if (turns > 1) {
        return true
    } else {
        return false
    }
}

function checkIfGameOver(player) {
    if (closeGame) {
        info.style.color = "green"
        console.log()
        info.innerHTML = `SPELARE ${player.displayName()} VANN!`;

        for (const square of squares) {
            square.style.pointerEvents = 'none'
        }

    } else if (!closeGame && !turnCheck()) {
        info.style.color = "goldenrod"
        info.innerHTML = "OAVGJORT!"
    }
}

function cpuPlay() {
    let randomInt = getRandomNumber()

    totalSquareList.push(randomInt)
    playerO.addToList(randomInt)
    let numberToString = randomInt.toString()
    let idString = `sq${numberToString}`

    document.getElementById(idString).innerHTML = playerO.displayName();
    document.getElementById(idString).style.pointerEvents = 'none';

    closeGame = combos.checkCombinations(playerO.list)

    info.innerHTML = ` Spelare ${playerX.displayName()}'s tur!`;
    checkIfGameOver(playerO)
    turns--
}

function getRandomNumber() {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 9) + 1;
    } while (totalSquareList.includes(randomNumber));
    console.log(totalSquareList)
    console.log(`Random number = ${randomNumber}`)
    return randomNumber;
}


import json5 from "json5";
import { VERSION, pick, result } from "lodash";
import {
    createSquares,
    myShips,
    createShips,
    getTile,
    insertAt,
    insert,
    getDragElement,
    getTileFromNumber,
    whichCircle,
    undo,
    rotate,
    numToLetters,
    finalTile,
    flippable,
    placedShipDimmer,
    placedShips,
    selfCreateBoard,
    getSurroundingDivs,
    opponentCreateBoard,
    checkSurrounding,
    shoot,
    checkIfAllHitsFinished,
    clickRandomTiles,
    getTypeOfSquare,
    getPosition,
    lineMissile,
    getSquareTiles,
    getLineTiles,
    createCreatedBoard,
    createBoardArray
} from "./board";

import myhit from './Assets/sounds/hit.wav'
import mymiss from './Assets/sounds/watershot.wav'
import mysink from './Assets/sounds/sink2.mp3'
import myairstrike from './Assets/sounds/airstrike.mp3'
import mybigBomb from './Assets/sounds/bigBomb.mp3'

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const shipsPlayer = document.querySelectorAll(".player .ship");
const shipsOpponent = document.querySelectorAll(".opponent .ship");
const individualships = document.querySelectorAll(".ship");
const selfCreate = document.querySelector(".randomize");
const reset = document.querySelector(".reset");
const opponentCreate = document.querySelector(".opponentRefresh");
const tileDivs = document.querySelectorAll(".tiles > div");
const tilesOverlayDivs = document.querySelectorAll(".player .tilesOverlay div");
const thePlayerTiles = document.querySelectorAll(".player .tiles");

const button = document.querySelector(".pvc");
let opponentIndividualTiles = document.querySelectorAll(".opponent .tile");
let playerIndividualTiles = document.querySelectorAll(".player .tile");
let playerBoard = null;
const playerBoard2 = null;
let tilesOverlayDivsCopy = [...tilesOverlayDivs];
const pvp = document.querySelector(".pvsp");
const squareMissileButton = document.querySelector(".opponent .bomb");
const lineMissileButton = document.querySelector(".opponent .airforce");
const squareMissileButton2 = document.querySelector(".player .bomb");
const lineMissileButton2 = document.querySelector(".player .airforce");
const player1Overlays = document.querySelectorAll(".player .tilesOverlay div");
const player2Overlays = document.querySelectorAll(
    ".opponent .tilesOverlay div"
);
const opponent1Overlays = document.querySelectorAll(".opponent .overlay");
let eachPlayerTile = document.querySelectorAll(".player .tile");
const playerSquares = document.querySelector(".player .squares");
const opponentSquares = document.querySelector(".opponent .squares");
const start = document.querySelector(".start");
const playerButtons = document.querySelector(".player .buttons");
const opponentButtons = document.querySelector(".opponent .buttons");
const playerShips = document.querySelector(".player .ships");
const keys = document.querySelector(".keys");
let eachPlayerDiv = document.querySelectorAll(".player .tiles > div");
const player1PointsText = document.querySelector(".player1Points");
const player2PointsText = document.querySelector(".player2Points");
const turnDisplay = document.querySelector(".inside");
const turnContainer = document.querySelector(".turn");
const playerName = document.querySelector(".player .name span");
const opponentName = document.querySelector(".opponent .name span");
const pRotate = document.querySelector(".pRotate");
const oRotate = document.querySelector(".oRotate");
const reloadButton = document.querySelector(".text-container svg");
const gameEnd = document.querySelector(".gameEnd");
const main = document.querySelector(".main");
const playerCircles = document.querySelectorAll(".player .circle");
const opponentCircles = document.querySelectorAll(".opponent .circle ");
const endText = document.querySelector(".end-text");

setInterval(() => {
    const allPlayerShipsHit = [...playerCircles].reduce((acc, circle) => {

        if (!circle.classList.contains("crossed")) {
            return false;
        }
        return acc;
    }, true)

    const allOpponentShipsHit = [...opponentCircles].reduce((acc, circle) => {

        if (!circle.classList.contains("crossed")) {
            return false;
        }
        return acc;
    }, true)

    if (allPlayerShipsHit) {
        main.classList.add("notClickable");
        gameEnd.classList.remove("hidden");

        if (pvcState) {
            endText.innerHTML = "Computer Wins";
        } else {
            endText.innerHTML = "Player 2 Wins";
        }
    }

    if (allOpponentShipsHit) {
        main.classList.add("notClickable");
        gameEnd.classList.remove("hidden");

        if (computerPlaying) {
            endText.innerHTML = "Player Wins";
        } else {
            endText.innerHTML = "Player 1 Wins";
        }
    }
}, 500)

player1PointsText.addEventListener('click', () => {
    playHit()
    playMiss()
})


let tilesOverlayArray = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
];

playerName.textContent = "Player";
opponentName.textContent = "Computer";

let circles;

let tiles;
let ships;

let tilesOp;
let shipsOp;

let tilesOp1;
let shipsOp1;

let tilesP2;
let shipsP2;

// for PVE
let playerTurn = false;

// for PVP
let player1Turn = false; /// ////////////////////////////////////////////////////////////////////////////////////////////
let player2Turn = false;

let squareMissileP1Active = false;
let lineMissileP1Active = false;

let squareMissileP2Active = false;
let lineMissileP2Active = false;

let player1LineMissileAlignment = "horizontal";
let player2LineMissileAlignment = "horizontal";

let computerPlaying = false;

let player1Points = 0;
let player2Points = 0;

let pausePoints = false;

export let gameStarted = false;

const missileShot = false;

let pvcState = true;
let pvpState = false;

let computerShooting = false;

let resetState = false;
playerShips.classList.add("notClickable");
keys.classList.add("hidden");


createSquares(playerTiles);
createSquares(opponentTiles);
playGamePVE();
// playerSquares.classList.add("notClickable");
// opponentSquares.classList.add("notClickable");
let soundTime = true;

function playHit() {
    let hit = new Audio(myhit);
    if (soundTime) {
        hit.play();
        soundTime = false;
    }
    setTimeout(() => {
        soundTime = true;
    }, 25)
}

function playMiss() {
    let miss = new Audio(mymiss);
    if (soundTime) {
        miss.play();
        soundTime = false;
    }
    setTimeout(() => {
        soundTime = true;
    }, 25)

}

function playSink() {
    let sink = new Audio(mysink);
    if (soundTime) {
        sink.play();
        soundTime = false;
    }
    setTimeout(() => {
        soundTime = true;
    }, 25)
}

function playAirStrike() {
    let airstrike = new Audio(myairstrike);
    if (soundTime) {
        airstrike.play();
        soundTime = false;
    }
    setTimeout(() => {
        soundTime = true;
    }, 25)
}

function playBigBomb() {
    let bigBomb = new Audio(mybigBomb);
    bigBomb.volume = 0.5;
    if (soundTime) {
        bigBomb.play();
        soundTime = false;
    }
    setTimeout(() => {
        soundTime = true;
    }, 25)
}


let cHit = false;
let cMiss = false;
let cSink = false;
let cAirStrike = false;
let cBigBomb = false;

let pHit = false;
let pMiss = false;
let pSink = false;
let pAirStrike = false;
let pBigBomb = false;

let p1Hit = false;
let p1Miss = false;
let p1Sink = false;
let p1AirStrike = false;
let p1BigBomb = false;

let p2Hit = false;
let p2Miss = false;
let p2Sink = false;
let p2AirStrike = false;
let p2BigBomb = false;

function calculateSound() {
    if (!cSink) {
        if (cMiss) {
            playMiss();
        }
        if (cHit) {
            playHit();
        }
    }



    if (cSink) {
        playSink();
    }



    if (!pSink) {
        if (pMiss) {
            playMiss();
        }
        if (pHit) {
            playHit();
        }
    }



    if (pSink) {
        playSink();
    }


    if (!p1AirStrike && !p1BigBomb && !squareMissileP1Active && !squareMissileP2Active && !lineMissileP1Active && !lineMissileP2Active) {
        if (!p1Sink) {
            if (p1Miss) {
                playMiss();
            }

            if (p1Hit) {
                playHit();
            }
        }



        if (p1Sink) {
            playSink();
        }
    }

    if (p1AirStrike) {
        playAirStrike();
    }

    if (p1BigBomb) {
        playBigBomb();
    }

    if (!p2AirStrike && !p2BigBomb && !squareMissileP1Active && !squareMissileP2Active && !lineMissileP1Active && !lineMissileP2Active) {
        if (!p2Sink) {
            if (p2Miss) {
                playMiss();
            }

            if (p2Hit) {
                playHit();
            }
        }



        if (p2Sink) {
            playSink();
        }
    }

    if (p2AirStrike) {
        playAirStrike();
    }

    if (p2BigBomb) {
        playBigBomb();
    }


}

function resetSound() {
    cHit = false;
    cMiss = false;
    cSink = false;
    cAirStrike = false;
    cBigBomb = false;

    pHit = false;
    pMiss = false;
    pSink = false;
    pAirStrike = false;
    pBigBomb = false;

    p1Hit = false;
    p1Miss = false;
    p1Sink = false;
    p1AirStrike = false;
    p1BigBomb = false;

    p2Hit = false;
    p2Miss = false;
    p2Sink = false;
    p2AirStrike = false;
    p2BigBomb = false;
}

// setInterval(() => {
//     calculateSound();
//     setTimeout(() => {
//         resetSound();
//     }, 0)
// }, 100)

function sounds() {
    calculateSound();
    setTimeout(() => {
        resetSound();
    }, 0);
}

reloadButton.addEventListener('click', () => {
    location.reload();
})

function turnTo(turn) {
    turnDisplay.classList.remove("player1");
    turnDisplay.classList.remove("player2");
    turnDisplay.classList.remove("playerTurn");
    turnDisplay.classList.remove("computerTurn");

    turnDisplay.classList.add(turn);
}

pvp.addEventListener("click", () => {
    pvcState = false;
    button.classList.remove("clicked");
    button.classList.add("notClicked");

    playerName.textContent = "Player 1";
    opponentName.textContent = "Player 2";

    pvpState = true;
    pvp.classList.add("clicked");
    pvp.classList.remove("notClicked");

    selfCreate.classList.add("pvp");
    reset.classList.add("pvp");

    playGamePVP();
});

button.addEventListener("click", () => {
    if (!pvcState) {
        playGamePVE();
    }

    playerName.textContent = "Player";
    opponentName.textContent = "Computer";

    pvcState = true;
    button.classList.add("clicked");
    button.classList.remove("notClicked");

    pvpState = false;
    pvp.classList.remove("clicked");
    pvp.classList.add("notClicked");

    selfCreate.classList.remove("pvp");
    reset.classList.remove("pvp");
});

function tileToArray(tiles) {
    const array = [];
    for (let i = 0; i < 100; i += 1) {
        array.push(`${i}`.padStart(2, "0"));
    }

    let count = 0;
    let actualIndex = 0;
    [...tiles].forEach((tile, index) => {
        if (tile.dataset.tile !== undefined) {
            const { row, col } = JSON.parse(tile.dataset.tile);
            const shipName = tile.classList[0];
            if (shipName === "single_horizontal" || shipName === "single_vertical") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "double_horizontal") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 1}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "tri_horizontal") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 1}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 2}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "quad_horizontal") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 1}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 2}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row}${col + 3}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "double_vertical") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "tri_vertical") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row + 2}${col}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }
            if (shipName === "quad_vertical") {
                array.splice(parseInt(`${row}${col}`, 10), 1, `${shipName}X${count}`);
                array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row + 2}${col}`, 10), 1, `- ${shipName}X${count}`);
                array.splice(parseInt(`${row + 3}${col}`, 10), 1, `- ${shipName}X${count}`);
                count += 1;
            }


        }


        // if (tile.classList[0] === "tile") {
        //     actualIndex += 1;
        //     return;
        // }
        // if (tile.classList[0] === "single_horizontal") {
        //     array.splice(actualIndex, 1, `single_horizontalX${count}`);
        //     count += 1;
        //     actualIndex += 1;
        //     return;
        // }
        // if (tile.classList[0] === "single_vertical") {
        //     array.splice(actualIndex, 1, `single_verticalX${count}`);
        //     count += 1;
        //     actualIndex += 1;
        //     return;
        // }
        // if (tile.classList[0] === "double_horizontal") {
        //     array.splice(actualIndex, 1, `double_horizontalX${count}`);
        //     array.splice(actualIndex + 1, 1, `- double_horizontalX${count}`);
        //     actualIndex += 2;
        //     count += 1;
        //     return;
        // }
        // if (tile.classList[0] === "tri_horizontal") {
        //     array.splice(actualIndex, 1, `tri_horizontalX${count}`);
        //     array.splice(actualIndex + 1, 1, `- tri_horizontalX${count}`);
        //     array.splice(actualIndex + 2, 1, `- tri_horizontalX${count}`);
        //     count += 1;
        //     actualIndex += 3;
        //     return;
        // }
        // if (tile.classList[0] === "quad_horizontal") {
        //     array.splice(actualIndex, 1, `quad_horizontalX${count}`);
        //     array.splice(actualIndex + 1, 1, `- quad_horizontalX${count}`);
        //     array.splice(actualIndex + 2, 1, `- quad_horizontalX${count}`);
        //     array.splice(actualIndex + 3, 1, `- quad_horizontalX${count}`);
        //     count += 1;
        //     actualIndex += 4;
        //     return;
        // }
        // if (tile.classList[0] === "double_vertical") {
        //     const [row, col] = `${actualIndex}`.padStart(2, "0").split("").map(num => parseInt(num, 10));
        //     array.splice(actualIndex, 1, `double_verticalX${count}`);
        //     array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- double_verticalX${count}`);
        //     count += 1;
        //     return;
        // }
        // if (tile.classList[0] === "tri_vertical") {
        //     const [row, col] = `${actualIndex}`.padStart(2, "0").split("").map(num => parseInt(num, 10));
        //     array.splice(actualIndex, 1, `tri_verticalX${count}`);
        //     array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- tri_verticalX${count}`);
        //     array.splice(parseInt(`${row + 2}${col}`, 10), 1, `- tri_verticalX${count}`);
        //     count += 1;
        //     return;
        // }
        // if (tile.classList[0] === "quad_vertical") {
        //     const [row, col] = `${actualIndex}`.padStart(2, "0").split("").map(num => parseInt(num, 10));
        //     array.splice(actualIndex, 1, `quad_verticalX${count}`);
        //     array.splice(parseInt(`${row + 1}${col}`, 10), 1, `- quad_verticalX${count}`);
        //     array.splice(parseInt(`${row + 2}${col}`, 10), 1, `- quad_verticalX${count}`);
        //     array.splice(parseInt(`${row + 3}${col}`, 10), 1, `- quad_verticalX${count}`);
        //     count += 1;

        // }
    })
    return array;
}

start.addEventListener("click", () => {
    eachPlayerDiv = document.querySelectorAll(".player .tiles > div");
    if (!computerPlaying) {
        turnContainer.classList.remove("hidden");
    }


    if (computerPlaying) {
        squareMissileButton.classList.add("hidden");
        squareMissileButton2.classList.add("hidden");
        lineMissileButton.classList.add("hidden");
        lineMissileButton2.classList.add("hidden");

        [...playerShips.children].forEach(type => {
            [...type.children].forEach(div => {
                div.classList.remove("draged")
            })
        })

    } else {
        squareMissileButton.classList.remove("hidden");
        squareMissileButton2.classList.remove("hidden");
        lineMissileButton.classList.remove("hidden");
        lineMissileButton2.classList.remove("hidden");
    }

    const dataArray = [];
    if (resetState) {

        [...eachPlayerDiv].forEach(div => {
            if (!div.classList.contains("tile")) {
                const divData = [];
                divData.push(div.classList[0]);
                const divTile = JSON.parse(div.dataset.tile);
                divData.push(`${divTile.row}${divTile.col}`);

                dataArray.push(divData)
            };
        })
    }






    player1Turn = true;
    playerTurn = true;
    if (computerPlaying) {
        turnTo("playerTurn");
    } else {
        turnTo("player2");
    }


    checkMissilesActive()

    gameStarted = true;

    playerButtons.classList.add("started");
    playerButtons.classList.remove("notStarted");

    opponentButtons.classList.add("started");
    opponentButtons.classList.remove("notStarted");

    if (button.classList.contains("clicked")) {
        playerSquares.classList.add("notClickable");
    }

    const eachPlayerTiles = document.querySelectorAll(".player .tiles div");

    if (resetState) {


        playerBoard = {
            createdBoard: createCreatedBoard(dataArray),
            boardArray: createBoardArray(dataArray)
        }
        player1EventListeners();

    }

    if (!computerPlaying) {
        player1PointsText.classList.remove("hidden");
        player2PointsText.classList.remove("hidden");

    }



    // playerBoard = {
    //     boardArray: 
    // }

});

selfCreate.addEventListener("click", () => {
    resetState = false;
    reset.classList.remove("clicked");
    reset.classList.add("notClicked");
    playerShips.classList.add("notClickable");
    keys.classList.add("hidden");

    createPlayer1Board();

    const selectShips = document.querySelectorAll(".player .ships div");
    [...selectShips].forEach(ship => {
        ship.classList.remove("draged")
    })

})


reset.addEventListener("click", () => {
    reset.classList.add("clicked");
    reset.classList.remove("notClicked");
    keys.classList.remove("hidden");


    resetState = true;

    playerShips.classList.remove("notClickable");
    playerTiles.innerHTML = "";
    createSquares(playerTiles);
})

function checkMissilesActive() {
    if (player1Turn) {
        squareMissileButton.classList.remove("notClickable");
        lineMissileButton.classList.remove("notClickable");
        squareMissileButton2.classList.add("notClickable");
        lineMissileButton2.classList.add("notClickable");
    } else {
        squareMissileButton.classList.add("notClickable");
        lineMissileButton.classList.add("notClickable");
        squareMissileButton2.classList.remove("notClickable");
        lineMissileButton2.classList.remove("notClickable");
    }
}

lineMissileButton.addEventListener("click", () => {
    pRotate.classList.remove('hidden');

    lineMissileButton.classList.toggle("notClicked");
    lineMissileButton.classList.toggle("clicked");

    squareMissileP1Active = false;
    squareMissileButton.classList.remove("clicked");
    squareMissileButton.classList.add("notClicked");


    pausePoints = true;

    setTimeout(() => {
        lineMissileP1Active = !lineMissileP1Active;
        if (!lineMissileP1Active) {
            playerTiles.classList.remove(...playerTiles.classList);
            playerTiles.classList.add("tiles");
            lineMissileButton.classList.remove("clicked");
            lineMissileButton.classList.add("notClicked");
            pRotate.classList.add('hidden');
        }

    }, 0);
});

squareMissileButton.addEventListener("click", () => {
    squareMissileButton.classList.toggle("notClicked");
    squareMissileButton.classList.toggle("clicked");

    pRotate.classList.add('hidden');

    lineMissileP1Active = false;
    lineMissileButton.classList.remove("clicked");
    lineMissileButton.classList.add("notClicked");

    if (!lineMissileP1Active) {
        playerTiles.classList.remove(...playerTiles.classList);
        playerTiles.classList.add("tiles");
    }
    squareMissileP1Active = !squareMissileP1Active;

    if (!squareMissileP1Active) {
        squareMissileButton.classList.remove("clicked");
        squareMissileButton.classList.add("notClicked");
    }

    pausePoints = true;
});

lineMissileButton2.addEventListener("click", () => {
    oRotate.classList.remove('hidden');

    lineMissileButton2.classList.toggle("notClicked");
    lineMissileButton2.classList.toggle("clicked");

    squareMissileP2Active = false;
    squareMissileButton2.classList.remove("clicked");
    squareMissileButton2.classList.add("notClicked");

    pausePoints = true;

    setTimeout(() => {
        lineMissileP2Active = !lineMissileP2Active;
        if (!lineMissileP2Active) {
            opponentTiles.classList.remove(...opponentTiles.classList);
            opponentTiles.classList.add("tiles");
            lineMissileButton2.classList.remove("clicked");
            lineMissileButton2.classList.add("notClicked");
            oRotate.classList.add('hidden');
        }
    }, 0);
});

squareMissileButton2.addEventListener("click", () => {
    oRotate.classList.add('hidden');

    squareMissileButton2.classList.toggle("notClicked");
    squareMissileButton2.classList.toggle("clicked");

    lineMissileP2Active = false;
    lineMissileButton2.classList.remove("clicked");
    lineMissileButton2.classList.add("notClicked");

    pausePoints = true;

    if (!lineMissileP2Active) {
        opponentTiles.classList.remove(...opponentTiles.classList);
        opponentTiles.classList.add("tiles");
    }
    squareMissileP2Active = !squareMissileP2Active;

    if (!squareMissileP2Active) {
        squareMissileButton2.classList.remove("clicked");
        squareMissileButton2.classList.add("notClicked");
    }
});

// for draging ships for initial placment
shipsPlayer.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
        if (ship.classList.contains("draged")) {
            return;
        }
        if (e.key === "r") {
            e.preventDefault();
            e.stopPropagation();
            ship.classList.toggle("rotate");
        }
        ship.classList.add("draged");
        const shipName = ship.classList[2];
        const box = ship.getBoundingClientRect();
        const datavalue = whichCircle(shipName, e.clientX, e.clientY, box);
        ship.dataset.circle = JSON.stringify(datavalue);
    });

    ship.addEventListener("dragend", (e) => {
        ship.classList.remove("draged");
        const rect = playerTiles.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        placedShips.push(ship);
        if (
            !(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
        ) {
            placedShips.pop();
            return;
        }
        placedShipDimmer(placedShips);
        const dragObj = getDragElement(playerTiles, e.clientX, e.clientY);
        const removeElement = dragObj.element;
        const nums = removeElement.id.split("");
        const tile = getTileFromNumber(nums[0], nums[1]);
        const col = tile[0];
        const row = parseInt(tile.slice(1));
        const myPiece = ship.classList[2];
        insert(col, row, ship, myShips, playerTiles, myPiece);
    });
});

shipsOpponent.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
        if (ship.classList.contains("draged")) {
            return;
        }
        if (e.key === "r") {
            e.preventDefault();
            e.stopPropagation();
            ship.classList.toggle("rotate");
        }
        ship.classList.add("draged");
        const shipName = ship.classList[2];
        const box = ship.getBoundingClientRect();
        const datavalue = whichCircle(shipName, e.clientX, e.clientY, box);
        ship.dataset.circle = JSON.stringify(datavalue);
    });

    ship.addEventListener("dragend", (e) => {
        ship.classList.remove("draged");
        const rect = playerTiles.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        placedShips.push(ship);
        if (
            !(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
        ) {
            placedShips.pop();
            return;
        }
        placedShipDimmer(placedShips);
        const dragObj = getDragElement(playerTiles, e.clientX, e.clientY);
        const removeElement = dragObj.element;
        const nums = removeElement.id.split("");
        const tile = getTileFromNumber(nums[0], nums[1]);
        const col = tile[0];
        const row = parseInt(tile.slice(1));
        const myPiece = ship.classList[2];
        insert(col, row, ship, myShips, playerTiles, myPiece);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
        undo(playerTiles);
    }

    if (e.key === "r") {
        if (player1Turn && lineMissileP1Active) {
            if (player1LineMissileAlignment === "horizontal") {
                player1LineMissileAlignment = "vertical";
            } else {
                player1LineMissileAlignment = "horizontal";
            }

            // const lineType = playerTiles.classList[1];

            // const line = lineType.slice(lineType.length - 3);

            // // const newLineType;
            // if (line === "Row") {
            //     playerTiles.classList.remove(lineType);
            //     playerTiles.classList.add(`${lineType.slice(0, lineType.length - 3)}Col`);
            // } else {
            //     playerTiles.classList.remove(lineType);
            //     playerTiles.classList.add(`${lineType.slice(0, lineType.length - 3)}Row`);
            // }

            // playerTiles.classList.remove(...playerTiles.classList);
            // playerTiles.classList.add("tiles");
            // const { col, row } = getPosition(playerTiles, e.clientX, e.clientY);

            // lineMissile(playerTiles, col, row, player1LineMissileAlignment);
        }
        if (player2Turn && lineMissileP2Active) {
            if (player2LineMissileAlignment === "horizontal") {
                player2LineMissileAlignment = "vertical";
            } else {
                player2LineMissileAlignment = "horizontal";
            }
        }
    }
});

function player1EventListeners() {
    const dockedShips = [...document.querySelectorAll(".player .ship")];
    const clickedShips = [];

    tiles = document.querySelectorAll(".player .tile");
    tiles.forEach((tile) => {
        tile.addEventListener(
            "click",
            (event) => {
                if (!gameStarted) {
                    return;
                }
                tile.classList.add("miss");
                cMiss = true;
                sounds()
                tile.classList.add("notClickable")
                event.stopPropagation();
            },
            false
        );
    });

    ships = document.querySelectorAll(".player .tiles > div:not(.tile)");
    ships.forEach((ship) => {
        ship.addEventListener("click", (e) => {
            if (!gameStarted) {
                return;
            }

            if (clickedShips.indexOf(ship) === -1) {
                clickedShips.push(ship);
            }

            const { shift } = whichCircle(
                ship.classList[0],
                e.clientX,
                e.clientY,
                ship.getBoundingClientRect()
            );

            const circle = [...ship.children][shift];
            circle.classList.add("crossed");
            cHit = true;
            

            const allCrossedOut = [...ship.children].reduce((acc, child) => {
                if (!child.classList.contains("crossed")) {
                    return false;
                }
                return acc && true;
            }, true);
            if (allCrossedOut) {
                cSink = true;
                sounds()
                getSurroundingDivs(
                    ship.getBoundingClientRect(),
                    ship.classList[0],
                    "player"
                );
                const theShip = clickedShips.splice(clickedShips.indexOf(ship), 1)[0];
                const shipName = `${theShip.classList[0].split("_")[0]}_horizontal`;
                const pickedShip = dockedShips.reduce((acc, subShip) => {
                    if (subShip.classList.contains(shipName) && acc === null) {
                        [...subShip.children].forEach((theCircle) => {
                            theCircle.classList.add("crossed");
                        });
                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                    }
                    return acc || null;
                }, null);
            }
            sounds()



            e.stopPropagation();
        });
    });

}


function createPlayer1Board() {


    playerBoard = selfCreateBoard(playerTiles);

    player1EventListeners();


}

function opponentClickFunction(event) {
    if (computerPlaying) {
        if (playerTurn && !computerShooting) {
            if (event.target.classList.contains("tile")) {
                if (event.target.classList.contains("miss")) {
                    playerTurn = false;
                    turnTo("computerTurn");
                    playerSquares.classList.remove("notClickable");
                    computerShooting = true;
                    setTimeout(() => {
                        computerClicker();
                    }, 350);

                    computerShooting = false;
                    playerSquares.classList.add("notClickable");
                    event.target.classList.add("notClickable")
                }
            }
        }

        opponentTiles.classList.remove(...opponentTiles.classList);
        opponentTiles.classList.add("tiles");
    } else {
        if (player2Turn) {
            if (event.target.classList.contains("tile")) {
                if (event.target.classList.contains("miss")) {
                    player2Turn = false;
                    player1Turn = true;
                    turnTo("player2");

                    checkMissilesActive()

                    if (!pausePoints) {
                        player1Points += 5;
                        player1PointsText.textContent = `${player1Points}`
                    }

                    checkMissles()
                    event.target.classList.add("notClickable");


                } else if (!event.target.classList.contains("onlyTile")) {
                    if (!pausePoints) {
                        player1Points += 10;
                        player1PointsText.textContent = `${player1Points}`
                    }

                    checkMissles()
                }
            }
        }

        opponentTiles.classList.remove(...opponentTiles.classList);
        opponentTiles.classList.add("tiles");
    }
}

function checkMissles() {
    if (player2Points >= 49) {
        squareMissileButton.classList.remove("cantAfford");
    } else {
        squareMissileButton.classList.add("cantAfford");
    }

    if (player2Points >= 79) {
        lineMissileButton.classList.remove("cantAfford");
    } else {
        lineMissileButton.classList.add("cantAfford");
    }

    if (player1Points >= 49) {
        squareMissileButton2.classList.remove("cantAfford");
    } else {
        squareMissileButton2.classList.add("cantAfford");
    }

    if (player1Points >= 79) {
        lineMissileButton2.classList.remove("cantAfford");
    } else {
        lineMissileButton2.classList.add("cantAfford");
    }
}

function createOpponentBoardOnPlayer2(withComputerClicker) {
    opponentIndividualTiles = document.querySelector(".opponent .tiles");




    opponentIndividualTiles.removeEventListener("click", opponentClickFunction);
    opponentIndividualTiles.addEventListener("click", opponentClickFunction);

    // if (computerPlaying) {
    //     opponentIndividualTiles.addEventListener("click", (event) => {
    //         if (playerTurn) {
    //             if (event.target.classList.contains("tile")) {
    //                 if (event.target.classList.contains("miss")) {
    //                     playerTurn = false;
    //                     playerSquares.classList.remove("notClickable");
    //                     computerClicker();
    //                     playerSquares.classList.add("notClickable");
    //                 }
    //             }
    //         }

    //         opponentTiles.classList.remove(...opponentTiles.classList);
    //         opponentTiles.classList.add("tiles");
    //     });
    // } else {
    //     opponentIndividualTiles.addEventListener("click", (event) => {
    //         if (player2Turn) {
    //             if (event.target.classList.contains("tile")) {
    //                 if (event.target.classList.contains("miss")) {
    //                     player2Turn = false;
    //                     player1Turn = true;
    //                 }
    //             }
    //         }

    //         opponentTiles.classList.remove(...opponentTiles.classList);
    //         opponentTiles.classList.add("tiles");
    //     });
    // }

    opponentIndividualTiles.addEventListener("mousemove", (event) => {
        if (player2Turn && squareMissileP2Active) {
            const madeClickable = [];


            [...opponentIndividualTiles.children].forEach(element => {
                madeClickable.push(element)
                element.classList.remove("notClickable")
            })

            const square =
                opponentIndividualTiles.children[
                opponentIndividualTiles.children.length - 1
                ];
            square.classList.add("hoverable");
            if (square.classList.contains("squareMissile")) {
                square.remove();
            }

            let { row, col } = getPosition(
                opponentIndividualTiles,
                event.clientX,
                event.clientY
            );
            if (row === -1 || col === -1) {
                return;
            }
            if (row === 0) {
                row = 1;
            }
            if (row === 9) {
                row = 8;
            }
            if (col === 0) {
                col = 1;
            }
            if (col === 9) {
                col = 8;
            }

            const box = opponentIndividualTiles.getBoundingClientRect();

            const squareMissile = document.createElement("div");
            squareMissile.classList.add("squareMissile");
            squareMissile.style.left = `${9 + 17 - 59 + 41 * col}px`;
            squareMissile.style.top = `${17 - 59 + 41 * row}px`;
            opponentIndividualTiles.appendChild(squareMissile);

            madeClickable.forEach(element => element.classList.add("notclickable"))
        }
    });

    opponentIndividualTiles.addEventListener("mouseout", () => {

        const square =
            opponentIndividualTiles.children[
            opponentIndividualTiles.children.length - 1
            ];
        square.classList.add("hoverable");
        if (square.classList.contains("squareMissile")) {
            square.remove();
        }
        square.classList.remove("hoverable")
    });

    const { createdBoard, boardArray } = opponentCreateBoard(opponentTiles);
    tilesOp = document.querySelectorAll(".opponent .tile");

    const clickedShips = [];

    const dockedShips = [...document.querySelectorAll(".opponent .ship")];

    tilesOp.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (!gameStarted) {
                return;
            }
            if (computerPlaying && !computerShooting) {
                if (playerTurn) {
                    if (squareMissileP2Active) {
                        setTimeout(() => {
                            squareMissileP2Active = false;
                            squareMissileButton2.classList.remove("clicked");
                            squareMissileButton2.classList.add("notClicked");

                        }, 0);
                    }

                    if (lineMissileP2Active) {
                        setTimeout(() => {
                            lineMissileP2Active = false;
                            lineMissileButton2.classList.remove("clicked");
                            lineMissileButton2.classList.add("notClicked");
                            oRotate.classList.add('hidden');

                        }, 0);
                    }

                    if (tile.classList.contains("onlyTile")) {
                        tile.classList.add("miss");
                        pMiss = true;
                        sounds()
                        tile.classList.add("notClickable");
                    } else if (
                        tile.classList[1].split("")[
                        tile.classList[1].split("").length - 1
                        ] === "-"
                    ) {
                        pHit = true;

                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                            clickedShips.push(tile.classList[1].slice(0, -1));
                        }
                    } else {
                        tile.classList.add("crossedTile");
                        pHit = true;
                        
                        if (clickedShips.indexOf(tile.classList[1]) === -1) {
                            clickedShips.push(tile.classList[1]);
                        }
                    }

                    if (clickedShips.length !== 0) {
                        clickedShips.forEach((ship) => {
                            const shipTiles = document.querySelectorAll(
                                `.${ship}, .${ship}-`
                            );

                            const allHaveBeenClicked = [...shipTiles].reduce(
                                (acc, shipTile) => {
                                    if (!shipTile.classList.contains("crossedTile")) {
                                        return false;
                                    }
                                    return acc && true;
                                },
                                true
                            );
                            if (allHaveBeenClicked) {
                                pSink = true;
                                sounds()
                                let newShip;
                                shipTiles.forEach((shipTile) => {
                                    if (shipTile.classList.contains(`${ship}`)) {
                                        newShip = createShips(ship.split("X")[0]);
                                        [...newShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        });
                                        shipTile.parentElement.insertBefore(newShip, shipTile);
                                        shipTile.parentElement.removeChild(shipTile);
                                    } else {
                                        shipTile.parentElement.removeChild(shipTile);
                                    }
                                });
                                getSurroundingDivs(
                                    newShip.getBoundingClientRect(),
                                    newShip.classList[0],
                                    "opponent"
                                );
                                const theShip = clickedShips.splice(
                                    clickedShips.indexOf(ship),
                                    1
                                );
                                const shipName = `${theShip[0].split("X")[0].split("_")[0]
                                    }_horizontal`;
                                const pickedShip = dockedShips.reduce((acc, subShip) => {
                                    if (subShip.classList.contains(shipName) && acc === null) {
                                        [...subShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        });
                                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                    }
                                    return acc || null;
                                }, null);
                            }
                        });
                    }
                    sounds()
                }
            } else if (!computerPlaying) {
                if (player2Turn) {
                    if (squareMissileP2Active) {
                        setTimeout(() => {
                            squareMissileP2Active = false;
                            squareMissileButton2.classList.remove("clicked");
                            squareMissileButton2.classList.add("notClicked");


                        }, 0);
                    }

                    if (lineMissileP2Active) {
                        setTimeout(() => {
                            lineMissileP2Active = false;
                            lineMissileButton2.classList.remove("clicked");
                            lineMissileButton2.classList.add("notClicked");
                            oRotate.classList.add('hidden');


                        }, 0);
                    }

                    if (tile.classList.contains("onlyTile")) {
                        tile.classList.add("miss");
                        tile.classList.add("notClickable");
                        p2Miss = true;
                        sounds()
                        // player2Points += 5;
                        // player2PointsText.textContent = `${player2Points}`
                    } else if (
                        tile.classList[1].split("")[
                        tile.classList[1].split("").length - 1
                        ] === "-"
                    ) {
                        p2Hit = true;
                        sounds()
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                            clickedShips.push(tile.classList[1].slice(0, -1));
                        }
                    } else {
                        p2Hit = true;
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1]) === -1) {
                            clickedShips.push(tile.classList[1]);
                        }
                    }

                    if (clickedShips.length !== 0) {
                        clickedShips.forEach((ship) => {
                            const shipTiles = document.querySelectorAll(
                                `.${ship}, .${ship}-`
                            );

                            const allHaveBeenClicked = [...shipTiles].reduce(
                                (acc, shipTile) => {
                                    if (!shipTile.classList.contains("crossedTile")) {
                                        return false;
                                    }
                                    return acc && true;
                                },
                                true
                            );
                            if (allHaveBeenClicked) {
                                p2Sink = true;
                                sounds()
                                let newShip;
                                shipTiles.forEach((shipTile) => {
                                    if (shipTile.classList.contains(`${ship}`)) {
                                        newShip = createShips(ship.split("X")[0]);
                                        [...newShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        });
                                        shipTile.parentElement.insertBefore(newShip, shipTile);
                                        shipTile.parentElement.removeChild(shipTile);
                                    } else {
                                        shipTile.parentElement.removeChild(shipTile);
                                    }
                                });
                                getSurroundingDivs(
                                    newShip.getBoundingClientRect(),
                                    newShip.classList[0],
                                    "opponent"
                                );
                                const theShip = clickedShips.splice(
                                    clickedShips.indexOf(ship),
                                    1
                                );
                                const shipName = `${theShip[0].split("X")[0].split("_")[0]
                                    }_horizontal`;
                                const pickedShip = dockedShips.reduce((acc, subShip) => {
                                    if (subShip.classList.contains(shipName) && acc === null) {
                                        [...subShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        });
                                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                    }
                                    return acc || null;
                                }, null);
                            }
                        });
                    }
                    sounds()
                }
            }
        });
    });
}

function createOpponentBoardOnPlayer1() {
    playerIndividualTiles = document.querySelector(".player .tiles");

    playerIndividualTiles.addEventListener("click", (event) => {
        if (player1Turn) {
            if (event.target.classList.contains("tile")) {
                if (event.target.classList.contains("miss")) {
                    player1Turn = false;
                    player2Turn = true;
                    turnTo("player1");

                    checkMissilesActive()


                    if (!pausePoints) {
                        player2Points += 5;
                        player2PointsText.textContent = `${player2Points}`
                    }
                    checkMissles()
                    event.target.classList.add("notClickable");
                } else if (!event.target.classList.contains("onlyTile")) {
                    if (!pausePoints) {
                        player2Points += 10;
                        player2PointsText.textContent = `${player2Points}`
                    }
                    checkMissles()

                }
            }

            playerTiles.classList.remove(...playerTiles.classList);
            playerTiles.classList.add("tiles");
        }
    });

    playerIndividualTiles.addEventListener("mousemove", (event) => {
        if (player1Turn && squareMissileP1Active) {
            const madeClickable = [];


            [...playerIndividualTiles.children].forEach(element => {
                madeClickable.push(element)
                element.classList.remove("notClickable")
            })

            const square =
                playerIndividualTiles.children[
                playerIndividualTiles.children.length - 1
                ];
            if (square.classList.contains("squareMissile")) {
                square.remove();
            }

            let { row, col } = getPosition(
                playerIndividualTiles,
                event.clientX,
                event.clientY
            );

            if (row === -1 || col === -1) {
                return;
            }
            if (row === 0) {
                row = 1;
            }
            if (row === 9) {
                row = 8;
            }
            if (col === 0) {
                col = 1;
            }
            if (col === 9) {
                col = 8;
            }

            const box = playerIndividualTiles.getBoundingClientRect();

            const squareMissile = document.createElement("div");
            squareMissile.classList.add("squareMissile");
            squareMissile.style.left = `${9 + 17 - 59 + 41 * col}px`;
            squareMissile.style.top = `${17 - 59 + 41 * row}px`;
            playerIndividualTiles.appendChild(squareMissile);


            madeClickable.forEach(element => element.classList.add("notclickable"))
        }
    });

    playerIndividualTiles.addEventListener("mouseout", () => {
        const square =
            playerIndividualTiles.children[playerIndividualTiles.children.length - 1];
        if (square.classList.contains("squareMissile")) {
            square.remove();
        }
    });

    const { createdBoard, boardArray } = opponentCreateBoard(playerTiles);
    tilesOp1 = document.querySelectorAll(".player .tile");

    const clickedShips = [];

    const dockedShips = [...document.querySelectorAll(".player .ship")];


    tilesOp1.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (!gameStarted) {
                return;
            }
            if (player1Turn) {
                if (squareMissileP1Active) {
                    setTimeout(() => {
                        squareMissileP1Active = false;
                        squareMissileButton.classList.remove("clicked");
                        squareMissileButton.classList.add("notClicked");

                    }, 0);
                }

                if (lineMissileP1Active) {
                    setTimeout(() => {
                        lineMissileP1Active = false;
                        lineMissileButton.classList.remove("clicked");
                        lineMissileButton.classList.add("notClicked");
                        pRotate.classList.add('hidden');


                    }, 0);
                }
                if (tile.classList.contains("onlyTile")) {
                    tile.classList.add("miss");
                    tile.classList.add("notClickable");
                    p1Miss = true;
                    sounds()
                } else if (
                    tile.classList[1].split("")[
                    tile.classList[1].split("").length - 1
                    ] === "-"
                ) {
                    p1Hit = true;

                    tile.classList.add("crossedTile");
                    if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                        clickedShips.push(tile.classList[1].slice(0, -1));
                    }
                } else {
                    p1Hit = true;
                    sounds()
                    tile.classList.add("crossedTile");
                    if (clickedShips.indexOf(tile.classList[1]) === -1) {
                        clickedShips.push(tile.classList[1]);
                    }
                }

                if (clickedShips.length !== 0) {
                    clickedShips.forEach((ship) => {
                        const shipTiles = document.querySelectorAll(`.${ship}, .${ship}-`);

                        const allHaveBeenClicked = [...shipTiles].reduce(
                            (acc, shipTile) => {
                                if (!shipTile.classList.contains("crossedTile")) {
                                    return false;
                                }
                                return acc && true;
                            },
                            true
                        );
                        if (allHaveBeenClicked) {
                            p1Sink = true;
                            sounds()
                            let newShip;
                            shipTiles.forEach((shipTile) => {
                                if (shipTile.classList.contains(`${ship}`)) {
                                    newShip = createShips(ship.split("X")[0]);
                                    [...newShip.children].forEach((circle) => {
                                        circle.classList.add("crossed");
                                    });
                                    shipTile.parentElement.insertBefore(newShip, shipTile);
                                    shipTile.parentElement.removeChild(shipTile);
                                } else {
                                    shipTile.parentElement.removeChild(shipTile);
                                }
                            });
                            getSurroundingDivs(
                                newShip.getBoundingClientRect(),
                                newShip.classList[0],
                                "player"
                            );
                            const theShip = clickedShips.splice(
                                clickedShips.indexOf(ship),
                                1
                            );
                            const shipName = `${theShip[0].split("X")[0].split("_")[0]
                                }_horizontal`;
                            const pickedShip = dockedShips.reduce((acc, subShip) => {
                                if (subShip.classList.contains(shipName) && acc === null) {
                                    [...subShip.children].forEach((circle) => {
                                        circle.classList.add("crossed");
                                    });
                                    return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                }
                                return acc || null;
                            }, null);
                        }
                    });
                }
                sounds()
            }
        });
    });
}

// opponentCreate.addEventListener(
//     "click",
//     createOpponentBoardOnPlayer2.bind(null, true)
// );

const shipsThatHit = [];

const tilesOverlayArrayP2 = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "76",
    "77",
    "78",
    "79",
    "80",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "90",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
];



function computerClicker() {
    if (tilesOverlayDivsCopy.length === 0) {
        return;
    }
    let chosenTileDiv;
    // if (shipsThatHit.length !== 0) {
    setTimeout(() => {
        if (!checkIfAllHitsFinished(tilesOverlayArray)) {
            const { myTilesOverlay, tile, surroundingTiles } = shoot(
                tilesOverlayArray,
                playerBoard.boardArray,
                0
            );
            tilesOverlayArray = myTilesOverlay;
            chosenTileDiv = tilesOverlayDivsCopy.reduce((acc, tileOv, index) => {
                if (tileOv.classList[0] === `${tile}`) {
                    return tilesOverlayDivsCopy.splice(index, 1)[0];
                }
                return acc;
            }, null);
            chosenTileDiv.click();
            if (
                isNaN(playerBoard.boardArray[parseInt(chosenTileDiv.classList[0], 10)])
            ) {
                computerClicker();
            } else {
                playerTurn = true;
                turnTo("playerTurn");
            }

            const missDivs = surroundingTiles.map((num) => {
                const theDiv = tilesOverlayDivsCopy.reduce((acc, value, index) => {
                    if (value.classList[0] === num) {
                        return tilesOverlayDivsCopy.splice(index, 1)[0];
                    }
                    return acc;
                }, null);
                return theDiv;
            });
            missDivs.forEach((div) => {
                if (div !== null) {
                    div.click();
                    div.classList.add("notClickable");
                }
            });
        } else {
            const { chosenTile } = clickRandomTiles(tilesOverlayDivsCopy);
            chosenTileDiv = chosenTile;
            const myRandomNumber = chosenTileDiv.classList[0];
            const { myTilesOverlay, tile, surroundingTiles } = shoot(
                tilesOverlayArray,
                playerBoard.boardArray,
                myRandomNumber
            );
            tilesOverlayArray = myTilesOverlay;
            chosenTileDiv.click();
            if (
                isNaN(playerBoard.boardArray[parseInt(chosenTileDiv.classList[0], 10)])
            ) {
                playerTurn = false;
                turnTo("computerTurn");
                computerClicker();
            } else {
                playerTurn = true;
                turnTo("playerTurn");
            }

            // tilesOverlayDivsCopy.splice(parseInt(myRandomNumber, 10), 1);

            const missDivs = surroundingTiles.map((num) => {
                const theDiv = tilesOverlayDivsCopy.reduce((acc, value, index) => {
                    if (value.classList[0] === num) {
                        return tilesOverlayDivsCopy.splice(index, 1)[0];
                    }
                    return acc;
                }, null);
                return theDiv;
            });
            missDivs.forEach((div) => {
                if (div !== null) {
                    div.click();
                    div.classList.add("notClickable");
                }
            });
        }
    }, 350)

}

function startComputerClicker() {
    playerTurn = true;
    turnTo("playerTurn");

    let chosenDiv = computerClicker().chosenTileDiv;

    while (isNaN(playerBoard.boardArray[parseInt(chosenDiv.classList[0], 10)])) {
        chosenDiv = computerClicker().chosenTileDiv;
    }
}

function clicker() {
    if (tilesOverlayDivsCopy.length === 0) {
        return;
    }
    let chosen = "";
    if (shipsThatHit.length !== 0) {
        chosen = { myTilesCopy: shipsThatHit.shouldClick.pop() };
    } else {
        chosen = clickRandomTiles(tilesOverlayDivsCopy);
    }

    tilesOverlayDivsCopy = chosen.myTilesCopy;
    chosen.chosenTile.click();
}

tilesOverlayDivs.forEach((tile) => {
    tilesOverlayDivsCopy = [...tilesOverlayDivsCopy];
    tile.addEventListener(
        "click",
        () => {
            const box = tile.getBoundingClientRect();
            [...thePlayerTiles[0].children].forEach((playerTile) => {
                if (
                    isPointInsideDiv(
                        playerTile,
                        box.x + box.width / 2,
                        box.y + box.height / 2
                    )
                ) {
                    const xValue = box.x + box.width / 2;
                    const yValue = box.y + box.height / 2;
                    const clickEvent = new MouseEvent("click", {
                        clientX: xValue,
                        clientY: yValue,
                        bubbles: true,
                    });
                    playerTile.dispatchEvent(clickEvent);

                    // takeOutClickedTiles(tilesOverlayDivsCopy);

                    const isPlayerFullyClicked = [...playerTile.children].reduce(
                        (acc, circle) => {
                            if (!circle.classList.contains("crossed")) {
                                return false;
                            }
                            return acc && true;
                        },
                        true
                    );

                    if (!playerTile.classList.contains("tile")) {
                        if (isPlayerFullyClicked) {
                            shipsThatHit.pop();
                        } else if (shipsThatHit.indexOf(playerTile) === -1) {
                            const [row, col] = tile.classList[0]
                                .split("")
                                .map((string) => parseInt(string, 10));
                            shipsThatHit.push({
                                ship: playerTile,
                                shouldClick: [`${row}${col + 1}`, `${row}${col - 1}`],
                                alignment: "horizontal",
                                start: tile.classList[0],
                            });
                        }
                    }
                }
            });
        },
        false
    );
});

function isPointInsideDiv(div, x, y) {
    const rect = div.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function takeOutClickedTiles(overlayedTiles) {
    overlayedTiles.forEach((tile) => {
        const box = tile.getBoundingClientRect();
        [...thePlayerTiles[0].children].forEach((playerTile) => {
            if (
                isPointInsideDiv(
                    playerTile,
                    box.x + box.width / 2,
                    box.y + box.height / 2
                )
            ) {
                if (playerTile.classList.contains("miss")) {
                    // const index = [overlayedTiles].reduce((acc, tileOv, ind) => {
                    //     if (tileOv.classList[0] === tile.classList[0]) {
                    //         return ind
                    //     }
                    //     return acc
                    // }, 1000)
                    overlayedTiles.splice(overlayedTiles.indexOf(tile), 1);

                }
            }
        });
    });
}

function playGamePVE() {
    computerPlaying = true;
    createPlayer1Board();
    createOpponentBoardOnPlayer2(true);
}

function playGamePVP() {
    computerPlaying = false;

    createOpponentBoardOnPlayer1();
    createOpponentBoardOnPlayer2(false);
    document.querySelectorAll("player .tile").forEach((tile) => {
        tile.addEventListener("click", (e) => {
            if (e.target.classList.contains("overlay")) {
            }
        });
    });
}

playerTiles.addEventListener("mousemove", (event) => {
    if (lineMissileP1Active) {
        const { col, row } = getPosition(playerTiles, event.clientX, event.clientY);
        lineMissile(playerTiles, col, row, player1LineMissileAlignment);
    }
});

opponentTiles.addEventListener("mousemove", (event) => {
    if (lineMissileP2Active) {
        const { col, row } = getPosition(
            opponentTiles,
            event.clientX,
            event.clientY
        );
        lineMissile(opponentTiles, col, row, player2LineMissileAlignment);
    }
});

playerIndividualTiles.forEach((tile) => {

    tile.addEventListener("click", (e) => {
        if (e.target.classList.contains("overlay")) {
        }
    });
});

playerTiles.addEventListener("click", (e) => {
    if (squareMissileP1Active || lineMissileP1Active) {
        const tile = [...player1Overlays].reduce((acc, value) => {
            const box = value.getBoundingClientRect();

            if (
                e.clientX > box.left &&
                e.clientX < box.right &&
                e.clientY > box.top &&
                e.clientY < box.bottom
            ) {
                acc = value.classList[0];
                return acc;
            }
            return acc;
        }, null);

        if (tile === null) {
            return;
        }

        const clickEvent = new MouseEvent("click", {
            bubbles: true, // Simulates a user click
            cancelable: true, // Allows default behavior to be prevented
            view: window,
        });

        eachPlayerTile = document.querySelectorAll(".player .tile");

        if (squareMissileP1Active) {
            const allTiles = getSquareTiles(tile);
            allTiles.forEach((chosenTile) => {
                const tileDiv = [...player1Overlays].reduce((acc, value) => {
                    if (value.classList[0] === chosenTile) {
                        acc = value;
                        return acc;
                    }
                    return acc;
                }, null);

                if (!tileDiv) {
                    return;
                }

                const box = tileDiv.getBoundingClientRect();
                const centerX = box.left + box.width / 2;
                const centerY = box.top + box.height / 2;
                playerTiles.classList.add("tiles");

                const playerTile = [...eachPlayerTile].reduce((acc, value) => {
                    const valueBox = value.getBoundingClientRect();
                    if (
                        centerX > valueBox.left &&
                        centerX < valueBox.right &&
                        centerY > valueBox.top &&
                        centerY < valueBox.bottom
                    ) {
                        return value;
                    }
                    return acc;
                }, null);

                if (playerTile) {
                    playerTile.dispatchEvent(clickEvent);
                    player1Turn = true;
                    player2Turn = false;
                    turnTo("player2");

                    checkMissilesActive()
                }
            });
            p1BigBomb = true;
            sounds()
            setTimeout(() => {
                pausePoints = false;
            }, 200)
            player2Points -= 50;
            player2PointsText.textContent = `${player2Points}`;
        }

        if (lineMissileP1Active) {
            const allTiles = getLineTiles(tile, player1LineMissileAlignment);

            allTiles.forEach((chosenTile) => {
                const tileDiv = [...player1Overlays].reduce((acc, value) => {
                    if (value.classList[0] === chosenTile) {
                        acc = value;
                        return acc;
                    }
                    return acc;
                }, null);

                if (!tileDiv) {
                    return;
                }

                const box = tileDiv.getBoundingClientRect();
                const centerX = box.left + box.width / 2;
                const centerY = box.top + box.height / 2;
                playerTiles.classList.add("tiles");

                const playerTile = [...eachPlayerTile].reduce((acc, value) => {
                    const valueBox = value.getBoundingClientRect();
                    if (
                        centerX > valueBox.left &&
                        centerX < valueBox.right &&
                        centerY > valueBox.top &&
                        centerY < valueBox.bottom
                    ) {
                        return value;
                    }
                    return acc;
                }, null);

                if (playerTile) {
                    playerTile.dispatchEvent(clickEvent);
                    player1Turn = true;
                    player2Turn = false;
                    turnTo("player2");

                    checkMissilesActive()
                }

                player1Turn = true;
                player2Turn = false;
                turnTo("player2");

            });
            p1AirStrike = true;
            sounds()
            setTimeout(() => {
                pausePoints = false;
            }, 200)
            player2Points -= 80;
            player2PointsText.textContent = `${player2Points}`;
        }
    }
});

opponentTiles.addEventListener("click", (e) => {
    if (squareMissileP2Active || lineMissileP2Active) {
        const tile = [...player2Overlays].reduce((acc, value) => {
            const box = value.getBoundingClientRect();

            if (
                e.clientX > box.left &&
                e.clientX < box.right &&
                e.clientY > box.top &&
                e.clientY < box.bottom
            ) {
                acc = value.classList[0];
                return acc;
            }
            return acc;
        }, null);

        if (tile === null) {
            return;
        }

        const clickEvent = new MouseEvent("click", {
            bubbles: true, // Simulates a user click
            cancelable: true, // Allows default behavior to be prevented
            view: window,
        });

        eachPlayerTile = document.querySelectorAll(".opponent .tile");

        if (squareMissileP2Active) {
            const allTiles = getSquareTiles(tile);

            allTiles.forEach((chosenTile) => {
                const tileDiv = [...player2Overlays].reduce((acc, value) => {
                    if (value.classList[0] === chosenTile) {
                        acc = value;
                        return acc;
                    }
                    return acc;
                }, null);

                if (!tileDiv) {
                    return;
                }

                const box = tileDiv.getBoundingClientRect();
                const centerX = box.left + box.width / 2;
                const centerY = box.top + box.height / 2;
                opponentTiles.classList.add("tiles");

                const playerTile = [...eachPlayerTile].reduce((acc, value) => {
                    const valueBox = value.getBoundingClientRect();
                    if (
                        centerX > valueBox.left &&
                        centerX < valueBox.right &&
                        centerY > valueBox.top &&
                        centerY < valueBox.bottom
                    ) {
                        return value;
                    }
                    return acc;
                }, null);

                if (playerTile) {
                    playerTile.dispatchEvent(clickEvent);
                    player2Turn = true;
                    player1Turn = false;
                    turnTo("player1");

                    checkMissilesActive()
                }
            });
            p2BigBomb = true;
            sounds()
            setTimeout(() => {
                pausePoints = false;
            }, 200)
            player1Points -= 50;
            player1PointsText.textContent = `${player1Points}`;
        }

        if (lineMissileP2Active) {
            const allTiles = getLineTiles(tile, player2LineMissileAlignment);

            allTiles.forEach((chosenTile) => {
                const tileDiv = [...player2Overlays].reduce((acc, value) => {
                    if (value.classList[0] === chosenTile) {
                        acc = value;
                        return acc;
                    }
                    return acc;
                }, null);

                if (!tileDiv) {
                    return;
                }

                const box = tileDiv.getBoundingClientRect();
                const centerX = box.left + box.width / 2;
                const centerY = box.top + box.height / 2;
                opponentTiles.classList.add("tiles");

                const playerTile = [...eachPlayerTile].reduce((acc, value) => {
                    const valueBox = value.getBoundingClientRect();
                    if (
                        centerX > valueBox.left &&
                        centerX < valueBox.right &&
                        centerY > valueBox.top &&
                        centerY < valueBox.bottom
                    ) {
                        return value;
                    }
                    return acc;
                }, null);

                if (playerTile) {
                    playerTile.dispatchEvent(clickEvent);
                    player2Turn = true;
                    player1Turn = false;
                    turnTo("player1");

                    checkMissilesActive()
                }

                player1Turn = false;
                player2Turn = true;
                turnTo("player1");

            });
            p2AirStrike = true;
            sounds()
            setTimeout(() => {
                pausePoints = false;
            }, 200)
            player1Points -= 80;
            player1PointsText.textContent = `${player1Points}`;
        }
    }
});
// check

// .opponentTiles.addEventListener("click", (e) => {

// })



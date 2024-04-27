import json5 from "json5";
import { VERSION, pick, result } from "lodash";
import { createSquares, myShips, createShips, getTile, insertAt, insert, getDragElement, getTileFromNumber, whichCircle, undo, rotate, numToLetters, finalTile, flippable, placedShipDimmer, placedShips, selfCreateBoard, getSurroundingDivs, opponentCreateBoard, checkSurrounding, shoot, checkIfAllHitsFinished, clickRandomTiles, getTypeOfSquare } from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const shipsPlayer = document.querySelectorAll(".player .ship");
const shipsOpponent = document.querySelectorAll(".opponent .ship")
const individualships = document.querySelectorAll(".ship");
const selfCreate = document.querySelector(".playerRefresh");
const opponentCreate = document.querySelector(".opponentRefresh");
const tileDivs = document.querySelectorAll(".tiles > div");
const tilesOverlayDivs = document.querySelectorAll(".tilesOverlay div");
const thePlayerTiles = document.querySelectorAll(".player .tiles")
const button = document.querySelector(".start_button");
let opponentIndividualTiles = document.querySelectorAll(".opponent .tile");
let playerIndividualTiles = document.querySelectorAll(".player .tile");
let playerBoard = null;
let tilesOverlayDivsCopy = [...tilesOverlayDivs];
const pvp = document.querySelector(".pvp");

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
let playerTurn = true;

// for PVP
let player1Turn = true;
let player2Turn = false;



createSquares(playerTiles);
createSquares(opponentTiles);

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
    })

    ship.addEventListener("dragend", (e) => {
        ship.classList.remove("draged")
        const rect = playerTiles.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        placedShips.push(ship);
        if (!(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)) {
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
    })
})

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
    })

    ship.addEventListener("dragend", (e) => {
        ship.classList.remove("draged")
        const rect = playerTiles.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        placedShips.push(ship);
        if (!(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)) {
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
    })
})


document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
        undo(playerTiles);
    }
})



function createPlayer1Board() {
    const dockedShips = [...document.querySelectorAll(".player .ship")];
    const clickedShips = [];

    playerBoard = selfCreateBoard(playerTiles);

    tiles = document.querySelectorAll(".player .tile");
    tiles.forEach((tile) => {
        tile.addEventListener("click", (event) => {
            tile.classList.add("miss");
            event.stopPropagation();
        }, false)

    });

    ships = document.querySelectorAll(".player .tiles > div:not(.tile)");
    ships.forEach((ship) => {
        ship.addEventListener("click", (e) => {

            if (clickedShips.indexOf(ship) === -1) {
                clickedShips.push(ship);
            }
            const { shift } = whichCircle(ship.classList[0], e.clientX, e.clientY, ship.getBoundingClientRect());
            const circle = [...ship.children][shift];
            circle.classList.add("crossed");

            const allCrossedOut = [...ship.children].reduce((acc, child) => {
                if (!child.classList.contains("crossed")) {
                    return false
                }
                return acc && true;
            }, true);
            if (allCrossedOut) {
                getSurroundingDivs(ship.getBoundingClientRect(), ship.classList[0], "player");
                const theShip = clickedShips.splice(clickedShips.indexOf(ship), 1)[0];
                const shipName = `${theShip.classList[0].split("_")[0]}_horizontal`;
                const pickedShip = dockedShips.reduce((acc, subShip) => {
                    if (subShip.classList.contains(shipName) && acc === null) {
                        [...subShip.children].forEach((theCircle) => {
                            theCircle.classList.add("crossed");
                        })
                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                    }
                    return acc || null;
                }, null);
            }

            e.stopPropagation();
        }
        )
    })
}

selfCreate.addEventListener("click", createPlayer1Board);

function createOpponentBoardOnPlayer2(withComputerClicker) {
    opponentIndividualTiles = document.querySelector(".opponent .tiles");

    if (withComputerClicker) {
        opponentIndividualTiles.addEventListener("click", (event) => {
            if (playerTurn) {
                if (event.target.classList.contains("tile")) {
                    if (event.target.classList.contains("miss")) {
                        playerTurn = false;
                        setTimeout(startComputerClicker);
                    }
                }
            }
        })
    } else {
        opponentIndividualTiles.addEventListener("click", (event) => {

            if (player2Turn) {
                if (event.target.classList.contains("tile")) {
                    console.log(event.target)
                    if (event.target.classList.contains("miss")) {
                        player2Turn = false;
                        player1Turn = true;
                    }
                }
            }
        })

        opponentIndividualTiles.addEventListener("mouseover", (event) => {

            if (player2Turn) {
                if (event.target.classList.contains("tile")) {
                    console.log(getTypeOfSquare(`${Array.prototype.indexOf.call(event.target.parentElement.children, event.target)}`.padStart(2, "0")))
                    event.target.classList.add(`${getTypeOfSquare(`${Array.prototype.indexOf.call(event.target.parentElement.children, event.target)}`.padStart(2, "0"))}`)
                }
            }
        })

        opponentIndividualTiles.addEventListener("mouseout", (event) => {
            if (player2Turn) {
                if (event.target.classList.contains("tile")) {
                    event.target.classList.remove(`${getTypeOfSquare(`${Array.prototype.indexOf.call(event.target.parentElement.children, event.target)}`.padStart(2, "0"))}`)
                }
            }
        })


    }


    const { createdBoard, boardArray } = opponentCreateBoard(opponentTiles);
    tilesOp = document.querySelectorAll(".opponent .tile");

    const clickedShips = [];

    const dockedShips = [...document.querySelectorAll(".opponent .ship")];


    tilesOp.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (withComputerClicker) {
                if (playerTurn) {
                    if (tile.classList.contains("onlyTile")) {
                        tile.classList.add("miss");
                    } else if (tile.classList[1].split("")[tile.classList[1].split("").length - 1] === "-") {
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                            clickedShips.push(tile.classList[1].slice(0, -1));
                        }
                    } else {
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1]) === -1) {
                            clickedShips.push(tile.classList[1]);
                        }
                    }

                    if (clickedShips.length !== 0) {
                        clickedShips.forEach((ship) => {
                            const shipTiles = document.querySelectorAll(`.${ship}, .${ship}-`);


                            const allHaveBeenClicked = [...shipTiles].reduce((acc, shipTile) => {
                                if (!shipTile.classList.contains("crossedTile")) {
                                    return false
                                }
                                return acc && true
                            }, true)
                            if (allHaveBeenClicked) {
                                let newShip;
                                shipTiles.forEach((shipTile) => {
                                    if (shipTile.classList.contains(`${ship}`)) {
                                        newShip = createShips(ship.split("X")[0]);
                                        [...newShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        })
                                        shipTile.parentElement.insertBefore(newShip, shipTile);
                                        shipTile.parentElement.removeChild(shipTile);
                                    } else {
                                        shipTile.parentElement.removeChild(shipTile);
                                    }
                                })
                                getSurroundingDivs(newShip.getBoundingClientRect(), newShip.classList[0], "opponent");
                                const theShip = clickedShips.splice(clickedShips.indexOf(ship), 1);
                                const shipName = `${theShip[0].split("X")[0].split("_")[0]}_horizontal`;
                                const pickedShip = dockedShips.reduce((acc, subShip) => {
                                    if (subShip.classList.contains(shipName) && acc === null) {
                                        [...subShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        })
                                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                    }
                                    return acc || null;
                                }, null);

                            }
                        })

                    }
                }
            } else if (!withComputerClicker) {
                if (player2Turn) {
                    if (tile.classList.contains("onlyTile")) {
                        tile.classList.add("miss");
                    } else if (tile.classList[1].split("")[tile.classList[1].split("").length - 1] === "-") {
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                            clickedShips.push(tile.classList[1].slice(0, -1));
                        }
                    } else {
                        tile.classList.add("crossedTile");
                        if (clickedShips.indexOf(tile.classList[1]) === -1) {
                            clickedShips.push(tile.classList[1]);
                        }
                    }

                    if (clickedShips.length !== 0) {
                        clickedShips.forEach((ship) => {
                            const shipTiles = document.querySelectorAll(`.${ship}, .${ship}-`);


                            const allHaveBeenClicked = [...shipTiles].reduce((acc, shipTile) => {
                                if (!shipTile.classList.contains("crossedTile")) {
                                    return false
                                }
                                return acc && true
                            }, true)
                            if (allHaveBeenClicked) {
                                let newShip;
                                shipTiles.forEach((shipTile) => {
                                    if (shipTile.classList.contains(`${ship}`)) {
                                        newShip = createShips(ship.split("X")[0]);
                                        [...newShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        })
                                        shipTile.parentElement.insertBefore(newShip, shipTile);
                                        shipTile.parentElement.removeChild(shipTile);
                                    } else {
                                        shipTile.parentElement.removeChild(shipTile);
                                    }
                                })
                                getSurroundingDivs(newShip.getBoundingClientRect(), newShip.classList[0], "opponent");
                                const theShip = clickedShips.splice(clickedShips.indexOf(ship), 1);
                                const shipName = `${theShip[0].split("X")[0].split("_")[0]}_horizontal`;
                                const pickedShip = dockedShips.reduce((acc, subShip) => {
                                    if (subShip.classList.contains(shipName) && acc === null) {
                                        [...subShip.children].forEach((circle) => {
                                            circle.classList.add("crossed");
                                        })
                                        return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                    }
                                    return acc || null;
                                }, null);

                            }
                        })

                    }
                }
            }
        }


        )
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
                }
            }
        }
    })


    const { createdBoard, boardArray } = opponentCreateBoard(playerTiles);
    tilesOp1 = document.querySelectorAll(".player .tile");

    const clickedShips = [];

    const dockedShips = [...document.querySelectorAll(".player .ship")];

    tilesOp1.forEach((tile) => {
        tile.addEventListener("click", () => {
            if (player1Turn) {
                if (tile.classList.contains("onlyTile")) {
                    tile.classList.add("miss");
                } else if (tile.classList[1].split("")[tile.classList[1].split("").length - 1] === "-") {
                    tile.classList.add("crossedTile");
                    if (clickedShips.indexOf(tile.classList[1].slice(0, -1)) === -1) {
                        clickedShips.push(tile.classList[1].slice(0, -1));
                    }
                } else {
                    tile.classList.add("crossedTile");
                    if (clickedShips.indexOf(tile.classList[1]) === -1) {
                        clickedShips.push(tile.classList[1]);
                    }
                }

                if (clickedShips.length !== 0) {
                    clickedShips.forEach((ship) => {
                        const shipTiles = document.querySelectorAll(`.${ship}, .${ship}-`);


                        const allHaveBeenClicked = [...shipTiles].reduce((acc, shipTile) => {
                            if (!shipTile.classList.contains("crossedTile")) {
                                return false
                            }
                            return acc && true
                        }, true)
                        if (allHaveBeenClicked) {
                            let newShip;
                            shipTiles.forEach((shipTile) => {
                                if (shipTile.classList.contains(`${ship}`)) {
                                    newShip = createShips(ship.split("X")[0]);
                                    [...newShip.children].forEach((circle) => {
                                        circle.classList.add("crossed");
                                    })
                                    shipTile.parentElement.insertBefore(newShip, shipTile);
                                    shipTile.parentElement.removeChild(shipTile);
                                } else {
                                    shipTile.parentElement.removeChild(shipTile);
                                }
                            })
                            getSurroundingDivs(newShip.getBoundingClientRect(), newShip.classList[0], "player");
                            const theShip = clickedShips.splice(clickedShips.indexOf(ship), 1);
                            const shipName = `${theShip[0].split("X")[0].split("_")[0]}_horizontal`;
                            const pickedShip = dockedShips.reduce((acc, subShip) => {
                                if (subShip.classList.contains(shipName) && acc === null) {
                                    [...subShip.children].forEach((circle) => {
                                        circle.classList.add("crossed");
                                    })
                                    return dockedShips.splice(dockedShips.indexOf(subShip), 1);
                                }
                                return acc || null;
                            }, null);

                        }
                    })

                }
            }
        })
    });
}



opponentCreate.addEventListener("click", createOpponentBoardOnPlayer2.bind(null, true))



const shipsThatHit = [];

let tilesOverlayArray =
    [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
        "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
        "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
        "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
        "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
        "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
        "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
        "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"
    ];





function computerClicker() {
    if (tilesOverlayDivsCopy.length === 0) {
        return;
    }
    let chosenTileDiv;
    // if (shipsThatHit.length !== 0) {
    if (!checkIfAllHitsFinished(tilesOverlayArray)) {
        const { myTilesOverlay, tile, surroundingTiles } = shoot(tilesOverlayArray, playerBoard.boardArray, 0);
        tilesOverlayArray = myTilesOverlay;
        chosenTileDiv = tilesOverlayDivsCopy.reduce((acc, tileOv, index) => {
            if (tileOv.classList[0] === `${tile}`) {
                return tilesOverlayDivsCopy.splice(index, 1)[0];
            }
            return acc;
        }, null);
        chosenTileDiv.click();
        if (isNaN(playerBoard.boardArray[parseInt(chosenTileDiv.classList[0], 10)])) {
            // playerTurn = false;
            // setTimeout(computerClicker, 500);
        } else {
            // playerTurn = true;
        }
        console.log("the player board is", playerBoard.boardArray, "anfalksnfa")
        console.log("comp chose", chosenTileDiv)

        const missDivs = surroundingTiles.map(((num) => {
            const theDiv = tilesOverlayDivsCopy.reduce((acc, value, index) => {
                if (value.classList[0] === num) {
                    return tilesOverlayDivsCopy.splice(index, 1)[0];
                }
                return acc
            }, null)
            return theDiv;
        }))
        missDivs.forEach((div) => {
            if (div !== null) {
                div.click()
            }
        })

    } else {
        const { chosenTile } = clickRandomTiles(tilesOverlayDivsCopy);
        chosenTileDiv = chosenTile;
        const myRandomNumber = chosenTileDiv.classList[0];
        const { myTilesOverlay, tile, surroundingTiles } = shoot(tilesOverlayArray, playerBoard.boardArray, myRandomNumber);
        tilesOverlayArray = myTilesOverlay;
        chosenTileDiv.click();
        console.log("on PB", playerBoard.boardArray[parseInt(chosenTileDiv.classList[0], 10)])
        if (isNaN(playerBoard.boardArray[parseInt(chosenTileDiv.classList[0], 10)])) {
            // playerTurn = false;
            // setTimeout(computerClicker, 500);

        } else {
            // playerTurn = true;
        }

        console.log("the player board is", playerBoard.boardArray, "anfalksnfa")
        console.log("comp chose", chosenTileDiv)

        // tilesOverlayDivsCopy.splice(parseInt(myRandomNumber, 10), 1);

        const missDivs = surroundingTiles.map(((num) => {
            const theDiv = tilesOverlayDivsCopy.reduce((acc, value, index) => {
                if (value.classList[0] === num) {
                    return tilesOverlayDivsCopy.splice(index, 1)[0];
                }
                return acc
            }, null)
            return theDiv;
        }))
        missDivs.forEach((div) => {
            if (div !== null) {
                div.click()
            }
        })
    }


    return { chosenTileDiv }

}

function startComputerClicker() {
    playerTurn = true;
    setTimeout(() => {
        let chosenDiv = computerClicker().chosenTileDiv;

        while (isNaN(playerBoard.boardArray[parseInt(chosenDiv.classList[0], 10)])) {
            chosenDiv = computerClicker().chosenTileDiv
        }
    }, 500)


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
    tilesOverlayDivsCopy = [...tilesOverlayDivsCopy]
    tile.addEventListener("click", () => {
        const box = tile.getBoundingClientRect();
        [...thePlayerTiles[0].children].forEach((playerTile) => {
            if (isPointInsideDiv(playerTile, box.x + box.width / 2, box.y + box.height / 2)) {
                const xValue = box.x + box.width / 2;
                const yValue = box.y + box.height / 2;
                const clickEvent = new MouseEvent("click", {
                    clientX: xValue,
                    clientY: yValue,
                    bubbles: true,
                });
                playerTile.dispatchEvent(clickEvent);

                // takeOutClickedTiles(tilesOverlayDivsCopy);

                const isPlayerFullyClicked = [...playerTile.children].reduce((acc, circle) => {
                    if (!circle.classList.contains("crossed")) {
                        return false;
                    }
                    return acc && true;
                }, true)


                if (!playerTile.classList.contains("tile")) {
                    if (isPlayerFullyClicked) {
                        shipsThatHit.pop();
                    } else if (shipsThatHit.indexOf(playerTile) === -1) {
                        const [row, col] = tile.classList[0].split("").map((string) => parseInt(string, 10));
                        shipsThatHit.push({
                            ship: playerTile,
                            shouldClick: [`${row}${col + 1}`, `${row}${col - 1}`],
                            alignment: "horizontal",
                            start: tile.classList[0]
                        })
                    }


                }


            }
        })
    }, false)
})

function isPointInsideDiv(div, x, y) {
    const rect = div.getBoundingClientRect();
    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );
}



function takeOutClickedTiles(overlayedTiles) {
    overlayedTiles.forEach((tile) => {
        const box = tile.getBoundingClientRect();
        [...thePlayerTiles[0].children].forEach((playerTile) => {
            if (isPointInsideDiv(playerTile, box.x + box.width / 2, box.y + box.height / 2)) {
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
        })
    }
    )
}







function playGamePVE() {
    const clickEvent = new MouseEvent("click", {
        bubbles: true, // Simulates a user click
        cancelable: true, // Allows default behavior to be prevented
        view: window
    });

    // opponentCreate.dispatchEvent(clickEvent);
    // selfCreate.dispatchEvent(clickEvent)
    createPlayer1Board();
    createOpponentBoardOnPlayer2(true);
}

button.addEventListener("click", playGamePVE);

function playGamePVP() {
    const clickEvent = new MouseEvent("click", {
        bubbles: true, // Simulates a user click
        cancelable: true, // Allows default behavior to be prevented
        view: window
    });

    createOpponentBoardOnPlayer1();
    createOpponentBoardOnPlayer2(false);



}

pvp.addEventListener("click", playGamePVP)





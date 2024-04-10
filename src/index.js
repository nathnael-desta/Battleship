import json5 from "json5";
import { pick } from "lodash";
import { createSquares, myShips, createShips, getTile, insertAt, insert, getDragElement, getTileFromNumber, whichCircle, undo, rotate, numToLetters, finalTile, flippable, placedShipDimmer, placedShips, selfCreateBoard, getSurroundingDivs, opponentCreateBoard, checkSurrounding } from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const shipsPlayer = document.querySelectorAll(".player .ship")
const individualships = document.querySelectorAll(".ship");
const selfCreate = document.querySelector(".playerRefresh");
const opponentCreate = document.querySelector(".opponentRefresh");
const tileDivs = document.querySelectorAll(".tiles > div");
let circles;
let tiles;
let ships;
let tilesOp;
let shipsOp;

createSquares(playerTiles);
createSquares(opponentTiles);

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

document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
        undo(playerTiles);
    }
})




selfCreate.addEventListener("click", () => {
    const dockedShips = [...document.querySelectorAll(".player .ship")];
    const clickedShips = [];

    selfCreateBoard(playerTiles);
    tiles = document.querySelectorAll(".player .tile");
    tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
            tile.classList.add("miss");
        })
    })

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
        })
    })

});


opponentCreate.addEventListener("click", () => {
    const { createdBoard, boardArray } = opponentCreateBoard(opponentTiles);
    console.log(createdBoard, boardArray)
    tilesOp = document.querySelectorAll(".opponent .tile");

    // shipsOp = document.querySelectorAll(".opponent .tiles > div:not(.tile)");
    // shipsOp.forEach((ship) => {
    //     ship.addEventListener("click", (e) => {
    //         const {shift} = whichCircle(ship.classList[0], e.clientX, e.clientY, ship.getBoundingClientRect());
    //         const circle = [...ship.children][shift];
    //         circle.classList.add("crossed");


    //         const allCrossedOut = [...ship.children].reduce((acc, child) => {
    //             if (!child.classList.contains("crossed")) {
    //                 return false
    //             }
    //             return acc && true;
    //         }, true);
    //         if (allCrossedOut) {
    //             getSurroundingDivs(ship.getBoundingClientRect(), ship.classList[0], "opponent");
    //         }
    //     })
    // })

    const clickedShips = [];

    const dockedShips = [...document.querySelectorAll(".opponent .ship")];


    tilesOp.forEach((tile) => {
        tile.addEventListener("click", () => {
            console.log("clickedShips", clickedShips,)
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
        })
    });


})

function refresh(divs, func) {

}



// document.addEventListener('keydown', (e) => {
//     if (e.key === "r") {
//         individualships.forEach((ship) => {
//             if (ship.classList.contains('dragging')) {
//                 ship.classList.toggle("rotate")
//             }
//         })
//     }
// })




// insert("I", 9, "quad_horizontal", myShips, playerTiles);











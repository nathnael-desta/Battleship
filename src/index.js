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
const tilesOverlayDivs = document.querySelectorAll(".tilesOverlay div");
const thePlayerTiles = document.querySelectorAll(".player .tiles")
const button = document.querySelector(".start_button");

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
        tile.addEventListener("click", (event) => {
            tile.classList.add("miss");

            event.stopPropagation();
        }, false)

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

            e.stopPropagation();
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

let tilesOverlayDivsCopy = tilesOverlayDivs;

const shipsThatHit = [];

function clicker() {
    if (tilesOverlayDivsCopy.length === 0) {
        return;
    }
    let chosen = "";
    if (shipsThatHit.length !== 0) {
        chosen = {myTilesCopy: shipsThatHit.shouldClick.pop()};
    } else {
        chosen = clickRandomTiles(tilesOverlayDivsCopy);
    }
    
    tilesOverlayDivsCopy = chosen.myTilesCopy;
    chosen.chosenTile.click();
    console.log(tilesOverlayDivsCopy)
    // console.log(chosen.chosenTile, tilesOverlayDivsCopy)    
}

button.addEventListener("click", clicker);

tilesOverlayDivs.forEach((tile) => {
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
                takeOutClickedTiles(tilesOverlayDivsCopy);

                const isPlayerFullyClicked = [...playerTile.children].reduce((acc, circle) => {
                    if (!circle.classList.contains("crossed")) {
                        return false;
                    }
                    return acc && true;
                }, true)


                if (!playerTile.classList.contains("tile")) {
                if(isPlayerFullyClicked) {
                    shipsThatHit.pop();
                } else if (shipsThatHit.indexOf(playerTile) === -1) {
                        const [row, col] = tile.classList[0].split("").map((string) => parseInt(string, 10));
                        shipsThatHit.push({
                            ship: playerTile,
                            shouldClick: [`${row}${col + 1}`, `${row}${col - 1}`],
                            alignment: "horizontal",
                            start: tile.classList[0]
                        })
                        console.log(shipsThatHit);
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

function clickRandomTiles(tileContainer) {
    const myTilesCopy = [...tileContainer]; // Create a copy of the array
  const index = Math.floor(Math.random() * myTilesCopy.length); // Use Math.random()
  const chosenTile = myTilesCopy[index]; // Access the element directly
  myTilesCopy.splice(index, 1);

  return {
    chosenTile,
    myTilesCopy
};
}

function takeOutClickedTiles(overlayedTiles) {
    overlayedTiles.forEach((tile) => {
        const box = tile.getBoundingClientRect();
        [...thePlayerTiles[0].children].forEach((playerTile) => {
            if (isPointInsideDiv(playerTile, box.x + box.width / 2, box.y + box.height / 2)) {
             if (playerTile.classList.contains("miss")) {
                overlayedTiles.splice(overlayedTiles.indexOf(tile), 1);
             }   
            }
    })
}
    )}



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











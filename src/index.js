import {createSquares, myShips, createShips, getTile, insertAt, insert, getDragElement, getTileFromNumber, whichCircle} from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const individualships = document.querySelectorAll(".ship");


createSquares(playerTiles);
createSquares(opponentTiles);


individualships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
        ship.classList.add("dragging");
        const datavalue = whichCircle(ship, e.clientX, e.clientY);
        ship.dataset.circle = JSON.stringify(datavalue);
    })

    ship.addEventListener("dragend", (e) => {
        const dragObj = getDragElement(playerTiles, e.clientX, e.clientY);
        const removeElement = dragObj.element;
        const nums = removeElement.id.split("");
        const tile = getTileFromNumber(nums[0], nums[1]);
        const col = tile[0];
        const row = parseInt(tile.slice(1));
        insert(col, row, ship, myShips, playerTiles);
        ship.classList.remove("dragging");
    })
})



// insert("I", 9, "quad_horizontal", myShips, playerTiles);











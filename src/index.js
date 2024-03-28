import {createSquares, myShips, createShips, getTile, insertAt, insert, getDragElement, getTileFromNumber, whichCircle, undo, rotate} from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const individualships = document.querySelectorAll(".ship");
let tileDivs = document.querySelectorAll(".tiles > div");


createSquares(playerTiles);
createSquares(opponentTiles);


individualships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
        if (e.key === "r") {
            e.preventDefault(); 
            e.stopPropagation();
            ship.classList.toggle("rotate");
            
        }
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
        tileDivs = document.querySelectorAll(".tiles > div");
        tileDivs.forEach((div) => {
            if (!div.classList.contains("tile")) {
                div.addEventListener("click", (event) => {
                    rotate(event.clientX, event.clientY);
                })
            }
        })
    })
})



document.addEventListener("keydown", (e) => {
    if (e.key === "z") {
        undo(playerTiles);
    }
})

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











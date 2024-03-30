import json5 from "json5";
import { createSquares, myShips, createShips, getTile, insertAt, insert, getDragElement, getTileFromNumber, whichCircle, undo, rotate, numToLetters, finalTile, flippable } from "./board";

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
        const shipName = ship.classList[2];
        const box = ship.getBoundingClientRect();
        const datavalue = whichCircle(shipName, e.clientX, e.clientY, box);
        ship.dataset.circle = JSON.stringify(datavalue);
    })

    ship.addEventListener("dragend", (e) => {
        const dragObj = getDragElement(playerTiles, e.clientX, e.clientY);
        const removeElement = dragObj.element;
        const nums = removeElement.id.split("");
        const tile = getTileFromNumber(nums[0], nums[1]);
        const col = tile[0];
        const row = parseInt(tile.slice(1));
        const myPiece = ship.classList[2];
        insert(col, row, ship, myShips, playerTiles, myPiece);
        // flippable();
        // setTimeout(() => {
        //     tileDivs = document.querySelectorAll(".tiles > div");
        // tileDivs.forEach((div) => {
        //     if (!div.classList.contains("tile")) {
        //         div.addEventListener("click", (event) => {
        //             const divTile = JSON.parse(div.dataset.tile);
        //             const myCol = numToLetters[`${divTile.col}`];
        //             const shipName = div.classList[0];
        //             const box = div.getBoundingClientRect();

        //             undo(playerTiles)
        //             const datavalue = whichCircle(shipName, event.clientX, event.clientY, box);
        //             div.dataset.circle = JSON.stringify(datavalue);
        //             const { finalCol, finalRow } = finalTile(myCol, divTile.row + 1, datavalue);
        //             const finalPieceName = div.classList[0].split("_")[1] === "horizontal" ? `${div.classList[0].split("_")[0]}_vertical` : `${div.classList[0].split("_")[0]}_horizontal`;
        //             console.log('finalpiecename', finalPieceName)
        //             insert(finalCol, finalRow, div, myShips, playerTiles, finalPieceName);
        //             tileDivs = document.querySelectorAll(".tiles > div");
        //         })
        //     }
        // })
        // }, 1000)
        ship.classList.remove("dragging");
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











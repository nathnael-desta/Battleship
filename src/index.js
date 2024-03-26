import {createSquares, myShips, createShips, getTile, insertAt, insert} from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const individualships = document.querySelectorAll(".ship");


console.log('the player', opponentTiles)
createSquares(playerTiles);
createSquares(opponentTiles);


individualships.forEach((ship) => {
    ship.addEventListener('dragstart', () => {
        ship.classList.add('dragging');
    })

    ship.addEventListener('dragend', (e) => {
        const removeElement = getDragElement(playerTiles, e.clientX, e.clientY);
        console.log('the box is', removeElement.id);
        ship.classList.remove('dragging');
    })
})



insert("I", 9, "quad_horizontal", myShips, playerTiles);











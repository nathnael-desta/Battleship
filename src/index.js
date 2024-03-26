import {createSquares, myShips, createShips, getTile, insertAt, insert} from "./board";

import("./style.css");

const playerTiles = document.querySelector(".player .tiles");
const opponentTiles = document.querySelector(".opponent .tiles");
const individualships = document.querySelectorAll(".ship");

individualships.forEach((ship) => {
    ship.addEventListener('dragstart', () => {
        ship.classList.add('dragging');
    })

    ship.addEventListener('dragend', () => {
        ship.classList.remove('dragging');
    })
})


createSquares(playerTiles);
createSquares(opponentTiles);

insert("I", 9, "quad_horizontal", myShips, playerTiles);











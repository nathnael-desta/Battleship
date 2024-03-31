import { split } from "lodash";

const numbers = [];
const pieceSquare = []
const piece = [];
const occupiedSquares = [];
const okToDraw = [];
export const placedShips = [];

export function createSquares(tiles, numbers = [[101]], pieceSquare = [101], piece = null, occupiedSquares) {
  let insertionSuccessful = true;
  let count = 0;
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.id = `${i}${j}`;


      if (pieceSquare.indexOf(count) !== -1) {
        if (okToDraw.indexOf(count) !== -1 || !checkForNumber(`${count}`, occupiedSquares)) {
          // okToDraw.push(count);
          if (okToDraw.indexOf(count) === -1) {
            okToDraw.push(count);
          }
          const newShip = createShips(piece[pieceSquare.indexOf(count)]);
        tiles.appendChild(newShip);
        count += 1;
        const colrow = {
          col: j,
          row: i,
        }
        newShip.dataset.tile = JSON.stringify(colrow);
        continue;
        }
        insertionSuccessful = false;
        numbers.pop();
        pieceSquare.pop();
        piece.pop();
      }
      // if (numbers.indexOf(count) !== -1) {
      //     count += 1;
      //     continue;
      // }
      if (checkForNumber(count, numbers)) {
        count += 1;
        continue;
      }
      count += 1;
      tiles.appendChild(tile);
    }
  }
  flippable();
  console.log("insertion check",insertionSuccessful)
  return insertionSuccessful;
}

function checkForNumber(value, array) {
  return array.reduce((isTrue, nums) => {
    if (nums.indexOf(value) === -1) {
      return isTrue || false
    }
    return true

  }, false)
}

function deleteBoard(tiles) {
  while (tiles.firstChild) {
    tiles.removeChild(tiles.firstChild)
  }
}

export function createShips(shipName) {
  // const circle = document.createElement("div");
  // circle.classList.add("circle");
  if (shipName === "single_vertical") {
    const singleVertical = document.createElement("div");
    singleVertical.classList.add("single_vertical");
    for (let i = 0; i < 1; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      singleVertical.classList.add("flippable");
      singleVertical.appendChild(circle);
    }
    return singleVertical;
  } if (shipName === "single_horizontal") {
    const singleHorizontal = document.createElement("div");

    singleHorizontal.classList.add("single_horizontal");
    for (let i = 0; i < 1; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      singleHorizontal.classList.add("flippable");
      singleHorizontal.appendChild(circle);
    }
    return singleHorizontal;
  } if (shipName === "double_vertical") {
    const doubleVertical = document.createElement("div");
    doubleVertical.classList.add("double_vertical");
    for (let i = 0; i < 2; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      doubleVertical.classList.add("flippable");
      doubleVertical.appendChild(circle);
    }
    return doubleVertical;
  } if (shipName === "double_horizontal") {
    const doubleHorizontal = document.createElement("div");
    doubleHorizontal.classList.add("double_horizontal");
    for (let i = 0; i < 2; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      doubleHorizontal.classList.add("flippable");
      doubleHorizontal.appendChild(circle);
    }
    return doubleHorizontal;
  } if (shipName === "tri_horizontal") {
    const triHorizontal = document.createElement("div");
    triHorizontal.classList.add("tri_horizontal");
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      triHorizontal.appendChild(circle);
    }
    return triHorizontal;
  } if (shipName === "tri_vertical") {
    const triVertical = document.createElement("div");
    triVertical.classList.add("tri_vertical");
    for (let i = 0; i < 3; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      triVertical.appendChild(circle);
    }
    return triVertical;
  } if (shipName === "quad_horizontal") {
    const quadHorizontal = document.createElement("div");
    quadHorizontal.classList.add("quad_horizontal");
    for (let i = 0; i < 4; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      quadHorizontal.appendChild(circle);
    }
    return quadHorizontal;
  } if (shipName === "quad_vertical") {
    const quadVertical = document.createElement("div");
    quadVertical.classList.add("quad_vertical");
    for (let i = 0; i < 4; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      quadVertical.appendChild(circle);
    }
    return quadVertical;
  }
  return "Ship not found";
}

export const myShips = {
  "single_vertical": { name: "sv", alignment: "vertical", delete: 1 },
  "single_horizontal": { name: "sh", alignment: "horizontal", delete: 1 },
  "double_vertical": { name: "dv", alignment: "vertical", delete: 2 },
  "double_horizontal": { name: "dh", alignment: "horizontal", delete: 2 },
  "tri_vertical": { name: "tv", alignment: "vertical", delete: 3 },
  "tri_horizontal": { name: "th", alignment: "horizontal", delete: 3 },
  "quad_vertical": { name: "qv", alignment: "vertical", delete: 4 },
  "quad_horizontal": { name: "qh", alignment: "horizontal", delete: 4 },
}

export function getTile(tiles, col, row) {
}

function getNumberFromTile(col, row) {
  const lettersToNum = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7,
    "I": 8,
    "J": 9,
  }

  return parseInt(`${row - 1}${lettersToNum[col]}`);
}

export const numToLetters = {
  "0": "A",
  "1": "B",
  "2": "C",
  "3": "D",
  "4": "E",
  "5": "F",
  "6": "G",
  "7": "H",
  "8": "I",
  "9": "J",
}

export function getTileFromNumber(row, col) {
  return `${numToLetters[col]}${parseInt(row) + 1}`;
}

export function insertAt(col, row, piece, myShips) {
  if (col < "A" || col > "J" || row < 0 || row > 10 || myShips == null || myShips[piece] == null) {
    return "incorrect input";
  }

  const result = { insert: myShips[piece].name };
  const deletes = [];
  const rerunDeletes = [];
  const count = myShips[piece].delete;

  if (myShips[piece].alignment === "vertical") {
    for (let i = 0; i < count; i += 1) {
      if (row + i <= 10) {
        deletes.push([col, row + i])
      } else {
        rerunDeletes.push([col, row + i - count])
      }
    }
  } else {
    for (let i = 0; i < count; i += 1) {
      if (String.fromCharCode(col.charCodeAt(0) + i) <= "J") {
        deletes.push([String.fromCharCode(col.charCodeAt(0) + i), row])
      } else {
        rerunDeletes.push([String.fromCharCode(col.charCodeAt(0) + i - count), row])
      }
    }
  }
  result.del = [...rerunDeletes, ...deletes];
  [result.start] = result.del;
  return result;
}



export function insert(col, row, ship, myShips, tiles, myPiece) {
  const circle = JSON.parse(ship.dataset.circle);
  if (myPiece.split("_")[1] !== "vertical") {
    const { shift, alignment } = circle;
    if (alignment === "horizontal") {
      for (let i = 0; i < shift; i += 1) {
        if (col === "A") {
          break;
        }
        col = String.fromCharCode(col.charCodeAt(0) - 1);
      }
    }
  }

  const insertObj = insertAt(col, row, myPiece, myShips);
  const deleteSquares = insertObj.del;
  // const numbers = [];
  pieceSquare.push(getNumberFromTile(insertObj.start[0], insertObj.start[1]))

  piece.push(myPiece);
  const currentNumbers = []
  deleteSquares.forEach((square) => {
    currentNumbers.push(getNumberFromTile(square[0], square[1]))
  })
  numbers.push(currentNumbers);
  deleteBoard(tiles)
  const {count, position} = occupies(piece)
  const shipOccupies= occupies(myPiece, pieceSquare[pieceSquare.length - 1]);
  const isInsertionSuccessful = createSquares(tiles, numbers, pieceSquare, piece, occupiedSquares);
  if (isInsertionSuccessful) {
    occupiedSquares.push(shipOccupies); 
  } else {
    const unfortunateShip = placedShips.pop();
    unfortunateShip.classList.remove("draged");
  }

}

export function undo(tiles) {
  numbers.pop()
  pieceSquare.pop()
  const popped = piece.pop()
  occupiedSquares.pop()
  okToDraw.pop()
  placedShips.reduce((accumulator, ship, index) => {
    const typeOfShip = ship.classList[2].split("_")[0];
    if (typeOfShip === popped.split("_")[0]) {
      placedShips.splice(index, 1);
      ship.classList.remove("draged");
      ship.setAttribute("draggable", true);
      return ship 
    }
    return accumulator || null
  }, null);
  
  placedShipDimmer();
  deleteBoard(tiles)
  createSquares(tiles, numbers, pieceSquare, piece);
}

export function getDragElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".tile")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const yOffset = y - box.top - box.height / 2;
    const xOffset = x - box.left - box.width / 2;
    const offset = Math.sqrt((yOffset * yOffset) + (xOffset * xOffset));
    if (offset < closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.POSITIVE_INFINITY });
}

export function whichCircle(ship, x, y, box) {

  const firstHorizontalCircle = box.left + (box.width / 2);
  const secondHorizontalCircle = box.left + 2 * (box.width / 3);
  const thirdHorizontalCircle = box.left + 3 * (box.width / 3);
  const firstVerticalCircle = box.top + (box.height / 2);
  const secondVerticalCircle = box.top + 2 * (box.height / 3);
  const thirdVerticalCircle = box.top + 3 * (box.height / 3);
  if (ship === "single_horizontal") {
    return {
      shift: 0,
      alignment: "horizontal"
    };
  }

  if (ship === "double_horizontal") {
    if (x <= firstHorizontalCircle) {
      return {
        shift: 0,
        alignment: "horizontal"
      };
    }
    return {
      shift: 1,
      alignment: "horizontal"
    };
  }

  if (ship === "tri_horizontal") {
    if (x <= firstHorizontalCircle - 16) {
      return {
        shift: 0,
        alignment: "horizontal"
      };
    }

    if (x <= secondHorizontalCircle - 5) {
      return {
        shift: 1,
        alignment: "horizontal"
      };
    }
    return {
      shift: 2,
      alignment: "horizontal"
    };
  }

  if (ship === "quad_horizontal") {
    if (x <= firstHorizontalCircle - 35) {
      return {
        shift: 0,
        alignment: "horizontal"
      };
    }

    if (x <= secondHorizontalCircle - 25) {
      return {
        shift: 1,
        alignment: "horizontal"
      };
    }

    if (x <= thirdHorizontalCircle - 40) {
      return {
        shift: 2,
        alignment: "horizontal"
      };
    }
    return {
      shift: 3,
      alignment: "horizontal"
    };
  }

  if (ship === "single_vertical") {
    return {
      shift: 0,
      alignment: "vertical"
    };
  }

  if (ship === "double_vertical") {
    if (y <= firstVerticalCircle) {
      return {
        shift: 0,
        alignment: "vertical"
      };
    }
    return {
      shift: 1,
      alignment: "vertical"
    };
  }

  if (ship === "tri_vertical") {

    if (y <= firstVerticalCircle - 16) {
      return {
        shift: 0,
        alignment: "vertical"
      };
    }

    if (y <= secondVerticalCircle - 5) {
      return {
        shift: 1,
        alignment: "vertical"
      };
    }
    return {
      shift: 2,
      alignment: "vertical"
    };
  }

  if (ship === "quad_vertical") {
    if (y <= firstVerticalCircle - 35) {
      return {
        shift: 0,
        alignment: "vertical"
      };
    }

    if (y <= secondVerticalCircle - 25) {
      return {
        shift: 1,
        alignment: "vertical"
      };
    }

    if (y <= thirdVerticalCircle - 40) {
      return {
        shift: 2,
        alignment: "vertical"
      };
    }
    return {
      shift: 3,
      alignment: "vertical"
    };
  }

  return {
    shift: 1000,
    alignment: "horizontal"
  };
}

export function rotate(shipName, x, y, box) {



  // const myPiece = piece[piece.length - 1];
  // let [first, second] = myPiece.split("_");
  // second = second === "horizontal" ? "vertical" : "horizontal";
  // const flipped = [first, second].join("_");

  // let myCircle = whichCircle(shipName, x, y, box);

  // let [row, col] = `${formatToTwoDigits(pieceSquare[pieceSquare.length - 1])}`.split("");
  // col = `${parseInt(col) + myCircle.shift}`;
  // const tile = getTileFromNumber(row, col);
  // col = tile[0];
  // row = parseInt(tile.slice(1));
  // const insertObj = insertAt(col, row, flipped, myShips);
  // const deleteSquares = insertObj.del;




}

function formatToTwoDigits(number) {
  return number.toString().padStart(2, "0");
}

export function finalTile(col, row, circleData) {
  const { shift, alignment } = circleData;
  if (alignment === "horizontal") {
    for (let i = 0; i < shift; i += 1) {
      if (col === "J") {
        break;
      }
      col = String.fromCharCode(col.charCodeAt(0) + 1);
    }
    return {
      finalCol: col,
      finalRow: row
    }
  } 
    for (let i = 0; i < shift; i += 1) {
      if (row === 10) {
        break;
      }
      row += 1;
    }
    return {
      finalCol: col,
      finalRow: row
    }
  

}

export function flippable() {

    const tileDivs = document.querySelectorAll(".tiles > div");
    const playerTiles = document.querySelector(".player .tiles");
    tileDivs.forEach((div) => {
      if (!div.classList.contains("tile")) {
        div.addEventListener("click", (event) => {
          const divTile = JSON.parse(div.dataset.tile);
          const myCol = numToLetters[`${divTile.col}`];
          const shipName = div.classList[0];
          const box = div.getBoundingClientRect();

          const datavalue = whichCircle(shipName, event.clientX, event.clientY, box);
          div.dataset.circle = JSON.stringify(datavalue);
          const { finalCol, finalRow } = finalTile(myCol, divTile.row + 1, datavalue);
          const finalPieceName = div.classList[0].split("_")[1] === "horizontal" ? `${div.classList[0].split("_")[0]}_vertical` : `${div.classList[0].split("_")[0]}_horizontal`;
          if (shipName.split("_")[1] === "horizontal") {
            if (!checkIfFlipIsOk(finalCol, finalRow, occupiedSquares, shipName)) {
              return null;
            }
          }

          removeDiv(finalCol, finalRow, numbers, piece, pieceSquare, occupiedSquares, okToDraw);
          deleteBoard(playerTiles)
          createSquares(playerTiles, numbers, pieceSquare, piece);

          insert(finalCol, finalRow, div, myShips, playerTiles, finalPieceName);
          return "working"
        })
      }
    })
}

export function occupies(myPiece, pieceSquare) {
  const firstNumber = `${pieceSquare}`.split("")[0];
  const secondNumber = `${pieceSquare}`.split("")[1];
  const result = [];
  let status = {};
  if (myPiece === "single_horizontal") {
     status = {
      count: 1,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "single_vertical") {
     status = {
      count: 1,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "double_horizontal") {
     status = {
      count: 2,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "double_vertical") {
     status = {
      count: 2,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "tri_horizontal") {
     status = {
      count: 3,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "tri_vertical") {
     status = {
      count: 3,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "quad_horizontal") {
     status = {
      count: 4,
      position: myPiece.split("_")[1]
    }
  }
  if (myPiece === "quad_vertical") {
     status = {
      count: 4,
      position: myPiece.split("_")[1]
    }
  }
  if (Object.keys(status).length === 0) {
    return "invalid piece name"
  }

  if (status.position === "horizontal") {
    for (let i = 0; i < status.count; i++) {
      result.push(`${firstNumber}${parseInt(secondNumber) + i}`)
    }
  } else {
    for (let i = 0; i < status.count; i++) {
      result.push(`${parseInt(firstNumber) + i}${secondNumber}`)
    }
  }

  return result;
}


export function removeDiv(col, row, numbers, piece, pieceSquare, occupiedSquares, okToDraw) {
  const tile = parseInt(getNumberFromTile(col, row), 10);
  let index = -1;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].indexOf(tile) !== -1) {
      index = i;
    }
  }
  // const newNumbers = [...numbers];
  // const newPiece = [...piece];
  // const newPieceSquare = [...pieceSquare];
  // const newOccupiedSquares = [...occupiedSquares];
  // const newOkToDraw = [...okToDraw];
  if (index !== -1) {
    numbers.splice(index, 1);
    piece.splice(index, 1);
    pieceSquare.splice(index, 1);
    occupiedSquares.splice(index, 1);
    okToDraw.splice(index, 1);
  }
  return {
    numbers ,
    piece ,
    pieceSquare ,
    occupiedSquares ,
    okToDraw
  }
}

export function checkIfFlipIsOk(col, row, occupiedSquares, shipName) {
  const tile = getNumberFromTile(col, row);
  occupiedSquares.forEach((array, index) => {
    if (array.indexOf(`${tile}`) !== -1) {
        occupiedSquares.splice(index, 1)
    }
  }) 
  
  let [tilerow, tilecol] = `${tile}`.split("");
  let result = true;
  const first = shipName.split("_")[0];

  const count = first === "single" ? 1 : first === "double" ? 2 : first === "tri" ? 3 : first === "quad" ? 4 : "undefied";

  const deletes = [];
  const rerunDeletes = [];

  for (let i = 0; i < count; i += 1) {
    if (row + i <= 10) {
      deletes.push(`${parseInt(tilerow, 10) + i}${tilecol}`)
    } else {
      rerunDeletes.push(`${parseInt(tilerow, 10) + i - count}${tilecol}`)
    }
  }


  const verticalTiles = [...rerunDeletes, ...deletes];



  verticalTiles.forEach(vtile => {
    for (let i = 0; i < occupiedSquares.length; i++) {
      if (occupiedSquares[i].indexOf(vtile) !== -1) {
        result = false;
      }
    }
  })
  
  return result;
}

export function placedShipDimmer() {
  
  placedShips.forEach((ship) => {
    ship.classList.add('draged');
    ship.setAttribute("draggable", false);
  })
}
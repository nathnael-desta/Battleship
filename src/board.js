import { gameStarted } from "./index";
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
      tile.classList.add("onlyTile");
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

  const { count, position } = occupies(piece)
  const shipOccupies = occupies(myPiece, pieceSquare[pieceSquare.length - 1]);
  const isInsertOKToInsert = shipOccupies.reduce((acc, square) => {
    if (checkForNumber(parseInt(square, 10), numbers)) {
      return false;
    }
    return acc && true
  }, true);
  if (!isInsertOKToInsert) {
    const unfortunateShip = placedShips.pop();
    unfortunateShip.classList.remove("draged");
    return;
  }
  deleteBoard(tiles);
  numbers.push(currentNumbers);
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
  if (gameStarted) {
    return;
  }
  const tileDivs = document.querySelectorAll(".tiles > div");
  const playerTiles = document.querySelector(".player .tiles");
  tileDivs.forEach((div) => {
    if (!div.classList.contains("tile")) {
      div.addEventListener("click", (event) => {
        if (gameStarted) {
          return;
        }
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
    numbers,
    piece,
    pieceSquare,
    occupiedSquares,
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

  const [tilerow, tilecol] = `${tile}`.split("");
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
    ship.classList.add("draged");
    ship.setAttribute("draggable", false);
  })
}

const shipNames = ["single_horizontal", "single_vertical", "double_horizontal", "double_vertical", "tri_horizontal", "tri_vertical", "quad_horizontal", "quad_vertical"];


export function automaticallyCreateShipsArray() {
  const myArray = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      myArray.push(`${i}${j}`)
    }
  }




  // for (let shipName of shipNames) {

  // }
  return myArray;
}
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

export function checkSurrounding(board) {
  let myBoard = [...board];
  myBoard = myBoard.map((tile) => {
    if (!Number.isNaN(parseInt(tile, 10))) {
      let [row, col] = tile.split("");
      row = parseInt(row, 10);
      col = parseInt(col, 10);

      if (row > 0) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row - 1}${col}`, 10)], 10))) {
          return "-";
        }
      }
      if (row < 9) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row + 1}${col}`, 10)], 10))) {
          return "-";
        }
      }
      if (col > 0) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row}${col - 1}`, 10)], 10))) {
          return "-";
        }
      }
      if (col < 9) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row}${col + 1}`, 10)], 10))) {
          return "-";
        }
      }
      return tile;
    }
    return tile;
  })
  return myBoard;
}

let count = 0;
export function insertInsideArray(obj, board) {
  const myBoard = [...board];
  const { del, insert, start } = obj;
  const actualName = {
    "sv": "single_vertical",
    "sh": "single_horizontal",
    "dv": "double_vertical",
    "dh": "double_horizontal",
    "tv": "tri_vertical",
    "th": "tri_horizontal",
    "qv": "quad_vertical",
    "qh": "quad_horizontal"
  };
  const shipName = actualName[insert];
  const [startCol, startRow] = start;
  const placementSquare = `${startRow - 1}${lettersToNum[startCol]}`;
  del.shift();
  const deletedSquares = [];

  for (let i = 0; i < del.length; i += 1) {
    const [col, row] = del[i]
    deletedSquares.push(`${row - 1}${lettersToNum[col]}`)
  }

  myBoard[parseInt(placementSquare, 10)] = `${shipName}X${count}`;
  for (let i = 0; i < deletedSquares.length; i += 1) {
    myBoard[parseInt(deletedSquares[i], 10)] = `${shipName}X${count}-`;
  }
  count += 1;
  // myBoard = checkSurrounding(myBoard);
  return myBoard;
}

export function checkIfInsertable(placementSquare, shipName, board) {
  const myBoard = [...board];
  let [row, col] = placementSquare.split("");
  row = parseInt(row) + 1;
  col = numToLetters[col];
  const { del, insert, start } = insertAt(col, row, shipName, myShips);
  if (parseInt(getNumberFromTile(...start), 10) !== parseInt(placementSquare, 10)) {
    return false;
  }
  if (shipName === "single_vertical" || shipName === "single_horizontal") {
    if (Number.isNaN(parseInt(myBoard[parseInt(placementSquare, 10)], 10))) {
      return false;
    }
    return true;
  }
  if (Number.isNaN(parseInt(myBoard[parseInt(placementSquare, 10)], 10))) {
    return false;
  }
  for (let i = 0; i < del.length; i += 1) {
    if (Number.isNaN(parseInt(myBoard[getNumberFromTile(...del[i])], 10))) {
      return false;
    }
  }
  return true
}

export function allTilesAroundAPoint(board, tile) {
  const [row, col] = tile.padStart(2, "0").split("").map(value => parseInt(value, 10));
  return [`${Math.abs(row - 1)}${Math.abs(col - 1)}`, `${Math.abs(row - 1)}${Math.abs(col)}`, `${Math.abs(row - 1)}${Math.abs(col + 1)}`, `${Math.abs(row)}${Math.abs(col - 1)}`, `${Math.abs(row)}${Math.abs(col)}`, `${Math.abs(row)}${Math.abs(col + 1)}`, `${Math.abs(row + 1)}${Math.abs(col - 1)}`, `${Math.abs(row + 1)}${Math.abs(col)}`, `${Math.abs(row)}${Math.abs(col + 1)}`]
}

export function addableSquares(shipName, board) {
  const addableBoard = [];
  const indexOfEachNonTile = board.reduce((acc, value, index) => {
    if (isNaN(value)) {
      acc.push(`${index}`.padStart(2, "0"));
      return acc;
    }
    return acc
  }, [])
  const tilesSurroundingShips = indexOfEachNonTile.reduce((acc, value, index) => {
    const tileSurroundingShip = allTilesAroundAPoint(board, value);
    tileSurroundingShip.forEach((tile) => {
      if (acc.indexOf(tile) === -1) {
        acc.push(tile);
      }
    })
    return acc;
  }, [])
  const myBoard = [...board];
  tilesSurroundingShips.forEach((tile) => {
    if (!isNaN(tile) && parseInt(tile, 10) >= 0 && parseInt(tile, 10) <= 99) {
      myBoard.splice(parseInt(tile, 10), 1, "space taken");
    }
  })
  for (let i = 0; i < myBoard.length; i += 1) {
    if (!Number.isNaN(parseInt(myBoard[i], 10))) {
      if (checkIfInsertable(myBoard[i], shipName, myBoard) && tilesSurroundingShips.indexOf(myBoard[i]) === -1) {
        addableBoard.push(myBoard[i]);
      }
    }

  }
  return addableBoard;
}

const board = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08",
  "09", "10", "11", "12", "13", "14", "15", "16", "17",
  "18", "19", "20", "21", "22", "23", "24", "25", "26",
  "27", "28", "29", "30", "31", "32", "33", "34", "35",
  "36", "37", "38", "39", "40", "41", "42", "43", "44",
  "45", "46", "47", "48", "49", "50", "51", "52", "53",
  "54", "55", "56", "57", "58", "59", "60", "61", "62",
  "63", "64", "65", "66", "67", "68", "69", "70", "71",
  "72", "73", "74", "75", "76", "77", "78", "79", "80",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "90", "91", "92", "93", "94", "95", "96", "97", "98",
  "99"
];

function addShip(col, row, shipName, myBoard) {
  return insertInsideArray(insertAt(col, row, shipName, myShips), myBoard)
}

function getRandomized(arr) {
  let copy = [...arr]
  copy = copy.map((tile) => {
    if (Number.isNaN(parseInt(tile, 10))) {
      return;
    }
    return tile;

  })
  return copy[Math.floor(Math.random() * copy.length)];
}

function getMyRandom(arr) {
  const copy = [...arr];
  return copy[Math.floor(Math.random() * copy.length)];
}

function finalBoard(board) {
  let myBoard = [...board];
  const quad = ["quad_vertical", "quad_horizontal"];
  const tri = ["tri_vertical", "tri_horizontal"];
  const double = ["double_vertical", "double_horizontal"];
  const single = ["single_vertical", "single_horizontal"];
  const ships = [quad, tri, tri, double, double, double, single, single, single, single];

  let shipName;
  let addableBoard;
  let col;
  let row;
  for (let i = 0; i < ships.length; i += 1) {
    shipName = getMyRandom(ships[i]);
    addableBoard = addableSquares(shipName, myBoard);
    [row, col] = getRandomized(addableBoard).split("");
    col = numToLetters[col];
    row = parseInt(row, 10) + 1;
    myBoard = addShip(col, row, shipName, myBoard);
  }
  return myBoard
}

export function selfCreateBoard(tiles) {
  deleteBoard(tiles);
  const createdBoard = [];
  const boardArray = [];
  const myBoard = finalBoard(board);
  for (let i = 0; i < myBoard.length; i += 1) {
    if (!Number.isNaN(parseInt(myBoard[i], 10))) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add("onlyTile");
      tile.id = `${myBoard[i]}`;
      createdBoard.push(tile);
      tiles.appendChild(tile);
      boardArray.push(myBoard[i]);
    } else if (myBoard[i].split("")[myBoard[i].split("").length - 1] !== "-") {
      const newShip = createShips(myBoard[i].split("X")[0]);
      createdBoard.push(newShip);
      tiles.appendChild(newShip);
      boardArray.push(myBoard[i]);
    } else {
      const shipName = myBoard[i].split("-")[0];
      boardArray.push(`- ${shipName}`);
    }
  }

  return { createdBoard, boardArray }
}

export function opponentCreateBoard(tiles) {
  deleteBoard(tiles);
  const createdBoard = []
  const boardArray = finalBoard(board);
  // for (let i = 0; i < boardArray.length; i += 1) {
  //   if (!Number.isNaN(parseInt(boardArray[i], 10))) {
  //     const tile = document.createElement("div");
  //     tile.classList.add("tile");
  //     tile.id = `${boardArray[i]}`;
  //     createdBoard.push(tile);
  //   } else if (boardArray[i] !== "-") {
  //     const newShip = createShips(boardArray[i]);
  //     createdBoard.push(newShip);
  //   }
  // }  
  // return {createdBoard, boardArray}

  for (let i = 0; i < boardArray.length; i += 1) {
    if (!Number.isNaN(parseInt(boardArray[i], 10))) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add("onlyTile");
      tile.id = `${boardArray[i]}`;
      createdBoard.push(tile);
      tiles.appendChild(tile);
    } else if (boardArray[i].split("")[boardArray[i].split("").length - 1] !== "-") {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add(`${boardArray[i]}`);
      createdBoard.push(tile);
      tiles.appendChild(tile);
    } else {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add(boardArray[i]);
      createdBoard.push(tile);
      tiles.appendChild(tile);
    }
  }
  return { createdBoard, boardArray };
}

function getBoxCornersAndEdges(box, shipName) {
  if (shipName === "single_horizontal" || shipName === "single_vertical" || shipName === "tile") {
    return [
      [box.top, box.left],
      [box.top, box.right],
      [box.bottom, box.right],
      [box.bottom, box.left]
    ];
  }
  if (shipName === "double_horizontal") {
    return [
      [box.top, box.left],
      [box.top, box.left + (box.width / 2)],
      [box.top, box.right],
      [box.bottom, box.right],
      [box.bottom, box.left + (box.width / 2)],
      [box.bottom, box.left]
    ];
  }
  if (shipName === "tri_horizontal") {
    return [
      [box.top, box.left],
      [box.top, box.left + (box.width / 3)], [box.top, box.left + 2 * (box.width / 3)],
      [box.top, box.right],
      [box.bottom, box.right],
      [box.bottom, box.left + (box.width / 3)], [box.bottom, box.left + 2 * (box.width / 3)],
      [box.bottom, box.left]
    ]
  }
  if (shipName === "quad_horizontal") {
    return [
      [box.top, box.left],
      [box.top, box.left + (box.width / 4)], [box.top, box.left + 2 * (box.width / 4)], [box.top, box.left + 3 * (box.width / 4)],
      [box.top, box.right],
      [box.bottom, box.right],
      [box.bottom, box.left + (box.width / 4)], [box.bottom, box.left + 2 * (box.width / 4)], [box.bottom, box.left + 3 * (box.width / 4)],
      [box.bottom, box.left]
    ]
  }
  if (shipName === "double_vertical") {
    return [
      [box.top, box.left],
      [box.top, box.right],
      [box.top + (box.height / 2), box.right],
      [box.bottom, box.right],
      [box.bottom, box.left],
      [box.top + (box.height / 2), box.left],
    ]
  }
  if (shipName === "tri_vertical") {
    return [
      [box.top, box.left],
      [box.top, box.right],
      [box.top + (box.height / 3), box.right], [box.top + 2 * (box.height / 3), box.right],
      [box.bottom, box.right],
      [box.bottom, box.left],
      [box.top + (box.height / 3), box.left], [box.top + 2 * (box.height / 3), box.left],
    ]
  }
  if (shipName === "quad_vertical") {
    return [
      [box.top, box.left],
      [box.top, box.right],
      [box.top + (box.height / 4), box.right], [box.top + 2 * (box.height / 4), box.right], [box.top + 3 * (box.height / 4), box.right],
      [box.bottom, box.right],
      [box.bottom, box.left],
      [box.top + (box.height / 4), box.left], [box.top + 2 * (box.height / 4), box.left], [box.top + 3 * (box.height / 4), box.left],
    ]
  }
  return "invalid input";
}

function minimumDistance(box1, box2) {

}

export function getSurroundingDivs(box, shipName, user) {
  const boxCorners = getBoxCornersAndEdges(box, shipName);
  const tiles = document.querySelectorAll(`.${user} .onlyTile`);
  tiles.forEach((tile) => {
    const tileCorners = getBoxCornersAndEdges(tile.getBoundingClientRect(), "tile");
    const tileDistance = tileCorners.reduce((acc1, p1) => {
      const minDistanceFromCorner = boxCorners.reduce((acc2, p2) => {
        const distance = Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
        if (distance < acc2) {
          return distance;
        }
        return acc2;
      }, Number.POSITIVE_INFINITY)

      if (minDistanceFromCorner < acc1) {
        return minDistanceFromCorner;
      }
      return acc1;
    }, Number.POSITIVE_INFINITY)

    if (tileDistance < 30) {
      tile.classList.add("miss");
      tile.classList.add("notClickable");
    }
  })
}




export function checkIfShipIsDestroyed(tilesOverlay, playerBoard, shotTile) {
  const [row, col] = shotTile.padStart(2, "0").split("").map((value) => parseInt(value, 10));

  let shipType = "";
  let checkShip = "";


  if (isNaN(playerBoard[`${row}${col}`])) {
    shipType = playerBoard[parseInt(`${row}${col}`, 10)].split(" ")[playerBoard[parseInt(`${row}${col}`, 10)].split(" ").length - 1];
  }
  // --------------------------------------------------------------
  else {
    return false
  }
  const allTileNumbersWithThisShipAreHit = playerBoard.reduce((acc, tile, index) => {
    if (isNaN(tile)) {
      checkShip = tile.split(" ")[tile.split(" ").length - 1];
      if (checkShip === shipType) {
        if (tilesOverlay[index].split(" ").indexOf("hit") === -1 && index !== parseInt(`${row}${col}`, 10)) {
          return false;
        }
        return acc;
        // if (index === parseInt(`${row}${col}`, 10)) {
        //   return true;
        // }
        // if (tilesOverlay[index] === "hit") {
        //   return acc;
        // }
        // return false;
      }
    }
    return acc && true;
  }, true)
  return allTileNumbersWithThisShipAreHit

}

export function getIndexOfFirstHit(tilesOverlay) {
  const myTilesOverlay = [...tilesOverlay]
  const firstTile = myTilesOverlay.reduce((acc, tile, index) => {
    if (tile === "hit") {
      const [row, col] = `${index}`.padStart(2, "0").split("").map((value) => parseInt(value, 10));

      let alignment = "vertical";
      if (col > 0) {
        if (myTilesOverlay[parseInt(`${row}${col - 1}`, 10)].split(" ").indexOf("hit") !== -1 && myTilesOverlay[parseInt(`${row}${col - 1}`, 10)].split(" ").indexOf("finished") === -1) {
          alignment = "horizontal";
        }
      }
      if (col < 9) {
        if (myTilesOverlay[parseInt(`${row}${col + 1}`, 10)].split(" ").indexOf("hit") !== -1 && myTilesOverlay[parseInt(`${row}${col + 1}`, 10)].split(" ").indexOf("finished") === -1) {
          alignment = "horizontal";
        }
      }

      // now check for not misses for both up and down
      if (row > 0 && row < 9) {
        if (myTilesOverlay[parseInt(`${row - 1}${col}`, 10)].split(" ").indexOf("miss") !== -1 && myTilesOverlay[parseInt(`${row + 1}${col}`, 10)].split(" ").indexOf("miss") !== -1) {
          alignment = "horizontal";
        }
      } else if (row > 0) {
        if (myTilesOverlay[parseInt(`${row - 1}${col}`, 10)].split(" ").indexOf("miss") !== -1) {
          alignment = "horizontal";
        }
      } else if (row < 9) {
        if (myTilesOverlay[parseInt(`${row + 1}${col}`, 10)].split(" ").indexOf("miss") !== -1) {
          alignment = "horizontal";
        }
      }

      return {
        hitTile: `${index}`.padStart(2, "0"),
        newTilesOverlay: myTilesOverlay,
        alignment
      }
    }
    return acc || null
  }, null)
  return firstTile || "all hit tiles have been finished";
}

export function getNextPossibleShipMember(tilesOverlay, alignment, hitTile) {
  const [row, col] = hitTile.padStart(2, "0").split("").map((value) => parseInt(value, 10));
  const possibleMembers = [];
  if (alignment === "vertical") {
    let rowCopy = row

    // go up one by one to check if there is a tile vertically that can be hit
    while (tilesOverlay[parseInt(`${rowCopy}${col}`, 10)] !== "miss") {
      if (!isNaN(tilesOverlay[parseInt(`${rowCopy}${col}`, 10)])) {
        possibleMembers.push(`${rowCopy}${col}`);
        break;
      }
      if (rowCopy > 0) {
        rowCopy -= 1;
      } else {
        break;
      }
    }

    // go down one by one to check if there is a tile vertically that can be hit

    rowCopy = row;
    while (tilesOverlay[parseInt(`${rowCopy}${col}`, 10)] !== "miss") {
      if (!isNaN(tilesOverlay[parseInt(`${rowCopy}${col}`, 10)])) {
        possibleMembers.push(`${rowCopy}${col}`);
        break;
      }
      if (rowCopy < 9) {
        rowCopy += 1;
      } else {
        break;
      }
    }
  } else {
    let colCopy = col

    // go left one by one to check if there is a tile vertically that can be hit
    while (tilesOverlay[parseInt(`${row}${colCopy}`, 10)] !== "miss") {
      if (!isNaN(tilesOverlay[parseInt(`${row}${colCopy}`, 10)])) {
        possibleMembers.push(`${row}${colCopy}`);
        break;
      }
      if (colCopy > 0) {
        colCopy -= 1;
      } else {
        break;
      }
    }

    // go down one by one to check if there is a tile vertically that can be hit

    colCopy = col;
    while (tilesOverlay[parseInt(`${row}${colCopy}`, 10)] !== "miss") {
      if (!isNaN(tilesOverlay[parseInt(`${row}${colCopy}`, 10)])) {
        possibleMembers.push(`${row}${colCopy}`);
        break;
      }
      if (colCopy < 9) {
        colCopy += 1;
      } else {
        break;
      }
    }
  }
  return possibleMembers
}

export function getIndexOfNextLikelyTile(tilesOverlay) {
  let { hitTile, newTilesOverlay, alignment } = getIndexOfFirstHit(tilesOverlay);

  if (`${hitTile}`.split("").length === 1) {
    hitTile = `0${hitTile}`;
  }


  if (!isNaN(hitTile) && alignment === "vertical") {
    const [row, col] = hitTile.padStart(2, "0").split("").map((value) => parseInt(value, 10));
    if (row > 0) {
      if (!isNaN(tilesOverlay[`${row - 1}${col}`])) {
        return { tile: `${row - 1}${col}`, sentTileOverlay: newTilesOverlay, hitTile }
      }
    }

    if (row < 9) {
      if (!isNaN(tilesOverlay[`${row + 1}${col}`])) {
        return { tile: `${row + 1}${col}`, sentTileOverlay: newTilesOverlay, hitTile }
      }
    }

    const tileMember = getNextPossibleShipMember(tilesOverlay, alignment, hitTile)[0]
    return { tile: tileMember, sentTileOverlay: newTilesOverlay, hitTile }

    // if (col > 0) {
    //   if (!isNaN(tilesOverlay[`${row}${col - 1}`])) {
    //     return { tile: `${row}${col - 1}`, sentTileOverlay: newTilesOverlay, hitTile }
    //   }
    // }

    // if (col < 9) {
    //   if (!isNaN(tilesOverlay[`${row}${col + 1}`])) {
    //     return { tile: `${row}${col + 1}`, sentTileOverlay: newTilesOverlay, hitTile }
    //   }
    // }

    return "can't find where to hit for some reason"
  }

  if (!isNaN(hitTile) && alignment === "horizontal") {
    const [row, col] = hitTile.padStart(2, "0").split("").map((value) => parseInt(value, 10));
    if (col > 0) {
      if (!isNaN(tilesOverlay[`${row}${col - 1}`])) {
        return { tile: `${row}${col - 1}`, sentTileOverlay: newTilesOverlay, hitTile }
      }
    }

    if (col < 9) {
      if (!isNaN(tilesOverlay[`${row}${col + 1}`])) {
        return { tile: `${row}${col + 1}`, sentTileOverlay: newTilesOverlay, hitTile }
      }
    }

    const tileMemberHorizontal = getNextPossibleShipMember(tilesOverlay, alignment, hitTile)[0]
    return { tile: tileMemberHorizontal, sentTileOverlay: newTilesOverlay, hitTile }

  }


  return "all hit tiles have been finished"
}

export function checkIfAllHitsFinished(tilesOverlay) {
  return tilesOverlay.reduce((acc, tile) => {
    if (tile === "hit") {
      return false;
    }
    return acc && true;
  }, true);
}



function allNumbersAroundIt(tile) {
  const surroundingTiles = [];
  const [row, col] = tile.padStart(2, "0").split("").map(num => parseInt(num, 10));
  if (row > 0) {
    if (col > 0) {
      surroundingTiles.push(`${row - 1}${col - 1}`);
    }
    surroundingTiles.push(`${row - 1}${col}`);
    if (col < 9) {
      surroundingTiles.push(`${row - 1}${col + 1}`);
    }
  }

  if (col > 0) {
    surroundingTiles.push(`${row}${col - 1}`);
  }
  if (col < 9) {
    surroundingTiles.push(`${row}${col + 1}`);
  }

  if (row < 9) {
    if (col > 0) {
      surroundingTiles.push(`${row + 1}${col - 1}`);
    }
    surroundingTiles.push(`${row + 1}${col}`);
    if (col < 9) {
      surroundingTiles.push(`${row + 1}${col + 1}`);
    }
  }

  return surroundingTiles;
}


export function getSurroundingTiles(overlayedTiles, playerBoard, tile) {
  const shipName = playerBoard[parseInt(tile, 10)].split(" ").pop();
  const allTilesOfTheShip = playerBoard.reduce((acc, value, index) => {
    if (value.split(" ").pop() === shipName) {
      acc.push(String(index).padStart(2, "0"));
      return acc;
    }
    return acc;
  }, []);

  const allTilesAroundTheShip = allTilesOfTheShip.reduce((acc, value, index) => {
    const surroundingNumbers = allNumbersAroundIt(value);
    surroundingNumbers.forEach((num) => {
      if (acc.indexOf(num) === -1) {
        acc.push(num);
      }
    })
    return acc;
  }, [])
  const onlyTheTiles = allTilesAroundTheShip.reduce((acc, value) => {
    if (!isNaN(overlayedTiles[parseInt(value, 10)]) && !isNaN(playerBoard[parseInt(value, 10)])) {
      acc.push(value);
      return acc;
    }
    return acc
  }, [])

  return onlyTheTiles;
}

export function clickRandomTiles(tileContainer) {
  // const myTilesCopy = [...tileContainer]; // Create a copy of the array
  const index = Math.floor(Math.random() * tileContainer.length); // Use Math.random()
  const chosenTile = tileContainer.splice(index, 1)[0]; // Access the element directly

  return {
    chosenTile
  };
}

export function shoot(tilesOverlay, playerBoard, randomNo = null, dontThink = false) {
  let myTilesOverlay = [...tilesOverlay];
  let chosenTile = randomNo;
  if (dontThink) {
    chosenTile = randomNo;
    for (let i = 0; i < myTilesOverlay.length; i += 1) {
      if (myTilesOverlay[i] === chosenTile) {
        if (!Number.isNaN(parseInt(playerBoard[i], 10))) {
          myTilesOverlay[i] = "miss";
        } else if (checkIfShipIsDestroyed(myTilesOverlay, playerBoard, chosenTile)) {
          surroundingTiles = getSurroundingTiles(tilesOverlay, playerBoard, myTilesOverlay[i]);
          surroundingTiles.forEach((num) => {
            myTilesOverlay[parseInt(num, 10)] = "miss";
          })

          myTilesOverlay[i] = "hit finished";
        } else {
          myTilesOverlay[i] = "hit";
        }
      }
    }
  }
  const { tile, sentTileOverlay, hitTile } = getIndexOfNextLikelyTile(tilesOverlay);
  let surroundingTiles = [];
  if (checkIfAllHitsFinished(myTilesOverlay)) {
    chosenTile = randomNo;
    for (let i = 0; i < myTilesOverlay.length; i += 1) {
      if (myTilesOverlay[i] === chosenTile) {
        if (!Number.isNaN(parseInt(playerBoard[i], 10))) {
          myTilesOverlay[i] = "miss";
        } else if (checkIfShipIsDestroyed(myTilesOverlay, playerBoard, chosenTile)) {
          surroundingTiles = getSurroundingTiles(tilesOverlay, playerBoard, myTilesOverlay[i]);
          surroundingTiles.forEach((num) => {
            myTilesOverlay[parseInt(num, 10)] = "miss";
          })

          myTilesOverlay[i] = "hit finished";
        } else {
          myTilesOverlay[i] = "hit";
        }
      }
    }
  } else {
    chosenTile = tile;
    myTilesOverlay = sentTileOverlay;
    for (let i = 0; i < myTilesOverlay.length; i += 1) {
      if (myTilesOverlay[i] === chosenTile) {
        if (!Number.isNaN(parseInt(playerBoard[i], 10))) {
          myTilesOverlay[i] = "miss";
        } else if (checkIfShipIsDestroyed(myTilesOverlay, playerBoard, chosenTile)) {
          surroundingTiles = getSurroundingTiles(tilesOverlay, playerBoard, myTilesOverlay[i]);
          surroundingTiles.forEach((num) => {
            myTilesOverlay[parseInt(num, 10)] = "miss";
          })
          myTilesOverlay[i] = "hit finished";
          myTilesOverlay[parseInt(hitTile, 10)] = "hit checked";
        } else {
          myTilesOverlay[i] = "hit";
          myTilesOverlay[parseInt(hitTile, 10)] = "hit checked";
        }
      }
    }
  }
  return { myTilesOverlay, tile, surroundingTiles };
}

export function getTypeOfSquare(id) {
  const [row, col] = id.split("").map(num => parseInt(num, 10));

  if (row === 0 && col === 0) {
    return "squareMissileTopLeft";
  }
  if (row === 0 && col === 9) {
    return "squareMissileTopRight";
  }
  if (row === 9 && col === 0) {
    return "squareMissileBottomLeft";
  }
  if (row === 9 && col === 9) {
    return "squareMissileBottomRight";
  }
  if (row === 0) {
    return "squareMissileTop";
  }
  if (col === 0) {
    return "squareMissileLeft";
  }
  if (col === 9) {
    return "squareMissileRight"
  }
  if (row === 9) {
    return "squareMissileBottom"
  }
  if (row > 0 && row < 9 && col > 0 && col < 9) {
    return "squareMissileCenter"
  }
  return `the id is ${row}${col} and it isunspecified in if statment`;
}

export function getPosition(tiles, x, y) {
  const box = tiles.getBoundingClientRect();
  const width = box.width - 9;
  const { height } = box;

  let col = -1;
  let row = -1;

  if (x > (box.right - (width / 10))) {
    col = 9;
  } else if (x > (box.right - (width * 2 / 10))) {
    col = 8;
  } else if (x > (box.right - (width * 3 / 10))) {
    col = 7;
  } else if (x > (box.right - (width * 4 / 10))) {
    col = 6;
  } else if (x > (box.right - (width * 5 / 10))) {
    col = 5;
  } else if (x > (box.right - (width * 6 / 10))) {
    col = 4;
  } else if (x > (box.right - (width * 7 / 10))) {
    col = 3;
  } else if (x > (box.right - (width * 8 / 10))) {
    col = 2;
  } else if (x > (box.right - (width * 9 / 10))) {
    col = 1;
  } else if (x > (box.right - (width * 10 / 10))) {
    col = 0;
  }

  if (y > (box.bottom - (height / 10))) {
    row = 9;
  } else if (y > (box.bottom - (height * 2 / 10))) {
    row = 8;
  } else if (y > (box.bottom - (height * 3 / 10))) {
    row = 7;
  } else if (y > (box.bottom - (height * 4 / 10))) {
    row = 6;
  } else if (y > (box.bottom - (height * 5 / 10))) {
    row = 5;
  } else if (y > (box.bottom - (height * 6 / 10))) {
    row = 4;
  } else if (y > (box.bottom - (height * 7 / 10))) {
    row = 3;
  } else if (y > (box.bottom - (height * 8 / 10))) {
    row = 2;
  } else if (y > (box.bottom - (height * 9 / 10))) {
    row = 1;
  } else if (y > (box.bottom - (height * 10 / 10))) {
    row = 0;
  }

  return { col, row };
}

export function lineMissile(tiles, col, row, alignment = "vertical") {
  if (alignment === "vertical") {
    if (col === 0) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("zerothCol");
    }
    if (col === 1) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("firstCol");
    }
    if (col === 2) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("secondCol");
    }
    if (col === 3) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("thirdCol");
    }
    if (col === 4) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("fourthCol");
    }
    if (col === 5) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("fifthCol");
    }
    if (col === 6) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("sixthCol");
    }
    if (col === 7) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("seventhCol");
    }
    if (col === 8) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("eighthCol");
    }
    if (col === 9) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("ninthCol");
    }
  } else {
    if (row === 0) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("zerothRow");
    }
    if (row === 1) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("firstRow");
    }
    if (row === 2) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("secondRow");
    }
    if (row === 3) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("thirdRow");
    }
    if (row === 4) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("fourthRow");
    }
    if (row === 5) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("fifthRow");
    }
    if (row === 6) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("sixthRow");
    }
    if (row === 7) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("seventhRow");
    }
    if (row === 8) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("eighthRow");
    }
    if (row === 9) {
      tiles.classList.remove(...tiles.classList);
      tiles.classList.add("tiles");
      tiles.classList.add("ninthRow");
    }
  }
}

export function getSquareTiles(tile) {
  let [row, col] = tile.split("").map(num => parseInt(num, 10));
  if (row === 0) {
    row += 1;
  }
  if (row === 9) {
    row -= 1;
  }
  if (col === 0) {
    col += 1;
  }
  if (col === 9) {
    col -= 1;
  }
  const squareTiles = [];
  squareTiles.push(`${row - 1}${col - 1}`);
  squareTiles.push(`${row - 1}${col}`);
  squareTiles.push(`${row - 1}${col + 1}`);
  squareTiles.push(`${row}${col - 1}`);
  squareTiles.push(`${row}${col}`);
  squareTiles.push(`${row}${col + 1}`);
  squareTiles.push(`${row + 1}${col - 1}`);
  squareTiles.push(`${row + 1}${col}`);
  squareTiles.push(`${row + 1}${col + 1}`);
  return squareTiles;
}

export function getLineTiles(tile, alignment) {
  const [row, col] = tile.split("").map(num => parseInt(num, 10));
  const tiles = [];

  if (alignment === "vertical") {
    for (let i = 0; i < 10; i += 1) {
      tiles.push(`${i}${col}`);
    }
  } else if (alignment === "horizontal") {
    for (let i = 0; i < 10; i += 1) {
      tiles.push(`${row}${i}`);
    }
  }

  return tiles;
}

// export function singluarClick(tilesOverlay, boardArray, number) {

// }


export function createBoardArray(dataArray) {
  const boardArray = [];

  for (let i = 0; i < 100; i += 1) {
    boardArray.push(`${i}`.padStart(2, "0"))
  }

  let count = 0;

  dataArray.forEach(ship => {
    const [row, col] = ship[1].split("").map(num => parseInt(num, 10));

    if (ship[0] === "single_horizontal") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "double_horizontal") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 1}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "tri_horizontal") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 1}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 2}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "quad_horizontal") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 1}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 2}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row}${col + 3}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "single_vertical") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "double_vertical") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 1}${col}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "tri_vertical") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 1}${col}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 2}${col}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }

    if (ship[0] === "quad_vertical") {
      boardArray[parseInt(`${row}${col}`, 10)] = `${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 1}${col}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 2}${col}`, 10)] = `- ${ship[0]}X${count}`;
      boardArray[parseInt(`${row + 3}${col}`, 10)] = `- ${ship[0]}X${count}`;
      count += 1;
    }
  })

  return boardArray;
}


export function createCreatedBoard(dataArray) {
  let createdBoard = [];

  for (let i = 0; i < 100; i += 1) {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.classList.add("onlyTile");
    div.id = `${i}`.padStart(2, "0");
    createdBoard.push(div);
  }

  dataArray.forEach(ship => {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add(`${ship[0]}`);
    // createdBoard[parseInt(ship[1], 10)] = shipDiv;


    const ids = getIds(ship);


    createdBoard.forEach((div, index) => {
      const divId = div.id;
      const shipId = ship[1];

      if (divId == shipId) {
        createdBoard[index] = shipDiv;
      }
    })

    // createdBoard.forEach((div, index) => {
    //   const divId = div.id;

    //   if (ids.includes(divId)) {
    //     createdBoard.splice(index, 1);
    //   }
    // })

    createdBoard = createdBoard.filter(div => !ids.includes(div.id));

    // const [row, col] = ship[1].split("").map(num => parseInt(num, 10));

    // if (ship[0] === "double_horizontal") {
    //   createdBoard.splice(parseInt(ship[1], 10) + 1, 1);
    // }

    // if (ship[0] === "tri_horizontal") {
    //   createdBoard.splice(parseInt(ship[1], 10) + 1, 2);
    // }

    // if (ship[0] === "quad_horizontal") {
    //   createdBoard.splice(parseInt(ship[1], 10) + 1, 3);
    // }

    // if (ship[0] === "double_vertical") {
    //   createdBoard.splice(parseInt(`${row + 1}${col}`, 10), 1);
    // }

    // if (ship[0] === "tri_vertical") {
    //   createdBoard.splice(parseInt(`${row + 1}${col}`, 10), 1);
    //   createdBoard.splice(parseInt(`${row + 2}${col}`, 10), 1);
    // }

    // if (ship[0] === "quad_vertical") {
    //   createdBoard.splice(parseInt(`${row + 1}${col}`, 10), 1);
    //   createdBoard.splice(parseInt(`${row + 2}${col}`, 10), 1);
    //   createdBoard.splice(parseInt(`${row + 3}${col}`, 10), 1);
    // }

  })

  return createdBoard;
}

export function getIds(ship) {
  const result = [];

  const [row, col] = ship[1].split("").map(num => parseInt(num, 10));

  if (ship[0] == "single_horizontal" || ship[0] == "single_vertical") {
    result.push(ship[1]);
  }

  if (ship[0] == "double_horizontal") {
    result.push(`${row}${col}`);
    result.push(`${row}${col + 1}`);
  }

  if (ship[0] == "tri_horizontal") {
    result.push(`${row}${col}`);
    result.push(`${row}${col + 1}`);
    result.push(`${row}${col + 2}`);
  }

  if (ship[0] == "quad_horizontal") {
    result.push(`${row}${col}`);
    result.push(`${row}${col + 1}`);
    result.push(`${row}${col + 2}`);
    result.push(`${row}${col + 3}`);
  }

  if (ship[0] == "double_vertical") {
    result.push(`${row}${col}`);
    result.push(`${row + 1}${col}`);
  }

  if (ship[0] == "tri_vertical") {
    result.push(`${row}${col}`);
    result.push(`${row + 1}${col}`);
    result.push(`${row + 2}${col}`);
  }

  if (ship[0] == "quad_vertical") {
    result.push(`${row}${col}`);
    result.push(`${row + 1}${col}`);
    result.push(`${row + 2}${col}`);
    result.push(`${row + 3}${col}`);
  }

  return result;
}
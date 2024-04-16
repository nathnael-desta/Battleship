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
      // console.log("******************************************************",myBoard[parseInt(`${row - 1}${col}`, 10)], Number.isNaN(parseInt(myBoard[parseInt(`${row - 1}${col}`, 10)], 10)))
      // if (Number.isNaN(myBoard[parseInt(`${row - 1}${col}`, 10)])) {
      //   console.log("******************************************************", myBoard[parseInt(`${row - 1}${col}`, 10)])
      // }
      
      if (row > 0) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row - 1}${col}`, 10)], 10)) ) {
          return "-";
        }
      }
      if (row < 9) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row + 1}${col}`, 10)], 10)) ) {
          return "-";
        }
      }
      if (col > 0) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row}${col - 1}`, 10)], 10)) ) {
          return "-";
        }
      }
      if (col < 9) {
        if (Number.isNaN(parseInt(myBoard[parseInt(`${row}${col + 1}`, 10)], 10)) ) {
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
export function insertInsideArray(obj, board){
  const myBoard = [...board];
  const {del, insert, start} = obj;
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
  const {del, insert, start} = insertAt(col, row, shipName, myShips);
  if (parseInt(getNumberFromTile(...start), 10) !== parseInt(placementSquare, 10)) {
    return false;
  }  
  if (shipName === "single_vertical" || shipName === "single_horizontal") {
    if(Number.isNaN(parseInt(myBoard[parseInt(placementSquare, 10)], 10))) {
      return false;
    }
    return true;
  }
  if(Number.isNaN(parseInt(myBoard[parseInt(placementSquare, 10)], 10))) {
    return false;
  }
  for (let i = 0; i < del.length; i += 1) {
    if(Number.isNaN(parseInt(myBoard[getNumberFromTile(...del[i])], 10))) {
      return false;
    }
  }
  return true
}

export function addableSquares(shipName, board) {
  const addableBoard = [];
  for (let i = 0; i < board.length; i += 1) {
    if (!Number.isNaN(parseInt(board[i], 10))) {
      if (checkIfInsertable(board[i], shipName, board)) {
        addableBoard.push(board[i]);
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
  let copy = [...arr];
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
    console.log("...............................................", shipName)
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
  const createdBoard = []
  const myBoard = finalBoard(board);
  for (let i = 0; i < myBoard.length; i += 1) {
    if (!Number.isNaN(parseInt(myBoard[i], 10))) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add("onlyTile");
      tile.id = `${myBoard[i]}`;
      createdBoard.push(tile);
      tiles.appendChild(tile);
    } else if (myBoard[i].split("")[myBoard[i].split("").length - 1] !== "-") {
      const newShip = createShips(myBoard[i].split("X")[0]);
      createdBoard.push(newShip);
      tiles.appendChild(newShip);
    }
  }  
  return createdBoard
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
  return {createdBoard, boardArray};
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
  if(shipName === "tri_horizontal") {
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

    if(tileDistance < 30) {
      tile.classList.add("miss");
    }
  })
}




export function checkIfShipIsDestroyed(tilesOverlay, playerBoard, shotTile) {
  const [row, col] = shotTile.split("").map((value) => parseInt(value, 10));
  
  let shipType = "";
  let checkShip = "";
 
 
  if (isNaN(playerBoard[`${row}${col}`])) {
   shipType = playerBoard[`${row}${col}`].split(" ")[playerBoard[`${row}${col}`].split(" ").length - 1];
  }
  // --------------------------------------------------------------
  else {
   return false
  }
  const allTileNumbersWithThisShipAreHit = playerBoard.reduce((acc, tile, index) => {
   if (isNaN(tile)) {
     checkShip = tile.split(" ")[tile.split(" ").length - 1];
     if (checkShip === shipType) {
       
       if (index === parseInt(`${row}${col}`, 10)) {
         return true;
       }
       if (tilesOverlay[index] === "hit") {
         return acc;
       } 
       return false;
     }
   }
   return acc && true;
  }, true)
  return allTileNumbersWithThisShipAreHit
 
 
  // ---------------------------------------------------------
 
 //  console.log(playerBoard[parseInt(`${row - 1}${col}`, 10)], playerBoard[parseInt(`${row + 1}${col}`, 10)], isNaN("asdf"))
 //  if (row > 0) {
 //   let up = playerBoard[parseInt(`${row - 1}${col}`, 10)];
 //   if (isNaN(up)) {
 //     checkShip = up.split("")[up.split("").length - 1];
 //     if (checkShip === shipType) {
 //       return false;
 //     }
 //   }
 //  }
 
 //  if (row < 10) {
 //   let down = playerBoard[parseInt(`${row + 1}${col}`, 10)];
 //   if (isNaN(down)) {
 //     checkShip = down.split("")[down.split("").length - 1];
 //     if (checkShip === shipType) {
 //       return false;
 //     }
 //   }
 //  } 
 
 //  if (col > 0) {
 //   let left = playerBoard[parseInt(`${row}${col - 1}`, 10)]; 
 //   if (isNaN(left)) {
 //     checkShip = left.split("")[left.split("").length - 1];
 //     if (checkShip === shipType) {
 //       return false;
 //     }
 //   }
 //  }
 
 //  if (col < 10) {
 //   let right = playerBoard[parseInt(`${row}${col + 1}`, 10)];
 //   if (isNaN(right)) {
 //     checkShip = right.split("")[right.split("").length - 1];
 //     if (checkShip === shipType) {
 //       return false;
 //     }
 //   }
 //  }
 
 //  return true
 
 }

 export function getIndexOfFirstHit(tilesOverlay) {
  const myTilesOverlay = [...tilesOverlay]
  const firstTile = myTilesOverlay.reduce((acc, tile, index) => {
    if (isNaN(tile) && tile.split(" ")[tile.split(" ").length - 1] !== "finished" && tile.split(" ")[tile.split(" ").length - 1] !== "checked") {
      return {
        hitTile: `${index}`,
        newTilesOverlay: myTilesOverlay.map((value, tileIndex) => {
          if (tileIndex === index) {
            return "hit checked"
          }
          return value
        })
      }
    }
    return acc || null
  }, null)
  return firstTile || "all hit tiles have been finished";
 }

 export function checkIfAllHitsFinished(tilesOverlay) {
  return tilesOverlay.reduce((acc, tile) => {
    if (isNaN(tile)) {
      if (tile !== "miss" && tile.split(" ").indexOf("finished") === -1) {
        return false;
      }
    }
    return acc && true;
  }, true);
 }

 export function getIndexOfNextLikelyTile(tilesOverlay) {
  const {hitTile, newTilesOverlay} = getIndexOfFirstHit(tilesOverlay);
  if (!isNaN(hitTile)) {
    const [row, col] = hitTile.split("").map((value) => parseInt(value, 10));
    if (row > 0) {
      if (!isNaN(tilesOverlay[`${row - 1}${col}`])) {
        return {tile: `${row - 1}${col}`, sentTileOverlay: newTilesOverlay}
      }
    }

    if (row < 9) {
      if (!isNaN(tilesOverlay[`${row + 1}${col}`])) {
        return {tile: `${row + 1}${col}`, sentTileOverlay: newTilesOverlay}
      }
    }

    if (col > 0) {
      if (!isNaN(tilesOverlay[`${row}${col - 1}`])) {
        return {tile: `${row}${col - 1}`, sentTileOverlay: newTilesOverlay}
      }
    }

    if (col < 9) {
      if (!isNaN(tilesOverlay[`${row}${col + 1}`])) {
        return {tile: `${row}${col + 1}`, sentTileOverlay: newTilesOverlay}
      }
    }

    return "can't find where to hit for some reason"
  }

  return "all hit tiles have been finished"
 }

export function shoot(tilesOverlay, playerBoard, randomNo) {
  let myTilesOverlay = [...tilesOverlay];
  let chosenTile = randomNo;
  if (checkIfAllHitsFinished(myTilesOverlay)) {
    chosenTile = randomNo;
  } else {
    const {tile, sentTileOverlay} = getIndexOfNextLikelyTile(tilesOverlay);  
    chosenTile = tile;
    myTilesOverlay = sentTileOverlay;
    console.log(chosenTile, myTilesOverlay, getIndexOfNextLikelyTile(tilesOverlay))
  }
  

  for(let i = 0; i < myTilesOverlay.length; i += 1) {
    if (myTilesOverlay[i] === chosenTile) {
      if (!Number.isNaN(parseInt(playerBoard[i], 10))) {
        myTilesOverlay[i] = "miss";
      } else if (checkIfShipIsDestroyed(myTilesOverlay, playerBoard, chosenTile)) {
          myTilesOverlay[i] = "hit finished";
      } else {
        myTilesOverlay[i] = "hit"
      }
    }
  }
  return myTilesOverlay;
}

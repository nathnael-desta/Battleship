export function createSquares(tiles, numbers = [101], pieceSquare = 101, piece = null) {
    let count = 0;

    for(let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.id = `${i}${j}`;

        if (count === pieceSquare) {
            const newShip = createShips(piece);
             tiles.appendChild(newShip);
             count += 1; 
             continue;
        }
        if (numbers.indexOf(count) !== -1) {
            count += 1;
            continue;
        }
        count += 1;
        tiles.appendChild(tile);
      }
    }
  }

  function deleteBoard(tiles) {
    while(tiles.firstChild) {
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
        singleVertical.appendChild(circle);
      }
      return singleVertical;
    } if (shipName === "single_horizontal") {
      const singleHorizontal = document.createElement("div");
      
      singleHorizontal.classList.add("single_horizontal");
      for (let i = 0; i < 1; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        singleHorizontal.appendChild(circle);
      }
      return singleHorizontal;
    } if (shipName === "double_vertical") {
      const doubleVertical = document.createElement("div");
      doubleVertical.classList.add("double_vertical");
      for (let i = 0; i < 2; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        doubleVertical.appendChild(circle);
      }
      return doubleVertical;
    } if (shipName === "double_horizontal") {
      const doubleHorizontal = document.createElement("div");
      doubleHorizontal.classList.add("double_horizontal");
      for (let i = 0; i < 2; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
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
    "single_vertical" : {name: "sv", alignment: "vertical", delete:1},
    "single_horizontal" : {name: "sh", alignment: "horizontal", delete:1},
    "double_vertical" : {name: "dv", alignment: "vertical", delete:2},
    "double_horizontal" : {name: "dh", alignment: "horizontal", delete:2},
    "tri_vertical" : {name: "tv", alignment: "vertical", delete:3},
    "tri_horizontal" : {name: "th", alignment: "horizontal", delete:3},
    "quad_vertical" : {name: "qv", alignment: "vertical", delete:4},
    "quad_horizontal" : {name: "qh", alignment: "horizontal", delete:4},
  }

  export function getTile(tiles, col, row) {
  }

  function getNumberFromTile(col, row) {
    const lettersToNum = {
        "A" : 0,
        "B" : 1,
        "C" : 2,
        "D" : 3,
        "E" : 4,
        "F" : 5,
        "G" : 6,
        "H" : 7,
        "I" : 8,
        "J" : 9,
      }

      return parseInt(`${row - 1}${lettersToNum[col]}`);
  }

  export function getTileFromNumber(row, col) {
    const numToLetters = {
        "0" : "A",
        "1" : "B",
        "2" : "C",
        "3" : "D",
        "4" : "E",
        "5" : "F",
        "6" : "G",
        "7" : "H",
        "8" : "I",
        "9" : "J",
      }

      return `${numToLetters[col]}${parseInt(row) + 1}`;
  }

  export function insertAt(col, row, ship, myShips) {
    const piece = ship.classList[2];
    console.log(piece)
    if (col < "A" || col > "J" || row < 0 || row > 10 || myShips == null || myShips[piece] == null) {
      return "incorrect input";
    }
  
    const result = {insert: myShips[piece].name};
    const deletes = [];
    const rerunDeletes = [];
    const count = myShips[piece].delete;
  
    if(myShips[piece].alignment === "vertical") {
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

  export function insert(col, row, ship, myShips, tiles) {
    const circle = JSON.parse(ship.dataset.circle);
    const { shift, alignment } = circle;
    if (alignment === "horizontal") {
      for (let i = 0; i < shift; i += 1) {
        if (col === "A") {
          break;
        }
        col = String.fromCharCode(col.charCodeAt(0) - 1);
      }
    }

    const insertObj = insertAt(col, row, ship, myShips);
    const deleteSquares = insertObj.del;
    const numbers = [];
    const pieceSquare = getNumberFromTile(insertObj.start[0], insertObj.start[1])

    const piece = ship.classList[2];
    
    deleteSquares.forEach((square) => {
        numbers.push(getNumberFromTile(square[0], square[1]))
    })
    deleteBoard(tiles)
    createSquares(tiles, numbers,pieceSquare, piece);
  }

  export function getDragElement(container,x,y) {
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

  export function whichCircle(ship, x, y) {
    const box = ship.getBoundingClientRect();
    const firstHorizontalCircle = box.left + (box.width / 2);
    const secondHorizontalCircle = box.left + 2 * (box.width / 3); 
    const thirdHorizontalCircle = box.left + 3 * (box.width / 3); 
    console.log("this is x", x, "first circle", firstHorizontalCircle, "second circle", secondHorizontalCircle, "third circle", thirdHorizontalCircle);

    if (ship.classList[2] === "single_vertical" || ship.classList[2] === "single_horizontal") {
      return {
        shift: 0,
        alignment: "horizontal" 
      };
    } 

    if (ship.classList[2] === "double_horizontal") {
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

    if (ship.classList[2] === "tri_horizontal") {
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

    if (ship.classList[2] === "quad_horizontal") {
      if (x <= firstHorizontalCircle - 35 ) {
        return {
          shift: 0,
          alignment: "horizontal" 
        };
      } 

      if (x <= secondHorizontalCircle -25 ) {
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

    return {
      shift: 1000,
      alignment: "horizontal"
    };
    

  }
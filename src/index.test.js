/**
 * @jest-environment jsdom
 */

import { insertAt, getTile, finalTile } from './board.js';


describe('insertion tests', () => {
    const myShips = {
        "single_vertical" : {name: "sv", alignment: "vertical", delete:1},
        "single_horizontal" : {name: "sh", alignment: "horizontal", delete:1},
        "double_vertical" : {name: "dv", alignment: "vertical", delete:2},
        "double_horizontal" : {name: "dh", alignment: "horizontal", delete:2},
        "tri_vertical" : {name: "tv", alignment: "vertical", delete:3},
        "tri_horizontal" : {name: "th", alignment: "horizontal", delete:3},
        "quad_vertical" : {name: "qv", alignment: "vertical", delete:4},
        "quad_horizontal" : {name: "qh", alignment: "horizontal", delete:4},
      }

    // const fs = require('fs');
    // const JSDOM = require('jsdom').JSDOM;

    // process.chdir(__dirname);
    // const htmlContent = fs.readFileSync('./index.ejs', 'utf8');
    // const dom = new JSDOM(htmlContent);
    // const document = dom.window.document;

    // const tiles = document.querySelectorAll(".tiles");
    // const playerTiles = document.querySelector(".player .tiles");
    // const opponentTiles = document.querySelector(".opponent .tiles");
    // const main = document.querySelector('.main');
    // console.log("...........................................................................", document)


    test("inset tests", () => {
        
        expect(insertAt("F", 2, "single_vertical", myShips)).toEqual(
            {
                del: [["F",2]],
                insert: "sv",
                start: ["F", 2],
               
            }
        )
        
        expect(insertAt("J", 1, "double_vertical", myShips)).toEqual(
            {
                del: [["J",1], ["J", 2]],
                insert: "dv",
                start: ["J", 1],
             
            }
        )

        expect(insertAt("J", 10, "double_vertical", myShips)).toEqual(
            {
                del: [["J", 9], ["J",10]],
                insert: "dv",
                start: ["J", 9],
      
            }
        )

        expect(insertAt("J", 10, "quad_vertical", myShips)).toEqual(
            {
                del: [["J", 7], ["J", 8], ["J", 9], ["J",10],],
                insert: "qv",
                start: ["J", 7],
   
            }
        )
        
        expect(insertAt("J", -1, "quad_vertical", myShips)).toEqual(
            "incorrect input"
        )

        expect(insertAt("J", 11, "quad_vertical", myShips)).toEqual(
            "incorrect input"
        )

        expect(insertAt("K", 1, "quad_vertical", myShips)).toEqual(
            "incorrect input"
        )

        expect(insertAt("F", 2, "single_horizontal", myShips)).toEqual(
            {
                del: [["F",2]],
                insert: "sh",
                start: ["F", 2],
             
            }
        )
        
        expect(insertAt("J", 1, "double_horizontal", myShips)).toEqual(
            {
                del: [["I",1], ["J", 1]],
                insert: "dh",
                start: ["I", 1],
          
            }
        )

        expect(insertAt("J", 10, "double_horizontal", myShips)).toEqual(
            {
                del: [["I", 10], ["J",10]],
                insert: "dh",
                start: ["I", 10],

            }
        )

        expect(insertAt("J", 10, "quad_horizontal", myShips)).toEqual(
            {
                del: [["G", 10], ["H", 10], ["I", 10], ["J",10],],
                insert: "qh",
                start: ["G", 10],
            }
        )
    })


    test("final tile", () => {
        const circleData1 = {
            shift: 1,
            alignment: "horizontal" 
          };

          const circleData2 = {
            shift: 2,
            alignment: "horizontal" 
          };

        expect(finalTile("E", 4, circleData1 )).toEqual(
            {
                col: "F",
                row: 4
            }
        )

        expect(finalTile("H", 10, circleData2 )).toEqual(
            {
                col: "J",
                row: 10
            }
        )
    })
})


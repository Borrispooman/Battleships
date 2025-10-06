import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Dom from "./dom.js";
import "./style.css";
import "./reset.css";

function createDummyShip(gameboard, p2gameboard) {
  const ship = new Ship(3);

  ship.setSpanXYs([
    [0, 1],
    [0, 2],
    [0, 3],
  ]);

  const ship2 = new Ship(3);

  ship2.setSpanXYs([
    [3, 1],
    [3, 2],
    [3, 3],
  ]);

  const ship3 = new Ship(3);

  ship3.setSpanXYs([
    [5, 1],
    [5, 2],
    [5, 3],
  ]);

  const ship4 = new Ship(3);

  ship4.setSpanXYs([
    [1, 5],
    [2, 5],
    [3, 5],
  ]);

  gameboard.placeShip(ship);
  gameboard.placeShip(ship2);
  gameboard.placeShip(ship3);
  gameboard.placeShip(ship4);
  const p2ship = new Ship(3);

  p2ship.setSpanXYs([
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  const p2ship2 = new Ship(3);

  p2ship2.setSpanXYs([
    [3, 1],
    [3, 2],
    [3, 3],
  ]);

  const p2ship3 = new Ship(3);

  p2ship3.setSpanXYs([
    [5, 1],
    [5, 2],
    [5, 3],
  ]);

  const p2ship4 = new Ship(3);

  p2ship4.setSpanXYs([
    [1, 5],
    [2, 5],
    [3, 5],
  ]);

  p2gameboard.placeShip(p2ship);
  p2gameboard.placeShip(p2ship2);
  p2gameboard.placeShip(p2ship3);
  p2gameboard.placeShip(p2ship4);
}

let aiMode = false;
let p1Turn = true;
let p2Turn = false;

const gameboard = new Gameboard();
const p2gameboard = new Gameboard();

Dom.renderBoard(".p1-board-container", "p1");
Dom.renderBoard(".p2-board-container", "p2");

const p1BoardCells = document.querySelectorAll(".p1-board-cell");

p1BoardCells.forEach((cell) =>
  cell.addEventListener("click", (event) => {
    if (p2Turn) {
      const clickedCell = event.target.id || event.target.parentNode.id;
      console.log(clickedCell);
      const [x, y] = clickedCell.split("");
      const intXY = [parseInt(x), parseInt(y)];
      const status = gameboard.receiveAttack(intXY);
      if (status === "hit") {
        Dom.renderHit(intXY, "p1");
        p1Turn = true;
        p2Turn = false;
        return;
      } else if (status === "miss") {
        Dom.renderMiss(intXY, "p1");
        p1Turn = true;
        p2Turn = false;
        return;
      } else {
        //Dom.handleAlreadyAttacked();
      }
    } else {
      //Dom.handleNotTurn;
    }
  }),
);

const p2BoardCells = document.querySelectorAll(".p2-board-cell");

p2BoardCells.forEach((cell) =>
  cell.addEventListener("click", (event) => {
    if (p1Turn) {
      const clickedCell = event.target.id || event.target.parentNode.id;
      console.log(clickedCell);
      const [x, y] = clickedCell.split("");
      const intXY = [parseInt(x), parseInt(y)];
      const status = p2gameboard.receiveAttack(intXY);
      if (status === "hit") {
        Dom.renderHit(intXY, "p2");
        p2Turn = true;
        p1Turn = false;
        if (aiMode) {
          computerAttack();
        }
        return;
      } else if (status === "miss") {
        Dom.renderMiss(intXY, "p2");
        p2Turn = true;
        p1Turn = false;
        if (aiMode) {
          computerAttack();
        }
        return;
      } else {
        //Dom.handleAlreadyAttacked();
      }
    } else {
      //Dom.handleNotTurn();
    }
  }),
);

function computerAttack() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  const status = gameboard.receiveAttack([x, y]);

  if (status === null) {
    computerAttack();
    return;
  }
  if (status === "hit") {
    Dom.renderHit([x, y], "p1");
    p1Turn = true;
    p2Turn = false;
    return;
  } else if (status === "miss") {
    Dom.renderMiss([x, y], "p1");
    p1Turn = true;
    p2Turn = false;
    return;
  }
}

createDummyShip(gameboard, p2gameboard);

Dom.renderShips(gameboard, "p1");
window.rD = function rD() {
  Dom.renderShips(gameboard, "p1");
};

//Dom.renderShips(p2gameboard, "p2");

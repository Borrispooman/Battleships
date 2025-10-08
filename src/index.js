import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Dom from "./dom.js";
import Game from "./game-controls.js";
import "./style.css";
import "./reset.css";

function isObject(value) {
  const type = typeof value;
  return type === "object" && value !== null; // Exclude null, which typeof also returns as 'object'
}

const game = new Game();
Dom.renderPlacementBoard(".p1-board-container", "p1");
const ships = game.createStarterShips();
Dom.renderPlacementShips(ships);
const shipNodes = document.querySelectorAll(".placement-ship");
shipNodes[0].classList.add("selected");
let nodeListIndex = 0;
let nodeListLength1 = false;
game.selectedPlacement = ships[0];
const axis = "horizontal";

const p1Gameboard = new Gameboard();

const compGameboard = new Gameboard();

const shipPlaceHolder = new Ship();
const compShips = shipPlaceHolder.createRandomFleet();
for (let i = 0; i < compShips.length; i++) {
  compGameboard.placeShip(compShips[i]);
}

const placementCells = document.querySelectorAll(".p1-placement-cell");
placementCells.forEach((cell) => {
  cell.addEventListener("mouseenter", (event) => {
    const [x, y] = event.target.id.split("");
    if (
      game.selectedPlacement &&
      axis === "horizontal" &&
      parseInt(y) + game.selectedPlacement.length - 1 < 10
    ) {
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        if (isObject(p1Gameboard.board[parseInt(x)][parseInt(y) + i])) {
          return;
        }
      }
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        const cell = document.querySelector(
          `.p1-placement-cell[id = "${parseInt(x)}${parseInt(y) + i}"]`,
        );
        cell.style.backgroundColor = "white";
      }
    }
  });
  cell.addEventListener("mouseout", (event) => {
    const [x, y] = event.target.id.split("");
    if (
      game.selectedPlacement &&
      axis === "horizontal" &&
      parseInt(y) + game.selectedPlacement.length - 1 < 10
    ) {
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        if (isObject(p1Gameboard.board[parseInt(x)][parseInt(y) + i] || null)) {
          return;
        }
      }
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        const cell = document.querySelector(
          `.p1-placement-cell[id = "${parseInt(x)}${parseInt(y) + i}"]`,
        );
        cell.style.backgroundColor = "#2a2a2a";
      }
    }
  });
  cell.addEventListener("click", (event) => {
    const [x, y] = event.target.id.split("");
    if (
      game.selectedPlacement &&
      axis === "horizontal" &&
      parseInt(y) + game.selectedPlacement.length - 1 < 10
    ) {
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        if (isObject(p1Gameboard.board[parseInt(x)][parseInt(y) + i] || null)) {
          return;
        }
      }
      const spanXYs = [];
      for (let i = 0; i < game.selectedPlacement.length; i++) {
        const cell = document.querySelector(
          `.p1-placement-cell[id = "${parseInt(x)}${parseInt(y) + i}"]`,
        );
        cell.style.backgroundColor = "red";
        spanXYs.push([parseInt(x), parseInt(y) + i]);
      }
      console.log(spanXYs);
      console.log(shipNodes);
      game.selectedPlacement.setSpanXYs(spanXYs);
      shipNodes[nodeListIndex].remove();
      if (!(nodeListIndex === shipNodes.length - 1)) {
        nodeListIndex++;
      }
      const shipToPlace = ships.shift() || null;
      if (ships.length === 0) {
        document.querySelector(".p1-board-container").innerHTML = "";
        Dom.renderBoard(".p1-board-container", "p1");
        Dom.renderBoard(".p2-board-container", "p2");
        Dom.renderShips(p1Gameboard, "p1");
        document.querySelector(".game-container").classList.add("two-boards");
        assignEventListeners();
      }

      shipNodes[nodeListIndex].classList.add("selected");
      game.selectedPlacement = ships[0];
      p1Gameboard.placeShip(shipToPlace);
      if (ships.length === 1) {
        game.selectedPlacement === null;
      }
    }
  });
});

function assignEventListeners() {
  const p2BoardCells = document.querySelectorAll(".p2-board-cell");

  p2BoardCells.forEach((cell) =>
    cell.addEventListener("click", async (event) => {
      console.log("clicked p2 cell");
      if (game.p1Turn) {
        const clickedCell = event.target.id || event.target.parentNode.id;
        const [x, y] = clickedCell.split("");
        const intXY = [parseInt(x), parseInt(y)];
        const status = compGameboard.receiveAttack(intXY);
        if (status === "hit") {
          Dom.renderHit(intXY, "p2");
          await game.sleep(1500);
          const attackData = game.computerAttack(p1Gameboard);
          const attackStatus = attackData[0];
          const attackXY = attackData[1];
          if (attackStatus === "hit") {
            Dom.renderHit(attackXY, "p1");
            return;
          } else if (attackStatus === "miss") {
            Dom.renderMiss(attackXY, "p1");
            return;
          }
        } else if (status === "miss") {
          Dom.renderMiss(intXY, "p2");
          await game.sleep(1500);
          const attackData = game.computerAttack(p1Gameboard);
          const attackStatus = attackData[0];
          const attackXY = attackData[1];
          if (attackStatus === "hit") {
            Dom.renderHit(attackXY, "p1");
            return;
          } else if (attackStatus === "miss") {
            Dom.renderMiss(attackXY, "p1");
            return;
          }
        } else {
          //Dom.handleAlreadyAttacked();
        }
      } else {
        //Dom.handleNotTurn();
      }
    }),
  );
}

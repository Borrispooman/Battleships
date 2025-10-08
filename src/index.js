import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Dom from "./dom.js";
import Game from "./game-controls.js";
import "./style.css";
import "./reset.css";

Dom.renderPlacementBoard(".p1-board-container", "p1");

function later() {
  const p1gameboard = new Gameboard();
  const p2gameboard = new Gameboard();
  const game = new Game();

  Dom.renderBoard(".p1-board-container", "p1");
  Dom.renderBoard(".p2-board-container", "p2");

  const p1BoardCells = document.querySelectorAll(".p1-board-cell");

  p1BoardCells.forEach((cell) =>
    cell.addEventListener("click", (event) => {
      if (game.p2Turn) {
        const clickedCell = event.target.id || event.target.parentNode.id;
        console.log(clickedCell);
        const [x, y] = clickedCell.split("");
        const intXY = [parseInt(x), parseInt(y)];
        const status = p1gameboard.receiveAttack(intXY);
        if (status === "hit") {
          Dom.renderHit(intXY, "p1");
          if (!game.aiMode) {
            Dom.switchPlayerPerspective(p1gameboard, p2gameboard, true);
          }
          game.swapTurns();
          return;
        } else if (status === "miss") {
          Dom.renderMiss(intXY, "p1");
          if (!game.aiMode) {
            Dom.switchPlayerPerspective(p1gameboard, p2gameboard, true);
          }
          game.swapTurns();
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
    cell.addEventListener("click", async (event) => {
      if (game.p1Turn) {
        const clickedCell = event.target.id || event.target.parentNode.id;
        const [x, y] = clickedCell.split("");
        const intXY = [parseInt(x), parseInt(y)];
        const status = p2gameboard.receiveAttack(intXY);
        if (status === "hit") {
          Dom.renderHit(intXY, "p2");
          if (game.aiMode) {
            await game.sleep(1500);
            const attackData = game.computerAttack(p1gameboard);
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
            Dom.renderHit(intXY, "p2");
            Dom.switchPlayerPerspective(p1gameboard, p2gameboard, false);
            game.swapTurns();
            return;
          }
        } else if (status === "miss") {
          Dom.renderMiss(intXY, "p2");
          if (game.aiMode) {
            await game.sleep(1500);
            const attackData = game.computerAttack(p1gameboard);
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
            Dom.switchPlayerPerspective(p1gameboard, p2gameboard, false);
            game.swapTurns();
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

  game.createDummyShips(p1gameboard, p2gameboard);
  Dom.renderShips(p1gameboard, "p1");
}

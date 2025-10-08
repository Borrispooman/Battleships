import hitUrl from "./Assets/hit-audio-fixed.m4a";
let hitAudio = new Audio(hitUrl);
hitAudio.preload = "auto";
hitAudio.volume = "0.7";

import missUrl from "./Assets/miss-audio-fixed.m4a";
let missAudio = new Audio(missUrl);
missAudio.preload = "auto";
missAudio.volume = "0.7";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Dom = (() => {
  const renderPlacementShips = (ships) => {
    const shipsContainer = document.createElement("div");
    for (let i = 0; i < ships.length; i++) {
      const ship = document.createElement("div");
      ship.className = "placement-ship";
      ship.id = `${ships[i].length}`;
      ship.style.width = `${ships[i].length * 50}px`;
      shipsContainer.append(ship);
    }
    document.querySelector(".place-ships-container").append(shipsContainer);
  };

  const renderPlacementBoard = (targetDiv, playerTag) => {
    const boardDiv = document.createElement("div");
    boardDiv.className = `${playerTag}-placement-board`;
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(i / 10);
      const y = i % 10;

      const cell = document.createElement("div");
      cell.id = `${x}${y}`;
      cell.className = `${playerTag}-placement-cell`;
      boardDiv.append(cell);
    }
    document.querySelector(targetDiv).append(boardDiv);
  };
  const renderBoard = (targetDiv, playerTag) => {
    const boardDiv = document.createElement("div");
    boardDiv.className = `${playerTag}-board-div`;
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(i / 10);
      const y = i % 10;

      const cell = document.createElement("div");
      cell.id = `${x}${y}`;
      cell.className = `${playerTag}-board-cell`;
      boardDiv.append(cell);
    }
    document.querySelector(targetDiv).append(boardDiv);
  };
  const renderShips = (gameboard, playerTag) => {
    //const visitedIDs = []; -- unsure if this is nescessary yet

    for (let i = 0; i < gameboard.ships.length; i++) {
      //if (visitedIDs.includes(gameboard.ships[i].id)) {
      //		continue;
      //}

      for (let j = 0; j < gameboard.ships[i].spanXYsArr.length; j++) {
        const x = gameboard.ships[i].spanXYsArr[j][0];
        const y = gameboard.ships[i].spanXYsArr[j][1];

        const cell = document.querySelector(
          `.${playerTag}-board-cell[id="${x}${y}"]`,
        );
        cell.style.backgroundColor = "lightgreen";

        //      visitedIDs.push(gameboard.ships[i].id);
      }
    }
  };
  const deRenderShips = (playerTag) => {
    document.querySelectorAll(`.${playerTag}-board-cell`).forEach((cell) => {
      cell.style.backgroundColor = "white";
    });
  };
  const renderHit = async (XY, playerTag) => {
    const hitMarker = document.createElement("div");
    hitMarker.className = "hit-marker";
    const [x, y] = XY;
    const cell = document.querySelector(
      `.${playerTag}-board-cell[id="${x}${y}"]`,
    );
    cell.append(hitMarker);
    hitAudio.play();
    hitMarker.animate(
      [
        { transform: "scale(0.6)", opacity: 0.6, offset: 0 },
        { transform: "scale(1.15)", opacity: 1, offset: 0.6 },
        { transform: "scale(1.0)", opacity: 1, offset: 1 },
      ],
      { duration: 500, easing: "ease-out", iterations: 1 },
    );
    console.log("renderHit finished");
  };
  const renderMiss = async (XY, playerTag) => {
    const missMarker = document.createElement("div");
    missMarker.className = "miss-marker";
    const [x, y] = XY;
    const cell = document.querySelector(
      `.${playerTag}-board-cell[id="${x}${y}"]`,
    );
    cell.append(missMarker);
    missAudio.play();
    missMarker.animate(
      [
        { transform: "scale(0.6)", opacity: 0.6, offset: 0 },
        { transform: "scale(1.15)", opacity: 1, offset: 0.6 },
        { transform: "scale(1.0)", opacity: 1, offset: 1 },
      ],
      { duration: 500, easing: "ease-out", iterations: 1 },
    );

    console.log("renderMiss finished");
  };
  const switchPlayerPerspective = async (
    p1gameBoard,
    p2gameBoard,
    isP1veiw,
  ) => {
    await sleep(1500);
    if (isP1veiw) {
      renderShips(p1gameBoard, "p1");
      deRenderShips("p2");
    }

    if (!isP1veiw) {
      renderShips(p2gameBoard, "p2");
      deRenderShips("p1");
    }

    const gameContainer = document.querySelector(".game-container");
    const first = gameContainer.children[0];
    gameContainer.appendChild(first); // Moves the first child to the end
  };

  return {
    renderBoard,
    renderShips,
    deRenderShips,
    renderHit,
    renderMiss,
    switchPlayerPerspective,
    renderPlacementBoard,
    renderPlacementShips,
  };
})();

export default Dom;

const Dom = (() => {
  const renderBoard = (targetDiv, playerTag) => {
    const boardDiv = document.createElement("div");
    boardDiv.className = "board-div";
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

        console.log(`trying to place ship at coordinates ${x} ${y}`);

        const cell = document.querySelector(
          `.${playerTag}-board-cell[id="${x}${y}"]`,
        );
        cell.style.backgroundColor = "lightgreen";

        //      visitedIDs.push(gameboard.ships[i].id);
      }
    }
  };

  return { renderBoard, renderShips };
})();

export default Dom;

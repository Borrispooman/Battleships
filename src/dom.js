const Dom = (() => {
  const renderBoard = (targetDiv) => {
    const boardDiv = document.createElement("div");
    boardDiv.className = "board-div";
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(i / 10);
      const y = i % 10;

      const cell = document.createElement("div");
      cell.id = `${x}${y}`;
      cell.className = "board-cell";
      boardDiv.append(cell);
    }
    document.querySelector(targetDiv).append(boardDiv);
  };

  return { renderBoard };
})();

export default Dom;

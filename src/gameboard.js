function isObject(value) {
  const type = typeof value;
  return type === "object" && value !== null; // Exclude null, which typeof also returns as 'object'
}

function arrOfXYsContains(arrOfXYs, target) {
  return arrOfXYs.some((arr) => arr[0] === target[0] && arr[1] === target[1]);
}

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.attackedCells = [];
    this.hits = [];
  }
  placeShip(ship) {
    for (let i = 0; i < ship.spanXYsArr.length; i++) {
      this.board[ship.spanXYsArr[i][0]][ship.spanXYsArr[i][1]] = ship;
    }
    // ^-- we need the board for receive attack to work, but we will always avoid searching the board, instead create references arrs to ships and misses and shipsHits;
    this.ships.push(ship);
  }
  receiveAttack(XY) {
    console.log(XY);
    const [x, y] = XY;

    const cell = this.board[x][y];

    if (arrOfXYsContains(this.attackedCells, XY)) {
      return null;
    }
    if (isObject(cell)) {
      cell.hit();
      this.attackedCells.push(XY);
      return "hit";
    } else {
      this.board[x][y] = "miss";
      this.attackedCells.push(XY);
      return "miss";
    }
  }
  checkAllShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  }
}

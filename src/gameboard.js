function isObject(value) {
  const type = typeof value;
  return type === "object" && value !== null; // Exclude null, which typeof also returns as 'object'
}

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
    this.misses = [];
  }
  placeShip(ship) {
    for (let i = 0; i < ship.spanXYsArr.length; i++) {
      this.board[ship.spanXYsArr[i][0]][ship.spanXYsArr[i][1]] = ship;
    }
    this.ships.push(ship);
  }
  receiveAttack(XY) {
    const [x, y] = XY;

    const cell = this.board[x][y];
    if (isObject(cell)) {
      cell.hit();
    } else {
      this.board[x][y] = "miss";
      this.misses.push(XY);
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

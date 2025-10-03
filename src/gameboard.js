export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }
  placeShip(ship) {
    for (let i = 0; i < ship.spanXYsArr.length; i++) {
      this.board[ship.spanXYsArr[i][0]][ship.spanXYsArr[i][1]] = "ship";
    }
  }
}

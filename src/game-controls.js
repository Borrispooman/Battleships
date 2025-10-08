import Ship from "./ship.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Game {
  constructor() {
    this.p1Turn = true;
    this.p2Turn = false;
    this.aiMode = true;
    this.selectedPlacement = null;
    this.winner = null;
  }
  setPassPlay() {
    this.aiMode = false;
  }
  swapTurns() {
    this.p1Turn = this.p1Turn === true ? false : true;
    this.p2Turn = this.p2Turn === true ? false : true;
  }
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  computerAttack(gameboard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const status = gameboard.receiveAttack([x, y]);
    if (status === null) {
      return this.computerAttack(gameboard);
    } else {
      return [status, [x, y]];
    }
  }
  createStarterShips() {
    return [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  }
}

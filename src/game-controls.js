import Ship from "./ship.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Game {
  constructor() {
    this.p1Turn = true;
    this.p2Turn = false;
    this.aiMode = true;
    this.passAndPlay = false;
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
  createDummyShips(p1gameboard, p2gameboard) {
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

    p1gameboard.placeShip(ship);
    p1gameboard.placeShip(ship2);
    p1gameboard.placeShip(ship3);
    p1gameboard.placeShip(ship4);
    const p2ship = new Ship(3);

    p2ship.setSpanXYs([
      [9, 7],
      [9, 8],
      [9, 9],
    ]);
    const p2ship2 = new Ship(3);

    p2ship2.setSpanXYs([
      [7, 1],
      [7, 2],
      [7, 3],
    ]);

    const p2ship3 = new Ship(3);

    p2ship3.setSpanXYs([
      [4, 1],
      [4, 2],
      [4, 3],
    ]);

    const p2ship4 = new Ship(3);

    p2ship4.setSpanXYs([
      [4, 5],
      [5, 5],
      [6, 5],
    ]);

    p2gameboard.placeShip(p2ship);
    p2gameboard.placeShip(p2ship2);
    p2gameboard.placeShip(p2ship3);
    p2gameboard.placeShip(p2ship4);
  }
}

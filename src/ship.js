export default class Ship {
  constructor(length) {
    this.length = length;
    this.sunk = false;
    this.hits = 0;
    this.spanXYsArr = null;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

export default class Ship {
  constructor(length) {
    this.length = length;
    this.sunk = false;
    this.hits = 0;
    this.hitXYs = [];
    this.spanXYsArr = null;
    this.id = crypto.randomUUID();
  }
  hit(XY) {
    this.hitXYs.push(XY);
    this.hits++;
  }
  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
  setSpanXYs(spanXYsArr) {
    this.spanXYsArr = spanXYsArr;
  }
}

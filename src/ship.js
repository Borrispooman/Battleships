function getRandomSpanXYs(length, gridSize = 10) {
  // Generate random coordinates within a grid
  const span = [];
  const startX = Math.floor(Math.random() * gridSize);
  const startY = Math.floor(Math.random() * gridSize);
  const horizontal = Math.random() < 0.5; // 50% chance horizontal or vertical

  for (let i = 0; i < length; i++) {
    const x = horizontal ? startX + i : startX;
    const y = horizontal ? startY : startY + i;

    // wrap around if needed
    span.push([x % gridSize, y % gridSize]);
  }

  return span;
}

export default class Ship {
  constructor(length) {
    this.length = length;
    this.sunk = false;
    this.hits = 0;
    this.spanXYsArr = null;
    this.id = crypto.randomUUID();
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
  setSpanXYs(spanXYsArr) {
    this.spanXYsArr = spanXYsArr;
  }
  createRandomFleet() {
    const lengths = [5, 4, 3, 3, 2];
    const fleet = [];

    for (const len of lengths) {
      const ship = new Ship(len);
      const spanXYs = getRandomSpanXYs(len);
      ship.setSpanXYs(spanXYs);
      fleet.push(ship);
    }

    return fleet;
  }
}

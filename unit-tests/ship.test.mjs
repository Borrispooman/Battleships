import Ship from "../src/ship.js";

test("ship constructor takes length and returns obj including length", () => {
	const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("ship constructor sets hits to 0", () => {
	const ship = new Ship(3);
	expect(ship.hits).toBe(0);
});

test("ship constructor sets sunk to false", () => {
	const ship = new Ship(10);
	expect(ship.sunk).toBeFalsy();
});

test("ship.hit(XY) function increments hits", () => {
	const ship = new Ship(3);
	ship.hit([0,1])
	expect(ship.hits).toBe(1);
});

test("ship.isSunk function return true when ship.hits === ship.length", () => {
	const ship = new Ship(1);
	ship.hit()
	expect(ship.isSunk()).toBeTruthy();
});

test("ship constructor sets spanXYsArr to null", () => {
	const ship = new Ship(3);
	expect(ship.spanXYsArr).toBeNull();
});

test("ship.setSpanXYs set spanXYsArr to given arr", () => {
	const ship = new Ship(3);
	ship.setSpanXYs([[0,0],[0,1]])
	expect(ship.spanXYsArr).toEqual([[0,0],[0,1]]);
});

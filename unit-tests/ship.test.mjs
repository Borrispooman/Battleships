import Ship from "../src/ship.js";

test("shipLength test", () => {
	const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

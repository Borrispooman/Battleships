import Game from "../src/game-controls.js";

test("swapTurns works", () => {
	const game = new Game();
	game.swapTurns();
	expect(game.p1Turn).toBeFalsy();
	expect(game.p2Turn).toBeTruthy();
});

test("create starter ships returns arr of correct length ships", () => {
	const game = new Game();
	const ships = game.createStarterShips();

	expect(ships[0].length).toBe(5)
	expect(ships[1].length).toBe(4)
	expect(ships[2].length).toBe(3)
	expect(ships[3].length).toBe(3)
	expect(ships[4].length).toBe(2)
});


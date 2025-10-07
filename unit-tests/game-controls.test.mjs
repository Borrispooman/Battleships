import Game from "../src/game-controls.js";

test("swapTurns works", () => {
	const game = new Game();
	game.swapTurns();
	expect(game.p1Turn).toBeFalsy();
	expect(game.p2Turn).toBeTruthy();
});



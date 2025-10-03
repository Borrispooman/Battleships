import Player from "../src/player.js";

test("player constructor sets gameboard", () => {

	const player = new Player([null, null, null]);
	expect(player.board).toEqual([null, null, null]);
});


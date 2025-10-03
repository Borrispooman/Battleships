import Gameboard from "../src/gameBoard";

test("Gameboard constructor creates board 2d arr", () => {
	const gameBoard = new Gameboard();
	expect(gameBoard.board[9][9]).toBeNull();
});

test("Gameboard places ship corresponding to ship.spanXYsARR", () => {
	const gameBoard = new Gameboard();
	const ship = {
		length: 3,
		sunk: false,
		hits: 0,
		spanXYsArr: [ [0,0], [0,1], [0,2] ]
	}
	gameBoard.placeShip(ship);
	expect(gameBoard.board[0][0]).toBe('ship');	
	expect(gameBoard.board[0][1]).toBe("ship");	
	expect(gameBoard.board[0][2]).toBe("ship");	
});


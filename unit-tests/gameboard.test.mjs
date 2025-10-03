import Gameboard from "../src/gameBoard";
import Ship from "../src/ship.js";

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
	expect(gameBoard.board[0][0]).toBe(ship);	
	expect(gameBoard.board[0][1]).toBe(ship);	
	expect(gameBoard.board[0][2]).toBe(ship);	
});

test("Gameboard receiveAttack handles miss", () => {
	const gameBoard = new Gameboard();	
	gameBoard.receiveAttack([0,0]);
	expect(gameBoard.board[0][0]).toBe('miss');
});

test("Gameboard receiveAttack handles hit", () => {
	const gameBoard = new Gameboard();
	const ship = {
		length: 3,
		sunk: false,
		hits: 0,
		spanXYsArr: [ [0,0], [0,1], [0,2] ]
	}

	ship.hit = function(){
		ship.hits++;
	};

	gameBoard.placeShip(ship);
	gameBoard.receiveAttack([0,0]);
	expect(gameBoard.board[0][0].hits).toBe(1);
});




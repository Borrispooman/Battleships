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

test("receiveAttack tracks attackedCells", () => {
	const gameBoard = new Gameboard();	
	gameBoard.receiveAttack([0,0]);
	expect(gameBoard.attackedCells[gameBoard.attackedCells.length - 1]).toEqual([0,0]);
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

test("checkAllShipsSunk, return false if at least one ship has not sunk", () => {
	const gameBoard = new Gameboard();
	const ship = {
		length: 3,
		sunk: false,
		hits: 0,
		spanXYsArr: [ [0,0], [0,1], [0,2] ]
	}
	ship.isSunk = function(){
		if(ship.length === ship.hits){
			return true;
		}
		return false;
	};
	gameBoard.placeShip(ship);
	expect(gameBoard.checkAllShipsSunk()).toBeFalsy();
});

test("checkAllShipsSunk, return false if at least one ship has not sunk", () => {
	const gameBoard = new Gameboard();
	const ship = {
		length: 3,
		sunk: false,
		hits: 0,
		spanXYsArr: [ [0,0], [0,1], [0,2] ]
	}
	ship.isSunk = function(){
		if(ship.length === ship.hits){
			return true;
		}
		return false;
	};
	gameBoard.placeShip(ship);
	expect(gameBoard.checkAllShipsSunk()).toBeFalsy();
})

test("checkAllShipsSunk, return false if at least one ship has not sunk", () => {
	const gameBoard = new Gameboard();
	const ship = {
		length: 3,
		sunk: false,
		hits: 0,
		spanXYsArr: [ [0,0], [0,1], [0,2] ]
	}
	ship.isSunk = function(){
		if(ship.length === ship.hits){
			return true;
		}
		return false;
	};
	gameBoard.placeShip(ship);
	expect(gameBoard.checkAllShipsSunk()).toBeFalsy();
});

test("checkAllShipsSunk, return true if all ships have sunk", () => {
	const gameBoard = new Gameboard();

  const ship1 = { isSunk: () => true, spanXYsArr: [[0,0],[0,1],[0,2]] };
  const ship2 = { isSunk: () => true, spanXYsArr: [[1,0],[1,1]] };

	gameBoard.placeShip(ship1);
	gameBoard.placeShip(ship2);
	expect(gameBoard.checkAllShipsSunk()).toBeTruthy();
});





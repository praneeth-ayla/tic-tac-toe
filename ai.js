import { gameBoard, gameController } from "./script.js";
export const randomPlace = () => {
	const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	if (
		!gameBoard.checkWinner(gameBoard.board).condition &&
		!gameController.checkTie()
	) {
		let x = array[Math.floor(Math.random() * array.length)];
		if (gameBoard.checkMark(x)) {
			return x;
		} else {
			return randomPlace();
		}
	} else {
		return false;
	}
};

const gameState = (board) => {
	const testBoard = board.slice();
	const xCount = testBoard.filter((x) => x == "X").length;
	const oCount = testBoard.filter((x) => x == "O").length;
	// console.log(xCount, "x", oCount, "o");
	if (xCount > oCount) {
		return "O";
	} else {
		return "X";
	}
	// result(3);
};

export const result = (board, place) => {
	const testBoard = board.slice();
	gameBoard.placeMark(testBoard, gameState(), place);
	// console.log(testBoard);
	// console.log(gameBoard.board);
	return testBoard;
};

const actionsAvailable = (board) => {
	const testBoard = board.slice();
	const available = [];
	for (let i = 0; i < 9; i++) {
		if (testBoard[i] === "") {
			available.push(i);
		}
	}
	// console.log(available);
	return available;
};
export const terminal = (board) => {
	if (
		!gameBoard.checkWinner(board).condition &&
		!gameController.checkTie(board)
	) {
		// gameState();
		// console.log("gamestate", gameState());
		return { condition: false, value: 0 };
	} else {
		const winMark = gameBoard.checkWinner(board).mark;
		let value = 0;
		if (winMark === "X") {
			value = 1;
		} else {
			value = -1;
		}
		return { condition: true, value: value };
	}
};

export const miniMax = (board) => {
	if (terminal(board).condition) {
		return terminal(board).value;
	}

	if (gameState(board) === "X") {
		let value = -Infinity;
		const actions = actionsAvailable(board);
		actions.forEach((action) => {
			value = Math.max(value, miniMax(result(board, action)));
		});
		return value;
	}

	if (gameState(board) === "O") {
		let value = Infinity;
		const actions = actionsAvailable(board);
		actions.forEach((action) => {
			value = Math.min(value, miniMax(result(board, action)));
		});
		return value;
	}
};

// const newT = gameState();
// newT;

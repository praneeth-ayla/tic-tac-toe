import { gameBoard, gameController } from "./script.js";
export const randomPlace = () => {
	const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	if (
		!gameBoard.checkWinner(gameBoard.board).condition &&
		!gameController.checkTie(gameBoard.board)
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

const actionsAvailable = (board) => {
	const testBoard = board.slice();
	const available = [];
	for (let i = 0; i < 9; i++) {
		if (testBoard[i] === "") {
			available.push(i);
		}
	}
	return available;
};

const placeComma = (place) => {
	gameBoard.board[place] = "";
};

export const compMove = () => {
	let bestScore = -800;
	let bestMove = 0;
	const actions = actionsAvailable(gameBoard.board);
	actions.forEach((action) => {
		if (gameBoard.board[action] === "") {
			gameBoard.board[action] = "O";
			let score = miniMax(gameBoard.board, false);
			placeComma(action);
			if (score > bestScore) {
				bestScore = score;
				bestMove = action;
			}
		}
	});
	gameBoard.placeMark(gameBoard.board, "O", bestMove);
	return;
};

const miniMax = (board, isMaximizing) => {
	if (
		gameBoard.checkWinner(board).condition &&
		gameBoard.checkWinner(board).mark === "O"
	) {
		return 1;
	} else if (
		gameBoard.checkWinner(board).condition &&
		gameBoard.checkWinner(board).mark === "X"
	) {
		return -1;
	} else if (gameController.checkTie(board)) {
		return 0;
	}

	if (isMaximizing) {
		let bestScore = -800;
		const actions = actionsAvailable(board);
		actions.forEach((action) => {
			if (gameBoard.board[action] === "") {
				gameBoard.board[action] = "O";
				let score = miniMax(gameBoard.board, false);
				placeComma(action);
				if (score > bestScore) {
					bestScore = score;
				}
			}
		});
		return bestScore;
	} else {
		let bestScore = 800;
		const actions = actionsAvailable(board);
		actions.forEach((action) => {
			if (gameBoard.board[action] === "") {
				gameBoard.board[action] = "X";
				let score = miniMax(board, true);

				placeComma(action);
				if (score < bestScore) {
					bestScore = score;
				}
			}
		});
		return bestScore;
	}
};

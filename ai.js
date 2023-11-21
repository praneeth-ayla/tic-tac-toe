import { gameBoard, gameController } from "./script.js";
export const randomPlace = () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 0];
	if (!gameBoard.checkWinner().condition && !gameController.checkTie()) {
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

export const terminal = () => {
	if (!gameBoard.checkWinner().condition && !gameController.checkTie()) {
		return false;
	} else {
		return true;
	}
};

export const miniMax = () => {
	let value;
	terminal();
	if (gameBoard.checkWinner().condition) {
		console.log("hi", gameController.currentPlayer.mark);
		if (gameController.currentWinner === "O") {
			console.log("hi");
		} else {
			console.log("now", gameController.currentWinner);
		}
	}
};

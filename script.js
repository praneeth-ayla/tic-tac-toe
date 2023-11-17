//  game board module
const gameBoard = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	// check mark empty
	const checkMark = (place) => board[place] === "";

	// place mark
	const placeMark = (mark, place) => {
		if (checkMark(place) === true) {
			board[place] = mark;
		} else {
			console.log("try different place");
		}
	};

	// check win
	const checkWinner = () => {
		if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) {
			return true;
		} else if (
			board[3] !== "" &&
			board[3] === board[4] &&
			board[4] === board[5]
		) {
			return true;
		} else if (
			board[6] !== "" &&
			board[6] === board[7] &&
			board[7] === board[8]
		) {
			return true;
		} else if (
			board[0] !== "" &&
			board[0] === board[3] &&
			board[3] === board[6]
		) {
			return true;
		} else if (
			board[1] !== "" &&
			board[1] === board[4] &&
			board[4] === board[7]
		) {
			return true;
		} else if (
			board[2] !== "" &&
			board[2] === board[5] &&
			board[5] === board[8]
		) {
			return true;
		} else if (
			board[0] !== "" &&
			board[0] === board[4] &&
			board[4] === board[8]
		) {
			return true;
		} else if (
			board[2] !== "" &&
			board[2] === board[4] &&
			board[4] === board[6]
		) {
			return true;
		} else {
			return false;
		}
	};
	return {
		board,
		checkMark,
		placeMark,
		checkWinner,
	};
})();

// player module
const playerModule = (() => {
	const createPlayer = (mark) => {
		return { mark };
	};

	return { createPlayer };
})();

// game logic

const gameController = (() => {
	const player1 = playerModule.createPlayer("X");
	const player2 = playerModule.createPlayer("O");
	let currentPlayer = player1;

	// switched player
	const switchPlayer = () => {
		if (currentPlayer === player1) {
			currentPlayer = player2;
			console.log(`player2's turn ${player2.mark}`);
		} else {
			currentPlayer = player1;
			console.log(`player1's turn ${player1.mark}`);
		}
	};

	// play turn
	const playTurn = (place) => {
		if (gameBoard.checkMark(place)) {
			gameBoard.placeMark(currentPlayer.mark, place);
			gameController.checkStatus();
			switchPlayer();
			printBoard();
		} else {
			console.log("try place");
		}
	};

	// console only test
	const printBoard = () => {
		console.log("Game Board:");
		for (let i = 0; i < 3; i++) {
			let row = "";
			for (let j = 0; j < 3; j++) {
				const index = i * 3 + j;
				row += ` ${gameBoard.board[index] || "-"} `;
				if (j < 2) {
					row += "|";
				}
			}
			console.log(row);
			if (i < 2) {
				console.log("-----------");
			}
		}
		console.log("\n");
	};

	// check game status
	const checkStatus = () => {
		if (gameBoard.checkWinner()) {
			console.log("won");
		}
	};

	return { playTurn, checkStatus, currentPlayer, printBoard };
})();

// gameController.playTurn(0);
// gameController.playTurn(4);
// gameController.playTurn(4);
// gameController.playTurn(8);

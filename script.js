//  game board module
const gameBoard = (() => {
	const board = ["", "", "", "", "", "", "", "", ""];

	// check mark empty
	const checkMark = (place) => board[place] === "";

	// place mark
	const placeMark = (mark, place) => {
		if (checkMark(place) === true) {
			board[place] = mark;
		}
	};

	// check win
	const checkWinner = () => {
		if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) {
			return { condition: true, mark: board[0] };
		} else if (
			board[3] !== "" &&
			board[3] === board[4] &&
			board[4] === board[5]
		) {
			return { condition: true, mark: board[3] };
		} else if (
			board[6] !== "" &&
			board[6] === board[7] &&
			board[7] === board[8]
		) {
			return { condition: true, mark: board[6] };
		} else if (
			board[0] !== "" &&
			board[0] === board[3] &&
			board[3] === board[6]
		) {
			return { condition: true, mark: board[0] };
		} else if (
			board[1] !== "" &&
			board[1] === board[4] &&
			board[4] === board[7]
		) {
			return { condition: true, mark: board[1] };
		} else if (
			board[2] !== "" &&
			board[2] === board[5] &&
			board[5] === board[8]
		) {
			return { condition: true, mark: board[2] };
		} else if (
			board[0] !== "" &&
			board[0] === board[4] &&
			board[4] === board[8]
		) {
			return { condition: true, mark: board[0] };
		} else if (
			board[2] !== "" &&
			board[2] === board[4] &&
			board[4] === board[6]
		) {
			return { condition: true, mark: board[2] };
		} else {
			return { condition: false };
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
		gameController.checkStatus();

		if (currentPlayer === player1) {
			currentPlayer = player2;
			playerDiv.textContent = `${currentPlayer.mark} chance`;

			console.log(`player2's turn ${player2.mark}`);
			return currentPlayer;
		} else {
			currentPlayer = player1;
			playerDiv.textContent = `${currentPlayer.mark} chance`;

			console.log(`player1's turn ${player1.mark}`);
		}
	};

	// play turn
	const playTurn = (place) => {
		if (gameBoard.checkMark(place)) {
			errorDiv.textContent = "";

			gameBoard.placeMark(currentPlayer.mark, place);
			gameController.checkStatus();
			switchPlayer();
			printBoard();
		} else {
			errorDiv.textContent =
				"Cell already occupied. Try a different place.";
			console.log("Cell already occupied. Try a different place.");
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
		const winner = gameBoard.checkWinner();
		if (winner.condition) {
			console.log("Player", winner.mark, "won!");
		}
	};
	return { playTurn, checkStatus, currentPlayer, printBoard };
})();

const optionsBtn = document.querySelectorAll(".cell");
optionsBtn.forEach((button) =>
	button.addEventListener("click", () => {
		place = button.id;
		gameController.playTurn(place);
		button.textContent = gameBoard.board[place];
	})
);

const playerDiv = document.querySelector(".player");
const errorDiv = document.querySelector("#errorCell");

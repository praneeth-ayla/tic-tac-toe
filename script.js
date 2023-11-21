import { randomPlace, miniMax, terminal } from "./ai.js";

//  game board module
const gameBoard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];

	// resets board
	const newBoard = () => {
		board.fill("");
	};

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
		newBoard,
	};
})();

// player module
const playerModule = (() => {
	const createPlayer = (mark) => {
		let scorePlayer = 0;
		// const increaseScore = () => {
		// 	scorePlayer += 1;
		// };
		const increaseScore = () => {
			console.log(`Before increase: ${scorePlayer}`);
			scorePlayer += 1;
			console.log(`After increase: ${scorePlayer}`);
		};

		const getScore = () => scorePlayer;
		return { mark, getScore, increaseScore };
	};
	return { createPlayer };
})();

// game logic
const gameController = (() => {
	const player1 = playerModule.createPlayer("X");
	const player2 = playerModule.createPlayer("O");
	let currentPlayer = player1;

	// check tie
	const checkTie = () => {
		if (
			!gameBoard.board.includes("") &&
			gameBoard.checkWinner().condition === false
		) {
			console.log("its a tie");
			return true;
		} else {
			return false;
		}
	};

	// switched player
	const playerDiv = document.getElementById("player");
	const switchPlayer = () => {
		if (!gameBoard.checkWinner().condition && !gameController.checkTie()) {
			if (currentPlayer === player1) {
				currentPlayer = player2;
				playerDiv.textContent = `${currentPlayer.mark} chance`;

				console.log(`player2's turn ${player2.mark}`);
				return player2.mark;
			} else {
				currentPlayer = player1;
				playerDiv.textContent = `${currentPlayer.mark} chance`;

				console.log(`player1's turn ${player1.mark}`);
				return player1.mark;
			}
		} else {
			playerDiv.textContent = `game over`;
		}
	};

	// play turn
	const markAgainDiv = document.getElementById("markAgain");

	const playTurn = (place) => {
		if (gameBoard.checkMark(place)) {
			gameBoard.placeMark(currentPlayer.mark, place);
			markAgainDiv.textContent = "";

			gameController.checkStatus();
			updateDis();
			switchPlayer();
			return true;
		} else {
			markAgainDiv.textContent =
				"Cell already occupied. Try a different place.";
			console.log("try place");
			return false;
		}
	};

	// ai turn
	const playAITurn = () => {
		const aiMove = randomPlace();
		if (aiMove !== false) {
			playTurn(aiMove);
		}
	};

	// check game status
	const winnerText = document.getElementById("winner");
	const checkStatus = () => {
		if (gameBoard.checkWinner().condition) {
			console.log(currentPlayer.mark, "won!");
			winnerText.textContent = `${currentPlayer.mark} Won!`;
			currentPlayer.increaseScore();
			scoreChecker();
			modal.showModal();
		} else if (checkTie() === true) {
			winnerText.textContent = "It's a tie!";
			modal.showModal();
		}
	};

	// score checker
	const scoreChecker = () => {
		if (player1.getScore() > player2.getScore() && player1.getScore() > 2) {
			winnerText.textContent = `${
				player1.mark
			} has ${player1.getScore()} points`;
		} else if (
			player2.getScore() > player1.getScore() &&
			player2.getScore() > 2
		) {
			winnerText.textContent = `${
				player2.mark
			} has ${player2.getScore()} points`;
		}
	};

	// update board
	const boardCells = document.querySelectorAll(".cell");
	boardCells.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			if (gameController.playTurn(index)) {
				gameController.playAITurn();
				// miniMax();
				terminal();
			}
		});
	});

	// display board
	const updateDis = () => {
		for (let i = 0; i < 9; i++) {
			boardCells[i].textContent = gameBoard.board[i];
		}
	};

	// reset board
	const modal = document.getElementById("modal");
	const resetButton = document.getElementById("replay");
	resetButton.addEventListener("click", () => {
		gameBoard.newBoard();
		modal.close();
		updateDis();
		currentPlayer = player1; // Reset the current player to player1
		playerDiv.textContent = `${currentPlayer.mark} chance`;
	});

	return {
		player1,
		player2,
		playTurn,
		checkStatus,
		currentPlayer,
		updateDis,
		checkTie,
		playAITurn,
	};
})();

// gameBoard.newBoard();
gameBoard.newBoard();

export { gameBoard, gameController };

window.gameController = gameController;
window.gameBoard = gameBoard;

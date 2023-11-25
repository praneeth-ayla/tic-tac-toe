import { randomPlace, compMove } from "./ai.js";

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
	const placeMark = (board, mark, place) => {
		if (checkMark(place) === true) {
			board[place] = mark;
		}
	};

	// check win
	let winner = "";
	const checkWinner = (board) => {
		if (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) {
			winner = board[0];
			return { condition: true, mark: board[0] };
		} else if (
			board[3] !== "" &&
			board[3] === board[4] &&
			board[4] === board[5]
		) {
			winner = board[3];
			return { condition: true, mark: board[3] };
		} else if (
			board[6] !== "" &&
			board[6] === board[7] &&
			board[7] === board[8]
		) {
			winner = board[6];
			return { condition: true, mark: board[6] };
		} else if (
			board[0] !== "" &&
			board[0] === board[3] &&
			board[3] === board[6]
		) {
			winner = board[0];
			return { condition: true, mark: board[0] };
		} else if (
			board[1] !== "" &&
			board[1] === board[4] &&
			board[4] === board[7]
		) {
			winner = board[1];
			return { condition: true, mark: board[1] };
		} else if (
			board[2] !== "" &&
			board[2] === board[5] &&
			board[5] === board[8]
		) {
			winner = board[2];
			return { condition: true, mark: board[2] };
		} else if (
			board[0] !== "" &&
			board[0] === board[4] &&
			board[4] === board[8]
		) {
			winner = board[0];
			return { condition: true, mark: board[0] };
		} else if (
			board[2] !== "" &&
			board[2] === board[4] &&
			board[4] === board[6]
		) {
			winner = board[2];
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
		const increaseScore = () => {
			// console.log(`Before increase: ${scorePlayer}`);
			scorePlayer += 1;
			// console.log(`After increase: ${scorePlayer}`);
		};

		const getScore = () => scorePlayer;

		const makeZero = () => (scorePlayer = 0);

		return { mark, getScore, increaseScore, makeZero };
	};
	return { createPlayer };
})();

// game logic
const gameController = (() => {
	const player1 = playerModule.createPlayer("X");
	const player2 = playerModule.createPlayer("O");
	let currentPlayer = player1;

	// check tie
	const checkTie = (board) => {
		if (
			!board.includes("") &&
			gameBoard.checkWinner(board).condition === false
		) {
			return true;
		} else {
			return false;
		}
	};

	// switch player
	const switchPlayer = () => {
		if (
			!gameBoard.checkWinner(gameBoard.board).condition &&
			!gameController.checkTie(gameBoard.board)
		) {
			if (currentPlayer === player1) {
				currentPlayer = player2;
				// console.log(currentPlayer.mark);
				return player2.mark;
			} else {
				currentPlayer = player1;
				// console.log(currentPlayer.mark);

				return player1.mark;
			}
		}
	};

	// play turn
	const markAgainDiv = document.getElementById("markAgain");
	const playTurnMiniMax = (place) => {
		if (gameBoard.checkMark(place)) {
			gameBoard.placeMark(gameBoard.board, "X", place);
			markAgainDiv.textContent = "";
			switchPlayer();

			compMove();

			gameController.checkStatus();
			updateDis();
			switchPlayer();
			return true;
		} else {
			markAgainDiv.textContent =
				"Cell already occupied. Try a different place.";
			// console.log("try place");
			return false;
		}
	};

	const playTurn = (place) => {
		if (gameBoard.checkMark(place)) {
			gameBoard.placeMark(gameBoard.board, currentPlayer.mark, place);
			markAgainDiv.textContent = "";

			gameController.checkStatus();
			updateDis();
			switchPlayer();

			return true;
		} else {
			markAgainDiv.textContent =
				"Cell already occupied. Try a different place.";
			// console.log("try place");
			return false;
		}
	};

	// ai turn
	const playRandom = () => {
		const aiMove = randomPlace();
		if (aiMove !== false) {
			playTurn(aiMove);
		}
	};

	// check game status
	const winnerText = document.getElementById("winnerDiv");
	const winnerTextMain = document.getElementById("winnerDivM");
	const checkStatus = () => {
		if (gameBoard.checkWinner(gameBoard.board).condition) {
			// console.log(currentPlayer.mark, "won!");
			winnerText.textContent = `${currentPlayer.mark} Won!`;
			currentPlayer.increaseScore();
			if (!scoreChecker()) {
				replayModal.showModal();
			}
			currentScore.textContent = `Your Score: ${gameController.player1.getScore()} | Bot Score: ${gameController.player2.getScore()}`;
		} else if (checkTie(gameBoard.board) === true) {
			winnerText.textContent = "its a tie";
			replayModal.showModal();
		}
	};

	// score checker
	const scoreChecker = () => {
		if (player1.getScore() > player2.getScore() && player1.getScore() > 2) {
			winnerTextMain.textContent = `You WON!`;
			scoreDivMain.textContent = `Your Score: ${player1.getScore()} | Bot Score: ${player2.getScore()}`;
			currentScore.textContent = `Your Score: 0 | Bot Score: 0`;
			resetModal.showModal();
			return true;
		} else if (
			player2.getScore() > player1.getScore() &&
			player2.getScore() > 2
		) {
			winnerTextMain.textContent = `Haha, You LOST!`;
			scoreDivMain.textContent = `Your Score: ${player1.getScore()} | Bot Score: ${player2.getScore()}`;
			resetButton.textContent = "Choose Mode";
			currentScore.textContent = `Your Score: 0 | Bot Score: 0`;
			resetModal.showModal();
			return true;
		} else {
			return false;
		}
	};

	// update board
	const boardCells = document.querySelectorAll(".cell");
	boardCells.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			// if (gameController.playTurn(index)) {
			// }
			if (selectedLevel === "Easy") {
				if (gameController.playTurn(index)) {
					gameController.playRandom();
				}
			} else if (selectedLevel === "Medium") {
				let mediumLevel = [1, 2, 3];
				let x = mediumLevel[Math.floor(Math.random() * 3)];
				if (x === 1) {
					if (gameController.playTurn(index)) {
						gameController.playRandom();
					}
				} else {
					if (gameController.playTurnMiniMax(index)) {
					}
				}
			} else {
				if (gameController.playTurnMiniMax(index)) {
				}
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
	const replayModal = document.getElementById("replayModal");
	const resetModal = document.getElementById("resetModal");
	const resetButton = document.getElementById("chooseMode");
	const replayButton = document.getElementById("replay");

	replayButton.addEventListener("click", () => {
		gameBoard.newBoard();
		replayModal.close();
		gameController.updateDis();
		currentPlayer = player1;
	});
	resetButton.addEventListener("click", () => {
		resetModal.showModal();
		levelModal.showModal();
		currentPlayer = player1;
		gameController.player1.makeZero();
		gameController.player2.makeZero();
	});
	return {
		player1,
		player2,
		playTurnMiniMax,
		checkStatus,
		currentPlayer,
		updateDis,
		checkTie,
		playRandom,
		playTurn,
	};
})();

// gameBoard.newBoard();
gameBoard.newBoard();

// select level
const getSelectedRadioValue = (formId) => {
	const form = document.getElementById(formId);
	const selectedRadio = form.querySelector('input[name="level"]:checked');
	return selectedRadio ? selectedRadio.value : null;
};
const currentScore = document.getElementById("currentScore");
const scoreDiv = document.getElementById("scoreDiv");
const scoreDivMain = document.getElementById("scoreDivM");
const levelModal = document.getElementById("levelModal");

let selectedLevel;
const levelForm = document.getElementById("levelForm");
const selectLevelDiv = document.getElementById("levelDiv");
levelForm.addEventListener("submit", function (event) {
	scoreDiv.textContent = "";
	event.preventDefault();
	gameBoard.newBoard();
	gameController.updateDis();
	levelModal.close();
	selectedLevel = getSelectedRadioValue("levelForm");
	// console.log("Selected Level:", selectedLevel);
	selectLevelDiv.textContent = `Mode: ${selectedLevel}`;
	gameController.player1.makeZero();
	gameController.player2.makeZero();
	currentScore.textContent = `Your Score: 0 | Bot Score: 0`;

	resetModal.close();
});
const selectLevelOptn = document.getElementById("selectLevelOptn");
selectLevelOptn.addEventListener("click", () => {
	levelModal.showModal();
});
levelModal.showModal();

export { gameBoard, gameController };
window.gameController = gameController;
window.gameBoard = gameBoard;

function gameBoard() {
	const board = ["", "", "", "", "", "", "", "", ""];

	const checkMark = (place) => {
		if (board[place] != "") {
			return true;
		} else {
			return false;
		}
	};

	const placeMark = (mark, place) => {
		if (checkMark(place) == true) {
			console.log("try different place");
		} else {
			board[place] = mark;
		}
	};

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
}

const n = gameBoard();

n.placeMark("o", 0);
n.placeMark("o", 4);
n.placeMark("o", 8);

console.log(n.checkWinner());

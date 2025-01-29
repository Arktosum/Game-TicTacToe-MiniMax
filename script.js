const cellElements = document.getElementById("container").children;

let BOARD = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

function checkGameState(board) {
  const CHECK_MASKS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let mask of CHECK_MASKS) {
    if (
      board[mask[0]] == board[mask[1]] &&
      board[mask[1]] == board[mask[2]] &&
      board[mask[2]] != "-"
    ) {
      const winner = board[mask[0]];
      return winner;
    }
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i] == "-") return undefined;
  }
  return "TIE";
}

function MINIMAX(
  board,
  isMaximizingPlayer,
  maximizingPlayerSymbol,
  minimizingPlayerSymbol
) {
  const getState = checkGameState(board);

  if (getState == maximizingPlayerSymbol) {
    return [1, undefined];
  }
  if (getState == minimizingPlayerSymbol) {
    return [-1, undefined];
  }
  if (getState == "TIE") {
    return [0, undefined];
  }
  if (isMaximizingPlayer) {
    let MAX_SCORE = -Infinity;
    let MAX_MOVE = undefined;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "-") {
        // Possible placing point.
        board[i] = maximizingPlayerSymbol;
        let [score, move] = MINIMAX(
          board,
          false,
          maximizingPlayerSymbol,
          minimizingPlayerSymbol
        );
        board[i] = "-";
        if (score > MAX_SCORE) {
          MAX_SCORE = score;
          MAX_MOVE = i;
        }
      }
    }
    return [MAX_SCORE, MAX_MOVE];
  } else {
    let MIN_SCORE = Infinity;
    let MIN_MOVE = undefined;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "-") {
        // Possible placing point.
        board[i] = minimizingPlayerSymbol;
        let [score, move] = MINIMAX(
          board,
          true,
          maximizingPlayerSymbol,
          minimizingPlayerSymbol
        );
        board[i] = "-";
        if (score < MIN_SCORE) {
          MIN_SCORE = score;
          MIN_MOVE = i;
        }
      }
    }
    return [MIN_SCORE, MIN_MOVE];
  }
}

let isGameOver = false;
for (let i = 0; i < BOARD.length; i++) {
  cellElements[i].addEventListener("click", () => {
    if (BOARD[i] != "-" || isGameOver) return;
    BOARD[i] = "X";
    cellElements[i].textContent = "X";
    // Check Game State
    let gameState = checkGameState(BOARD);
    if (gameState != undefined) {
      // An Ending happened!
      setTimeout(() => {
        alert(`Winner! : ${gameState}`);
      }, 10);
      isGameOver = true;
    }

    // Get AI's Move
    let [score, move] = MINIMAX(BOARD, true, "O", "X");
    console.log(score, move);

    BOARD[move] = "O"; // AI players move.
    cellElements[move].textContent = "O";
    gameState = checkGameState(BOARD);
    if (gameState != undefined) {
      // An Ending happened!
      setTimeout(() => {
        alert(`Winner! : ${gameState}`);
      }, 10);
      isGameOver = true;
    }
  });
}

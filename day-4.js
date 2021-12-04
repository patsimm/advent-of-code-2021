import getStdin from "get-stdin";

const rawInput = await getStdin();

const [rawDrawnNumbers, ...rawBoards] = rawInput
  .split("\n\n")
  .map((s) => s.trim())
  .filter(Boolean);

const drawnNumbers = rawDrawnNumbers.split(",");

const boards = rawBoards.map((rawBoard) =>
  rawBoard.split("\n").map((rawRow) => rawRow.trim().split(/ +/))
);

/**
 * @param {string[][]} board
 */
function boardFinishedAfter(board) {
  for (let n = 4; n < drawnNumbers.length; n++) {
    const numbersUntilN = drawnNumbers.slice(0, n + 1);
    for (let i = 0; i < 5; i++) {
      let rowAmount = 0;
      let colAmount = 0;
      for (let j = 0; j < 5; j++) {
        if (numbersUntilN.includes(board[i][j])) rowAmount++;
        if (numbersUntilN.includes(board[j][i])) colAmount++;
      }
      if (colAmount >= 5 || rowAmount >= 5) {
        return n;
      }
    }
  }
  return drawnNumbers.length;
}

/**
 * @param {string[][]} board
 * @param {number} untilRound
 */
function sumOfUnmarked(board, untilRound) {
  const numbersUntilRound = drawnNumbers.slice(0, untilRound + 1);
  const unmarked = board
    .flat()
    .filter((num) => !numbersUntilRound.includes(num));
  return unmarked
    .map((num) => Number.parseInt(num))
    .reduce((prev, curr) => prev + curr, 0);
}

const stats = boards.map((board, index) => ({
  board,
  boardNumber: index + 1,
  finishedAfter: boardFinishedAfter(board),
}));

const winningStats = stats.sort(
  (b1, b2) => b1.finishedAfter - b2.finishedAfter
)[0];

console.log(winningStats);

const sumOfUnmarkedWinning = sumOfUnmarked(
  winningStats.board,
  winningStats.finishedAfter
);

const winningNumber = drawnNumbers[winningStats.finishedAfter];

console.log(sumOfUnmarkedWinning);
console.log(winningNumber);

console.log(sumOfUnmarkedWinning * winningNumber);

const losingStats = stats.sort(
  (b1, b2) => b2.finishedAfter - b1.finishedAfter
)[0];

const sumOfUnmarkedLosing = sumOfUnmarked(
  losingStats.board,
  losingStats.finishedAfter
);

const losingNumber = drawnNumbers[losingStats.finishedAfter];

console.log(losingStats);

console.log(sumOfUnmarkedLosing);
console.log(losingNumber);

console.log(sumOfUnmarkedLosing * losingNumber);

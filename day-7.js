import getStdin from "get-stdin";

const rawInput = await getStdin();

const positions = rawInput
  .trim()
  .split(",")
  .map((pos) => Number.parseInt(pos));

const maxPos = Math.max(...positions);

function costToPosition(target) {
  return positions
    .map((pos) => Math.abs(target - pos))
    .reduce((prev, curr) => prev + curr, 0);
}

const costToPositions = [...new Array(maxPos + 1)].map((_, i) =>
  costToPosition(i)
);

console.log(Math.min(...costToPositions));

function costToPosition2(target) {
  return positions
    .map((pos) =>
      [...new Array(Math.abs(target - pos))].reduce(
        (prev, _, i) => prev + i + 1,
        0
      )
    )
    .reduce((prev, curr) => prev + curr, 0);
}

const costToPositions2 = [...new Array(maxPos + 1)].map((_, i) =>
  costToPosition2(i)
);

console.log(Math.min(...costToPositions2));

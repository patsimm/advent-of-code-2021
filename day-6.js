import getStdin from "get-stdin";

const rawInput = await getStdin();

const fishTimers = rawInput.trim().split(",");

let state = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

function live(state) {
  return {
    0: state[1],
    1: state[2],
    2: state[3],
    3: state[4],
    4: state[5],
    5: state[6],
    6: state[7] + state[0],
    7: state[8],
    8: state[0],
  };
}

function printState(state) {
  console.log(Object.values(state).reduce((prev, curr) => prev + curr, 0));
}

fishTimers.forEach((timer) => state[timer]++);

for (let i = 0; i < 256; i++) {
  console.log(i);
  state = live(state);
  printState(state);
}

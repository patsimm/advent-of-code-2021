import getStdin from "get-stdin";

const rawInput = await getStdin();

const lines = rawInput
  .trim()
  .split("\n")
  .map((line) => parseLine(line.trim()));

/**
 *
 * @param {string} line
 * @returns
 */
function parseLine(line) {
  const [input, output] = line
    .trim()
    .split("|")
    .map((vals) => vals.trim().split(" "));
  return { input, output };
}

console.log(lines);

const lengths = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

/**
 *
 * @param {string} value
 */
function isOne(value) {
  return value.length === 2;
}

/**
 *
 * @param {string} value
 */
function isFour(value) {
  return value.length === 4;
}

/**
 *
 * @param {string} value
 */
function isSeven(value) {
  return value.length === 3;
}

/**
 *
 * @param {string} value
 */
function isEight(value) {
  return value.length === 7;
}

/**
 *
 * @param {string[]} values
 * @returns
 */
function uniqueNumbersAmount(values) {
  return values.filter(
    (val) => isOne(val) || isFour(val) || isSeven(val) || isEight(val)
  ).length;
}

console.log(
  lines
    .map((line) => uniqueNumbersAmount(line.output))
    .reduce((prev, curr) => prev + curr, 0)
);

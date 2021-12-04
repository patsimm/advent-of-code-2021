import getStdin from "get-stdin";

const rawInput = await getStdin();

const parsedInput = rawInput
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * @param {string[]} input
 * @returns
 */
function getAmountOnes(input) {
  const { amountOnes } = input.reduce(
    (summary, curr) => {
      curr.split("").forEach((bit, i) => {
        if (bit === "1") {
          summary.amountOnes[i]++;
        }
      });
      return summary;
    },
    {
      amountOnes: input[0].split("").map(() => 0),
    }
  );
  return amountOnes;
}

const gammaBinary = getAmountOnes(parsedInput)
  .map((ones) => (ones > parsedInput.length / 2 ? "1" : "0"))
  .join("");

const epsilonBinary = getAmountOnes(parsedInput)
  .map((ones) => (ones < parsedInput.length / 2 ? "1" : "0"))
  .join("");

const gamma = parseInt(gammaBinary, 2);
const epsilon = parseInt(epsilonBinary, 2);

console.log(`gamma: ${gammaBinary} -> ${gamma}`);

console.log(`epsilon: ${epsilonBinary} -> ${epsilon}`);

console.log(epsilon * gamma);

/**
 * @param {string[]} numbers
 * @param {(bit: "1" | "0", index: number, leftover: string[]) => boolean} criteria
 */
function filterNumber(numbers, criteria) {
  let filtered = numbers;
  let index = 0;
  while (filtered.length > 1) {
    filtered = filtered.filter((number) =>
      criteria(number[index], index, filtered)
    );
    index++;
  }
  return filtered[0];
}

const oxygenBin = filterNumber(parsedInput, (bit, index, leftover) => {
  const amountOnes = getAmountOnes(leftover);
  const mostCommon = amountOnes[index] >= leftover.length / 2 ? "1" : "0";
  return bit === mostCommon;
});

const co2Bin = filterNumber(parsedInput, (bit, index, leftover) => {
  const amountOnes = getAmountOnes(leftover);
  const leastCommon = amountOnes[index] < leftover.length / 2 ? "1" : "0";
  return bit === leastCommon;
});

const oxygen = parseInt(oxygenBin, 2);
const co2 = parseInt(co2Bin, 2);

console.log(`oxygen: ${oxygenBin} -> ${oxygen}`);
console.log(`co2: ${co2Bin} -> ${co2}`);

console.log(oxygen * co2);

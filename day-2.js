import getStdin from "get-stdin";

const input = await getStdin();

const arr = input
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((s) => {
    const input = s.split(" ");
    return {
      direction: input[0],
      amount: Number.parseInt(input[1]),
    };
  });

let position = { depth: 0, horiz: 0, aim: 0 };

function updatePosition(position, input) {
  switch (input.direction) {
    case "forward":
      return {
        ...position,
        horiz: position.horiz + input.amount,
        depth: position.depth + input.amount * position.aim,
      };
    case "down":
      return {
        ...position,
        aim: position.aim + input.amount,
      };
    case "up":
      return {
        ...position,
        aim: position.aim - input.amount,
      };
    default:
      throw new Error(`Unknown direction: ${input.direction}`);
  }
}

arr.forEach((input) => {
  position = updatePosition(position, input);
});

console.log(position);

console.log(position.depth * position.horiz);

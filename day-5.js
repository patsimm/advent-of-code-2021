import getStdin from "get-stdin";

const rawInput = await getStdin();

const lineSegments = rawInput
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((rawLine) => {
    const [x1, y1, x2, y2] = rawLine
      .split("->")
      .map((part) => part.trim().split(","))
      .flat()
      .map((num) => Number.parseInt(num));

    return { x1, x2, y1, y2 };
  });

/**
 * @param {{ x1: number, y1: number, x2: number, y2: number }} line
 */
function isHoriz(line) {
  return line.y1 === line.y2;
}

/**
 * @param {{ x1: number, y1: number, x2: number, y2: number }} line
 */
function isVert(line) {
  return line.x1 === line.x2;
}

/**
 *
 * @param {{ x1: number, y1: number, x2: number, y2: number }} line
 */
function pointsOnLine(line) {
  const pointsX = [...new Array(Math.abs(line.x1 - line.x2) + 1)].map((_, i) =>
    line.x1 < line.x2 ? line.x1 + i : line.x1 - i
  );
  const pointsY = [...new Array(Math.abs(line.y1 - line.y2) + 1)].map((_, i) =>
    line.y1 < line.y2 ? line.y1 + i : line.y1 - i
  );
  if (isHoriz(line) || isVert(line)) {
    return pointsX.flatMap((x) => pointsY.map((y) => [x, y]));
  } else {
    return pointsX.map((x, i) => [x, pointsY[i]]);
  }
}

/**
 *
 * @param {{ x1: number; x2: number; y1: number; y2: number; }[]} segments
 * @returns
 */
function stats(segments) {
  const allPoints = segments.flatMap(pointsOnLine);

  return allPoints.reduce((stats, point) => {
    if (stats[point]) {
      stats[point]++;
    } else {
      stats[point] = 1;
    }
    return stats;
  }, {});
}

const horizAndVertLineSegments = lineSegments.filter(
  (seg) => isHoriz(seg) || isVert(seg)
);

const horizAndVertStats = stats(horizAndVertLineSegments);

const amountMoreThanOneHorizAndVert = Object.values(horizAndVertStats).filter(
  (n) => n >= 2
).length;

console.log(amountMoreThanOneHorizAndVert);

const allStats = stats(lineSegments);

const amountMoreThanOne = Object.values(allStats).filter((n) => n >= 2).length;

console.log(amountMoreThanOne);

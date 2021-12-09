import getStdin from "get-stdin";
import _ from "lodash";

const rawInput = await getStdin();

const lines = rawInput
  .trim()
  .split("\n")
  .map((line) => parseLine(line.trim()));

function parseLine(line: string) {
  const [input, output] = line
    .trim()
    .split("|")
    .map((vals) =>
      vals
        .trim()
        .split(" ")
        .map((val) => val.split("") as Key[])
    );
  return { input, output };
}

function isOne(value: Key[]) {
  return value.length === 2;
}

function isFour(value: Key[]) {
  return value.length === 4;
}

function isSeven(value: Key[]) {
  return value.length === 3;
}

function isEight(value: Key[]) {
  return value.length === 7;
}

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

const keys = ["a", "b", "c", "d", "e", "f", "g"] as const;
const segmentTypes = ["A", "B", "C", "D", "E", "F", "G"] as const;

type Key = typeof keys[number];
type SegmentType = typeof segmentTypes[number];

type Mapping = Record<SegmentType, Key>;

function findMapping(line: ReturnType<typeof parseLine>): Mapping {
  const segments: Record<SegmentType, Key[]> = segmentTypes.reduce(
    (prev, curr) => {
      prev[curr] = [...keys];
      return prev;
    },
    {} as Record<SegmentType, Key[]>
  );

  function restrictToVal(segType: SegmentType, val: Key[]) {
    segments[segType] = segments[segType].filter((key) => val.includes(key));
  }

  function excludeVal(segType: SegmentType, val: Key[]) {
    segments[segType] = segments[segType].filter((key) => !val.includes(key));
  }

  function excludeFromOthers(segTypes: SegmentType[], val: Key[]) {
    segmentTypes
      .filter((t) => !segTypes.includes(t))
      .forEach((t) => excludeVal(t, val));
  }

  line.input.forEach((val) => {
    if (isOne(val)) {
      restrictToVal("C", val);
      restrictToVal("F", val);
    }
    if (isFour(val)) {
      restrictToVal("B", val);
      restrictToVal("C", val);
      restrictToVal("D", val);
      restrictToVal("F", val);
    }
    if (isSeven(val)) {
      restrictToVal("A", val);
      restrictToVal("C", val);
      restrictToVal("F", val);
    }
  });

  const inputValuesWithLenghtFive = line.input.filter(
    (val) => val.length === 5
  );
  if (inputValuesWithLenghtFive.length === 3) {
    const keyCounts = inputValuesWithLenghtFive.reduce((prev, curr) => {
      curr.forEach((key) => (prev[key] = prev[key] ? prev[key] + 1 : 1));
      return prev;
    }, {} as Partial<Record<Key, number>>);
    const restrictTo = keys.filter((key) => keyCounts[key] === 1);
    restrictToVal("B", restrictTo);
    restrictToVal("E", restrictTo);
  }

  const inputValuesWithLenghtSix = line.input.filter((val) => val.length === 6);
  if (inputValuesWithLenghtSix.length === 3) {
    const keyCounts = inputValuesWithLenghtSix.reduce((prev, curr) => {
      curr.forEach((key) => (prev[key] = prev[key] ? prev[key] + 1 : 1));
      return prev;
    }, {} as Partial<Record<Key, number>>);
    const excludeFromC = keys.filter((key) => keyCounts[key] === 3);
    excludeVal("C", excludeFromC);
  }

  function finished() {
    return !Object.values(segments).some((seg) => seg.length !== 1);
  }

  while (!finished()) {
    const typesWithOnlyOnePossibleValue = segmentTypes.filter(
      (segType) => segments[segType].length === 1
    );
    typesWithOnlyOnePossibleValue.forEach((segType) =>
      excludeFromOthers([segType], segments[segType])
    );

    const typesWithOnlyTwoPossibleValues = segmentTypes.filter(
      (segType) => segments[segType].length === 2
    );
    const countTypesWithOnlyTwoPossibleValues = typesWithOnlyTwoPossibleValues
      .map((segType) => segments[segType].join(""))
      .reduce((prev, curr) => {
        prev[curr] = prev[curr] ? prev[curr] + 1 : 1;
        return prev;
      }, {} as Partial<Record<string, number>>);

    Object.keys(countTypesWithOnlyTwoPossibleValues)
      .filter((keys) => countTypesWithOnlyTwoPossibleValues[keys] === 2)
      .forEach((keys) =>
        excludeFromOthers(
          segmentTypes.filter((segType) => segments[segType].join("") === keys),
          keys.split("") as Key[]
        )
      );
  }

  return {
    A: segments.A[0],
    B: segments.B[0],
    C: segments.C[0],
    D: segments.D[0],
    E: segments.E[0],
    F: segments.F[0],
    G: segments.G[0],
  };
}

const numberLitSegments: SegmentType[][] &
  Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, SegmentType[]> = [
  ["A", "B", "C", "E", "F", "G"], // 0
  ["C", "F"], //1
  ["A", "C", "D", "E", "G"], //2
  ["A", "C", "D", "F", "G"], //3
  ["B", "C", "D", "F"], //4
  ["A", "B", "D", "F", "G"], //5
  ["A", "B", "D", "E", "F", "G"], //6
  ["A", "C", "F"], //7
  ["A", "B", "C", "D", "E", "F", "G"], //8
  ["A", "B", "C", "D", "F", "G"], //9
];

function findNumber(val: Key[], mapping: Mapping) {
  return numberLitSegments.findIndex(
    (litSegments) =>
      litSegments.length === val.length &&
      litSegments.every((segType) => val.includes(mapping[segType]))
  );
}

const outputValues = lines.map((line) => {
  const mapping = findMapping(line);
  return Number.parseInt(
    line.output.map((val) => findNumber(val, mapping)).join("")
  );
});

console.log(outputValues.reduce((prev, curr) => prev + curr, 0));

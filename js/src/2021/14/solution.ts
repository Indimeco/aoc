import { frequency } from "../3/solution";

export const parseInstructions = (input: string): [string, string][] =>
  // @ts-ignore
  input
    .trim()
    .split("\n")
    .map((x) => x.split("->").map((x) => x.trim()));

type PairCount = Record<string, number>;
const applyInstructionInternal = (
  initPairCount: PairCount,
  instructions: [string, string][]
) => {
  const nextPairCount = { ...initPairCount };
  instructions.reduce((pairCount, [instruction, insertion]): PairCount => {
    const currentCount = pairCount[instruction];
    if (currentCount > 0) {
      nextPairCount[instruction] = nextPairCount[instruction] - currentCount;
      nextPairCount[instruction[0] + insertion] =
        (nextPairCount[instruction[0] + insertion] ?? 0) + currentCount;
      nextPairCount[insertion + instruction[1]] =
        (nextPairCount[insertion + instruction[1]] ?? 0) + currentCount;
    }
    return pairCount;
  }, initPairCount);
  return nextPairCount;
};

const createPairCount = (template: string) =>
  Object.fromEntries(
    frequency(
      template
        .split("")
        .map((x, index) =>
          template[index + 1] === undefined ? null : x + template[index + 1]
        )
        .filter((a) => a !== null)
    )
  );

const createCharacterFrequencyFromPairCount = (
  template: string,
  pairCount: PairCount
): Record<string, number> => {
  const e = Object.entries(pairCount);
  const allChars = Object.fromEntries(
    "abcdefghijklmnopqrstuvwxyz"
      .toUpperCase()
      .split("")
      .map((character) => {
        const starts = e.filter(
          ([[firstChar, secondChar], count]) => firstChar === character
        );
        const sum = starts.reduce((acc, [_, count]) => count + acc, 0);
        // console.log(starts);
        // const ends = e.filter(
        //   ([[firstChar, secondChar], count]) => secondChar === character
        // );
        return [character, sum];
      })
      .filter(([char, count]) => count > 0)
  );
  // add the last char
  allChars[template[template.length - 1]] =
    allChars[template[template.length - 1]] + 1;
  return allChars;
};

export const applyInstruction = (
  template: string,
  instructions: [string, string][]
) => {
  const a = createPairCount(template);
  const appiled = applyInstructionInternal(a, instructions);
  createCharacterFrequencyFromPairCount(template, appiled);
  return appiled;
};

export const applyInstructionsTimes = async (
  initialTemplate: string,
  instructions: [string, string][],
  times: number,
  pairs?: PairCount
): Promise<string> => {
  if (!pairs) {
    pairs = createPairCount(initialTemplate);
  }
  if (times === 0) {
    return createCharacterFrequencyFromPairCount(initialTemplate, pairs);
  }
  const nextPairs = applyInstructionInternal(pairs, instructions);
  return applyInstructionsTimes(
    initialTemplate,
    instructions,
    times - 1,
    nextPairs
  );
};

export const maxMinusMin = (pairs: PairCount) => {
  const pairEntries = Object.entries(pairs);
  const min = Math.min(...pairEntries.map(([key, count]) => count));
  const max = Math.max(...pairEntries.map(([key, count]) => count));

  return max - min;
};

export const parseInput = (i: string): number[][] =>
  i.split("\n\n").map((x) => x.split("\n").map((x) => Number(x)));

const sum = (a: number[]) => a.reduce((acc, cur) => acc + cur, 0);
type highestIndexRecord = { highest: number; index: number };
const highestIndex = (a: Array<Array<number>>): highestIndexRecord =>
  a.reduce(
    (acc: highestIndexRecord, cur: Array<number>, index: number) => {
      const next = sum(cur);
      if (next >= acc.highest) {
        return { highest: next, index };
      }
      return acc;
    },
    { highest: -1, index: -1 }
  );

export const solution = (
  inp: Array<Array<number>>,
  times: number,
  acc: number
): number => {
  if (times === 0) return acc;
  const { highest, index: elf } = highestIndex(inp);
  const nextArr = [...inp.slice(0, elf), ...inp.slice(elf + 1, inp.length)];
  return solution(nextArr, times - 1, acc + highest);
};

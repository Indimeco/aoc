export const solution = (input: number[]): number => {
  const a = input.reduce(
    (prev, current) => {
      return {
        num: current,
        count: current > prev.num ? prev.count + 1 : prev.count,
      };
    },
    { num: input[0], count: 0 }
  );
  return a.count;
};

export const sum3 = (input: number[]): number[] =>
  input
    .map((v, index) => {
      if (input[index - 2] !== undefined)
        return input[index] + input[index - 1] + input[index - 2];
    })
    .filter((a): a is number => typeof a === "number");

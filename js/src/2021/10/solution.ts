const pairs = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const isOpening = (char: string) => Object.keys(pairs).includes(char);

export const getSyntaxError = (input: string, part2?: boolean): number => {
  try {
    const remainder = input
      .split("")
      .reduce((acc: string[], cur: string, index) => {
        if (isOpening(cur)) {
          return [...acc, cur];
        }
        if (!isOpening(cur)) {
          const lastOpening = acc.pop();
          if (pairs[lastOpening] === cur) {
            // side effect remove??
            return acc;
          }
          throw new SyntaxError(index);
        }
      }, []);
    return remainder;
  } catch (e: any) {
    return Number(e.message);
  }
};

const points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export const solution = (input: string[]) => {
  const errs = input.map(getSyntaxError).reduce((acc, cur, index) => {
    if (typeof cur === "number") {
      return acc + points[input[index][cur]];
    }
    return acc;
  }, 0);
  return errs;
};

const getAutoCompleteScore = (c: string, totalScore: number) => {
  const scoring = {
    ")": (ts) => ts * 5 + 1,
    "]": (ts) => ts * 5 + 2,
    "}": (ts) => ts * 5 + 3,
    ">": (ts) => ts * 5 + 4,
  };
  return scoring[c](totalScore);
};

export const solution2 = (input: string[]) => {
  const o = input
    .map(getSyntaxError)
    .reduce((acc, cur, index) => {
      if (typeof cur === "number") {
        return acc;
      }
      return [...acc, cur.map((c) => pairs[c]).reverse()];
    }, [])
    .map((line) =>
      line.reduce((acc, cur) => {
        const score = getAutoCompleteScore(cur, acc);
        return score;
      }, 0)
    )
    .sort((a, b) => (a > b ? -1 : 1));

  const middle = o[Math.round((o.length - 1) / 2)];

  return middle;
};

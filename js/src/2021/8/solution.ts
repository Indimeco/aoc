export const signalToNumber = (signal: string): number | null => {
  switch (signal.length) {
    case 2:
      return 1;
    case 3:
      return 7;
    case 4:
      return 4;
    case 7:
      return 8;
    default:
      return null;
  }
};
export const solution = (
  input: {
    signal: string[];
    digits: string[];
  }[]
) => {
  return input
    .map(({ digits }) => digits)
    .flat()
    .map(signalToNumber)
    .filter((a) => a !== null).length;
};

const contains = (s1: string, s2: string) =>
  !s2.split("").some((a) => s1.split("").indexOf(a) === -1);

const complimentFrom = (s1: string, s2: string): string[] =>
  s1.split("").filter((x) => s2.split("").indexOf(x) === -1);

export const parseDigit = (input: {
  signal: string[];
  digits: string[];
}): number => {
  const signals = input.signal.map((x) => x.split("").sort().join(""));
  const uniqueDigs = signals.map(signalToNumber);
  const one = signals[uniqueDigs.indexOf(1)];
  const seven = signals[uniqueDigs.indexOf(7)];
  const four = signals[uniqueDigs.indexOf(4)];
  const eight = signals[uniqueDigs.indexOf(8)];
  const top = complimentFrom(seven, one)[0];
  const leftOrMiddle = complimentFrom(four, seven);
  let topLeft = "";
  let middle = "";
  let bottom = "";

  let done = false;
  let restDigs = uniqueDigs;
  while (!done) {
    restDigs = uniqueDigs.map((value, index) => {
      if (value === null) {
        const untranslatedSignal = signals[index];
        if (contains(untranslatedSignal, four)) {
          return 9;
        }
        if (
          !contains(untranslatedSignal, four) &&
          contains(untranslatedSignal, seven) &&
          untranslatedSignal.length === 6
        ) {
          middle = complimentFrom(eight, untranslatedSignal)[0];
          topLeft = complimentFrom(leftOrMiddle.join(""), middle)[0];
          return 0;
        }
        if (
          contains(untranslatedSignal, top) &&
          contains(untranslatedSignal, middle) &&
          contains(untranslatedSignal, one)
        ) {
          bottom = complimentFrom(untranslatedSignal, seven.concat(middle));
          return 3;
        }
        if (untranslatedSignal.length === 6) {
          return 6;
        }
        if (topLeft !== "" && contains(untranslatedSignal, topLeft)) {
          return 5;
        }
        if (topLeft !== "") {
          return 2;
        }
        return null;
      }
      return value;
    });
    if (restDigs.filter((a) => a === null).length === 0) {
      done = true;
    }
  }

  return Number(
    input.digits
      .map(
        (digitSignal) =>
          restDigs[signals.indexOf(digitSignal.split("").sort().join(""))]
      )
      .join("")
  );
};

export const solution2 = (
  input: {
    signal: string[];
    digits: string[];
  }[]
) => {
  return input.map(parseDigit).reduce((acc, cur) => acc + cur);
};

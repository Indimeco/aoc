import { input } from "./input";
import { parseInput, solution, solution2 } from "./solution";

test.skip("should work", () => {
  const testVals = `A Y
B X
C Z`;
  expect(solution(parseInput(testVals))).toEqual(15);
  expect(solution(parseInput(input))).toEqual(12794);
});

test("should work", () => {
  const testVals = `A Y
B X
C Z`;
  expect(solution2(parseInput(testVals))).toEqual(12);
  expect(solution2(parseInput(input))).toEqual(1);
});

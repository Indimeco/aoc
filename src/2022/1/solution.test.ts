import { parseInput, solution } from "./solution";

test("should work", () => {
  const testVals = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
  expect(solution(parseInput(testVals), 1, 0)).toEqual(24000);
});

test("should work", () => {
  const testVals = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
  expect(solution(parseInput(testVals), 3, 0)).toEqual(45000);
});

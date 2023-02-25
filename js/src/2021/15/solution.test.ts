import { input } from "./input";
import { getLowestRisk, solution } from "./solution";

test.skip("should work", () => {
  const testInput = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;
  expect(solution(testInput)).toEqual(40);

  expect(solution(input)).toEqual(619);
});

test("part 2 should work", () => {
  const testInput = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;
  expect(solution(testInput, true)).toEqual(315);

  expect(solution(input, true)).toEqual(2922);
});

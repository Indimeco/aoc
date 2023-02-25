import { input } from "./input";
import { isPit, solution, solution2 } from "./solution";

test("should work", () => {
  expect(isPit(1, [2, 9, 9])).toEqual(true);
  expect(isPit(4, [2, 9, 8])).toEqual(false);
  expect(isPit(2, [2, 2, 3])).toEqual(false);
  expect(
    solution([2199943210, 3987894921, 9856789892, 8767896789, 9899965678])
  ).toEqual(15);
  expect(solution(input)).toEqual(570);
});

test("should work for part 2", () => {
  expect(
    solution2([
      "2199943210",
      "3987894921",
      "9856789892",
      "8767896789",
      "9899965678",
    ])
  ).toEqual(1134);

  expect(solution2(input)).toEqual(899392);
});

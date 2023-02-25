import { input } from "./input";
import { solution, solution2, input as inputType } from "./solution";

test("should work", () => {
  const sample: inputType[] = [
    { direction: "forward", count: 5 },
    { direction: "down", count: 5 },
    { direction: "forward", count: 8 },
    { direction: "up", count: 3 },
    { direction: "down", count: 8 },
    { direction: "forward", count: 2 },
  ];
  expect(solution(sample)).toEqual(150);
  expect(solution(input)).toEqual(1524750);
});

test("part 2 should work", () => {
  const sample: inputType[] = [
    { direction: "forward", count: 5 },
    { direction: "down", count: 5 },
    { direction: "forward", count: 8 },
    { direction: "up", count: 3 },
    { direction: "down", count: 8 },
    { direction: "forward", count: 2 },
  ];
  expect(solution2(sample)).toEqual(900);
  expect(solution2(input)).toEqual(1592426537);
});

import { input } from "./input";
import { fuelCost, solution, solution2, fuelCostCumulative } from "./solution";

test("should work", () => {
  expect(fuelCost([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2)).toEqual(37);
  expect(fuelCost([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 1)).toEqual(41);

  expect(solution([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toEqual({
    cost: 37,
    position: 2,
  });

  // expect(solution(input)).toEqual(true);
});

test("part 2 should work", () => {
  expect(fuelCostCumulative([1], 5)).toEqual(10);
  expect(fuelCostCumulative([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 5)).toEqual(168);
  expect(fuelCostCumulative([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2)).toEqual(206);

  expect(solution2([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toEqual({
    cost: 168,
    position: 5,
  });

  expect(solution2(input)).toEqual(true);
});

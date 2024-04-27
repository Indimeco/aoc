import { input } from "./input";
import { solution, step, fixInput, unfixInput, solution2 } from "./solution";

test("should work", () => {
  expect(
    unfixInput(
      step(
        fixInput([
          "5483143223",
          "2745854711",
          "5264556173",
          "6141336146",
          "6357385478",
          "4167524645",
          "2176841721",
          "6882881134",
          "4846848554",
          "5283751526",
        ])
      )[0]
    )
  ).toEqual([
    "6594254334",
    "3856965822",
    "6375667284",
    "7252447257",
    "7468496589",
    "5278635756",
    "3287952832",
    "7993992245",
    "5957959665",
    "6394862637",
  ]);

  expect(solution(["11111", "19991", "19191", "19991", "11111"], 2)).toEqual(9);

  expect(
    solution(
      [
        "5483143223",
        "2745854711",
        "5264556173",
        "6141336146",
        "6357385478",
        "4167524645",
        "2176841721",
        "6882881134",
        "4846848554",
        "5283751526",
      ],
      2
    )
  ).toEqual(35);

  expect(
    solution(
      [
        "5483143223",
        "2745854711",
        "5264556173",
        "6141336146",
        "6357385478",
        "4167524645",
        "2176841721",
        "6882881134",
        "4846848554",
        "5283751526",
      ],
      10
    )
  ).toEqual(204);

  expect(
    solution(
      [
        "5483143223",
        "2745854711",
        "5264556173",
        "6141336146",
        "6357385478",
        "4167524645",
        "2176841721",
        "6882881134",
        "4846848554",
        "5283751526",
      ],
      100
    )
  ).toEqual(1656);

  expect(solution(input, 100)).toEqual(1637);
});

test("part 2 should work", () => {
  expect(
    solution2([
      "5483143223",
      "2745854711",
      "5264556173",
      "6141336146",
      "6357385478",
      "4167524645",
      "2176841721",
      "6882881134",
      "4846848554",
      "5283751526",
    ])
  ).toEqual(195);

  expect(solution2(input)).toEqual(242);
});
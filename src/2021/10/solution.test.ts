import { solution, getSyntaxError, solution2, completeLine } from "./solution";
import { input } from "./input";

test("should work", () => {
  expect(getSyntaxError("([])")).toEqual([]);
  expect(getSyntaxError("{()()()}")).toEqual([]);
  expect(getSyntaxError("[({(<(())[]>[[{[]{<()<>>").length).toEqual(8);
  expect(getSyntaxError("{([(<{}[<>[]}>{[]{[(<()>")).toEqual(12);

  expect(
    solution([
      "[({(<(())[]>[[{[]{<()<>>",
      "[(()[<>])]({[<{<<[]>>(",
      "{([(<{}[<>[]}>{[]{[(<()>",
      "(((({<>}<{<{<>}{[]{[]{}",
      "[[<[([]))<([[{}[[()]]]",
      "[{[{({}]{}}([{[{{{}}([]",
      "{<[[]]>}<{[{[{[]{()[[[]",
      "[<(<(<(<{}))><([]([]()",
      "<{([([[(<>()){}]>(<<{{",
      "<{([{{}}[<[[[<>{}]]]>[]]",
    ])
  ).toEqual(26397);

  expect(solution(input)).toEqual(339537);
});

test("part 2 should work", () => {
  expect(
    solution2([
      "[({(<(())[]>[[{[]{<()<>>",
      "[(()[<>])]({[<{<<[]>>(",
      "{([(<{}[<>[]}>{[]{[(<()>",
      "(((({<>}<{<{<>}{[]{[]{}",
      "[[<[([]))<([[{}[[()]]]",
      "[{[{({}]{}}([{[{{{}}([]",
      "{<[[]]>}<{[{[{[]{()[[[]",
      "[<(<(<(<{}))><([]([]()",
      "<{([([[(<>()){}]>(<<{{",
      "<{([{{}}[<[[[<>{}]]]>[]]",
    ])
  ).toEqual(288957);

  expect(solution2(input)).toEqual(true);
});

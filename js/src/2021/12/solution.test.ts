import { input } from "./input";
import {
  parseCaveMap,
  numPathsCaves2,
  parseInput,
  numPathsCaves,
} from "./solution";

test("should work", () => {
  expect(
    parseCaveMap(
      parseInput(`start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end`)
    )["start"]
  ).toEqual(["A", "b"]);

  expect(
    numPathsCaves(`start-A
  start-b
  A-c
  A-b
  b-d
  A-end
  b-end`)
  ).toEqual(10);

  expect(
    numPathsCaves(`dc-end
  HN-start
  start-kj
  dc-start
  dc-HN
  LN-dc
  HN-end
  kj-sa
  kj-HN
  kj-dc`)
  ).toEqual(19);

  expect(numPathsCaves(input)).toEqual(5254);
});

test("part 2 should work", () => {
  expect(
    numPathsCaves2(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`)
  ).toEqual(36);

  expect(numPathsCaves2(input)).toEqual(149385);
});

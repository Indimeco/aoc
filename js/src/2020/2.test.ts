import {
  countOldTobogganPasswords,
  countValidCorporatePasswords,
  isValidCorporateTobogganEntry,
  isValidOldTobogganEntry,
  parseEntry,
  parseInputToEntries,
} from "./2";
import { input } from "./2.input";

it("should convert an entry to datum", () => {
  expect(parseEntry("6-7 n: jbncncnn")).toEqual({
    min: 6,
    max: 7,
    target: "n",
    data: "jbncncnn",
  });
});

it("should convert input to entries", () => {
  expect(
    parseInputToEntries(`6-7 s: xsvmsds
    6-7 n: jbncncnn`)
  ).toEqual([
    {
      min: 6,
      max: 7,
      target: "s",
      data: "xsvmsds",
    },
    {
      min: 6,
      max: 7,
      target: "n",
      data: "jbncncnn",
    },
  ]);
});

it("should pass a valid entry", () => {
  expect(
    isValidOldTobogganEntry({
      min: 6,
      max: 7,
      target: "s",
      data: "xssssvmsds",
    })
  ).toEqual(true);
});

it("should fail an invalid entry", () => {
  expect(
    isValidOldTobogganEntry({
      min: 6,
      max: 7,
      target: "s",
      data: "xsvmsds",
    })
  ).toEqual(false);
});

it("should get the solution for old toboggan", () => {
  expect(countOldTobogganPasswords(input)).toEqual(393);
});

it("should pass a valid corporate entry", () => {
  expect(
    isValidCorporateTobogganEntry({
      min: 1,
      max: 3,
      data: "abcde",
      target: "a",
    })
  ).toEqual(true);
});

it("should fail an invalid corporate entry", () => {
  expect(
    isValidCorporateTobogganEntry({
      min: 1,
      max: 3,
      data: "cdefg",
      target: "b",
    })
  ).toEqual(false);
});

it("should fail an invalid corporate entry because both conditions are met", () => {
  expect(
    isValidCorporateTobogganEntry({
      min: 2,
      max: 9,
      data: "ccccccccc",
      target: "c",
    })
  ).toEqual(false);
});

it("should get the solution for corporate toboggan", () => {
  expect(countValidCorporatePasswords(input)).toEqual(690);
});

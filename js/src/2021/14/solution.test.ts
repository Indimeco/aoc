import { template, instructions } from "./input";
import {
  parseInstructions,
  applyInstruction,
  applyInstructionsTimes,
  maxMinusMin,
} from "./solution";

test("should work", async () => {
  const testTemplateStart = "NNCB";
  const testInstructions = `
CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

  const parsedTestInstructions = parseInstructions(testInstructions);

  expect(parseInstructions(testInstructions)[0]).toEqual(["CH", "B"]);
  expect(parseInstructions(testInstructions)[5]).toEqual(["HC", "B"]);
  expect(parseInstructions(testInstructions)[15]).toEqual(["CN", "C"]);

  // expect(await applyInstruction("NNCB", [["NN", "B"]])).toEqual("NBNCB");

  // expect(await applyInstruction("NNCB", parsedTestInstructions)).toEqual(
  //   "NCNBCHB"
  // );

  // expect(
  //   await applyInstructionsTimes("NNCB", parsedTestInstructions, 1)
  // ).toEqual("NCNBCHB");

  // expect(
  //   await applyInstructionsTimes("NNCB", parsedTestInstructions, 2)
  // ).toEqual("NBCCNBBBCBHCB");

  // expect(
  //   await applyInstructionsTimes("NNCB", parsedTestInstructions, 4)
  // ).toEqual("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB");

  const tenth = await applyInstructionsTimes(
    "NNCB",
    parsedTestInstructions,
    10
  );
  // expect(tenth).toHaveLength(3073);

  expect(maxMinusMin(tenth)).toEqual(1588);

  expect(
    maxMinusMin(
      await applyInstructionsTimes(
        template,
        parseInstructions(instructions),
        10
      )
    )
  ).toEqual(3906);

  expect(
    maxMinusMin(
      await applyInstructionsTimes(
        template,
        parseInstructions(instructions),
        40
      )
    )
  ).toEqual(4441317262452);
});

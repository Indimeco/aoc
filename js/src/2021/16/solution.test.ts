import { input } from "./input";
import { binToHex, getBITSTransmissionParts, getBITSVersion } from "./solution";

test("should work", () => {
  expect(binToHex("F")).toEqual("1111");
  expect(binToHex("1")).toEqual("0001");

  expect(getBITSTransmissionParts("110100101111111000101000")).toEqual([
    "110",
    "100",
    "101111111000101000",
  ]);

  expect(
    getBITSVersion(getBITSTransmissionParts("110100101111111000101000"))
  ).toEqual(6);
});

import { toFixed } from "../number";

describe("Test suite for number utils", () => {
  it("Should round a number up to 2 symbols after comma", () => {
    expect(toFixed(1.76546734454, 2)).toBe((1.77).toString());
  });

  it("Should return nothing if there is no number passed", () => {
    expect(toFixed(undefined, 2)).toBeUndefined();
  });
});

import { formatDate, numToString } from "../date";

describe("Test suite for date utils.", () => {
  it("Should format date.", () => {
    const date = new Date("2007.02.15");

    expect(formatDate(date)).toBe("2007-02-15");
  });

  it("Should add zero before number less than 10", () => {
    expect(numToString(7)).toBe("07");
  });

  it("Should not add zero before number more than 10", () => {
    expect(numToString(10)).toBe("10");
  });
});

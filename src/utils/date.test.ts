import { describe, expect, it } from "vitest";
import { getNextBuildersLabClassStart, getLocalClassTime } from "./date";

describe("getLocalClassTime", () => {
  it("presents the class in the requested local time zone", () => {
    const result = getLocalClassTime("2026-09-05T17:00:00Z", "en-US", "America/Los_Angeles");

    expect(result.date).toBe("Saturday, September 5, 2026");
    expect(result.time).toMatch(/^10:00 AM/);
    expect(result.timeZone).toBe("America/Los Angeles");
  });

  it("converts the same class for a different member", () => {
    const result = getLocalClassTime("2026-09-05T17:00:00Z", "en-GB", "Europe/London");

    expect(result.time).toMatch(/^18:00/);
  });
});

describe("getNextBuildersLabClassStart", () => {
  it("selects the upcoming Saturday at 10 AM Pacific during daylight time", () => {
    expect(getNextBuildersLabClassStart(new Date("2026-09-14T12:00:00Z"))).toBe("2026-09-19T17:00:00.000Z");
  });

  it("moves to the following Saturday when this week's class has already started", () => {
    expect(getNextBuildersLabClassStart(new Date("2026-09-19T18:00:00Z"))).toBe("2026-09-26T17:00:00.000Z");
  });
});

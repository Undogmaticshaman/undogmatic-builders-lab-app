import { describe, expect, it } from "vitest";
import { getLocalClassTime } from "./date";

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

import { test, expect, describe } from "bun:test";
import { formatRelativeTime } from "./formatRelativeTime";

describe("formatRelativeTime", () => {
  test("returns 'just now' for times within the last minute", () => {
    const now = new Date();
    const fiveSecondsAgo = new Date(now.getTime() - 5 * 1000);
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    const fiftyNineSecondsAgo = new Date(now.getTime() - 59 * 1000);

    expect(formatRelativeTime(fiveSecondsAgo.toISOString())).toBe("just now");
    expect(formatRelativeTime(thirtySecondsAgo.toISOString())).toBe("just now");
    expect(formatRelativeTime(fiftyNineSecondsAgo.toISOString())).toBe("just now");
  });

  test("returns minutes for times within the last hour", () => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const fiftyNineMinutesAgo = new Date(now.getTime() - 59 * 60 * 1000);

    expect(formatRelativeTime(oneMinuteAgo.toISOString())).toBe("1 minute ago");
    expect(formatRelativeTime(fiveMinutesAgo.toISOString())).toBe("5 minutes ago");
    expect(formatRelativeTime(thirtyMinutesAgo.toISOString())).toBe("30 minutes ago");
    expect(formatRelativeTime(fiftyNineMinutesAgo.toISOString())).toBe("59 minutes ago");
  });

  test("returns hours for times within the last day", () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);

    expect(formatRelativeTime(oneHourAgo.toISOString())).toBe("1 hour ago");
    expect(formatRelativeTime(fiveHoursAgo.toISOString())).toBe("5 hours ago");
    expect(formatRelativeTime(twelveHoursAgo.toISOString())).toBe("12 hours ago");
    expect(formatRelativeTime(twentyThreeHoursAgo.toISOString())).toBe("23 hours ago");
  });

  test("returns days for times within the last week", () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);

    expect(formatRelativeTime(oneDayAgo.toISOString())).toBe("1 day ago");
    expect(formatRelativeTime(threeDaysAgo.toISOString())).toBe("3 days ago");
    expect(formatRelativeTime(sixDaysAgo.toISOString())).toBe("6 days ago");
  });

  test("returns weeks for times within the last month", () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);

    expect(formatRelativeTime(oneWeekAgo.toISOString())).toBe("1 week ago");
    expect(formatRelativeTime(twoWeeksAgo.toISOString())).toBe("2 weeks ago");
    expect(formatRelativeTime(threeWeeksAgo.toISOString())).toBe("3 weeks ago");
  });

  test("returns months for times within the last year", () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    const elevenMonthsAgo = new Date(now.getTime() - 330 * 24 * 60 * 60 * 1000);

    expect(formatRelativeTime(oneMonthAgo.toISOString())).toBe("1 month ago");
    expect(formatRelativeTime(threeMonthsAgo.toISOString())).toBe("3 months ago");
    expect(formatRelativeTime(sixMonthsAgo.toISOString())).toBe("6 months ago");
    expect(formatRelativeTime(elevenMonthsAgo.toISOString())).toBe("11 months ago");
  });

  test("returns years for times over a year ago", () => {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const twoYearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
    const fiveYearsAgo = new Date(now.getTime() - 1825 * 24 * 60 * 60 * 1000);

    expect(formatRelativeTime(oneYearAgo.toISOString())).toBe("1 year ago");
    expect(formatRelativeTime(twoYearsAgo.toISOString())).toBe("2 years ago");
    expect(formatRelativeTime(fiveYearsAgo.toISOString())).toBe("5 years ago");
  });

  test("handles singular vs plural correctly", () => {
    const now = new Date();

    expect(formatRelativeTime(new Date(now.getTime() - 1 * 60 * 1000).toISOString())).toBe("1 minute ago");
    expect(formatRelativeTime(new Date(now.getTime() - 2 * 60 * 1000).toISOString())).toBe("2 minutes ago");

    expect(formatRelativeTime(new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString())).toBe("1 hour ago");
    expect(formatRelativeTime(new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString())).toBe("2 hours ago");

    expect(formatRelativeTime(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString())).toBe("1 day ago");
    expect(formatRelativeTime(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString())).toBe("2 days ago");

    expect(formatRelativeTime(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString())).toBe("1 week ago");
    expect(formatRelativeTime(new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString())).toBe("2 weeks ago");

    expect(formatRelativeTime(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString())).toBe("1 month ago");
    expect(formatRelativeTime(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString())).toBe("2 months ago");

    expect(formatRelativeTime(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString())).toBe("1 year ago");
    expect(formatRelativeTime(new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000).toISOString())).toBe("2 years ago");
  });

  test("handles ISO 8601 date string format", () => {
    const isoString = "2026-01-20T10:30:00.000Z";
    const result = formatRelativeTime(isoString);

    // Should return a valid relative time format
    expect(result).toMatch(/\d+ (minute|hour|day|week|month|year)s? ago|just now/);
  });
});

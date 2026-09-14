export type LocalClassTime = {
  date: string;
  time: string;
  timeZone: string;
};

const LAB_TIME_ZONE = "America/Los_Angeles";
const weekdayIndexes: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function zonedDateTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const intendedAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date(intendedAsUtc))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  const displayedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);

  return new Date(intendedAsUtc + (intendedAsUtc - displayedAsUtc));
}

/** Returns the next Saturday 10 AM Builders Lab session in Pacific time. */
export function getNextBuildersLabClassStart(now = new Date()): string {
  const calendarFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: LAB_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });
  const parts = Object.fromEntries(
    calendarFormatter
      .formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  const daysUntilSaturday = (6 - weekdayIndexes[parts.weekday] + 7) % 7;
  const nextDate = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + daysUntilSaturday));
  let start = zonedDateTimeToUtc(
    nextDate.getUTCFullYear(),
    nextDate.getUTCMonth() + 1,
    nextDate.getUTCDate(),
    10,
    0,
    LAB_TIME_ZONE,
  );

  if (start.getTime() <= now.getTime()) {
    start = zonedDateTimeToUtc(
      nextDate.getUTCFullYear(),
      nextDate.getUTCMonth() + 1,
      nextDate.getUTCDate() + 7,
      10,
      0,
      LAB_TIME_ZONE,
    );
  }

  return start.toISOString();
}

export function getClassDateBadge(startsAt: string): { month: string; day: string } {
  const date = new Date(startsAt);
  return {
    month: new Intl.DateTimeFormat("en-US", { month: "short", timeZone: LAB_TIME_ZONE }).format(date).toUpperCase(),
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit", timeZone: LAB_TIME_ZONE }).format(date),
  };
}

export function getLocalClassTime(
  startsAt: string,
  locale?: string,
  timeZone?: string,
): LocalClassTime {
  const date = new Date(startsAt);
  const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    date: new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: zone,
    }).format(date),
    time: new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: zone,
    }).format(date),
    timeZone: zone.replaceAll("_", " "),
  };
}

export type LocalClassTime = {
  date: string;
  time: string;
  timeZone: string;
};

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
